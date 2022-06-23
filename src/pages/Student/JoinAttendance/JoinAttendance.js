import React, { useEffect, useRef } from "react";
import Button from "../../../components/Button/Button";
import "./JoinAttendance.css";
import { useState } from "react";
import axios from "axios";
import { baseUrl } from "../../../utils/getUrl";
import { useAuth } from "../../../hook/useAuth";
import * as faceapi from "face-api.js";
import { useHistory, useParams } from "react-router-dom";
import { useCallback } from "react";
import {
  errorModal,
  successModal,
  warningModal,
} from "../../../common/SweetAlert";

// FaceID için Gereken Kod Bloğu...
let faceMatcher = null;
let LabeledFaceDescriptors = null;

const JoinAttendance = () => {
  const [captureVideo, setCaptureVideo] = useState(false);
  const [modalLoaded, setModalLoaded] = useState(false);
  const [attendance, setAttendance] = useState({});
  const history = useHistory();
  const params = useParams();

  const videoRef = useRef();
  const canvasRef = useRef();

  const { user } = useAuth();

  useEffect(() => {
    getAttendance();
  }, []);

  const loadingModal = useCallback(async () => {
    const MODEL_URL = "/models";
    Promise.all([
      faceapi.nets.tinyFaceDetector.loadFromUri(MODEL_URL),
      faceapi.nets.faceLandmark68Net.loadFromUri(MODEL_URL),
      faceapi.nets.faceRecognitionNet.loadFromUri(MODEL_URL),
      faceapi.nets.faceExpressionNet.loadFromUri(MODEL_URL),
      faceapi.nets.ssdMobilenetv1.loadFromUri(MODEL_URL),
    ])
      .then(initApp)
      .catch((err) => {
        errorModal("Modal not loaded");
      });
  }, []);

  const initApp = async () => {
    LabeledFaceDescriptors = await loadImages();
    await setModalLoaded(true);
    console.log("Loaded Modal");
  };

  const loadImages = async () => {
    const label = user.fullName;

    const descriptions = [];
    const img = await faceapi.fetchImage(
      `${process.env.REACT_APP_SERVER_URL}/${user.images}`
    );

    const detections = await faceapi
      .detectSingleFace(img)
      .withFaceLandmarks()
      .withFaceDescriptor();
    descriptions.push(detections.descriptor);
    return new faceapi.LabeledFaceDescriptors(label, descriptions);
  };

  const handleVideoOnPlay = () => {
    const boxSize = {
      width: 480,
      height: 320,
    };

    let cameraInterval = setInterval(async () => {
      faceapi.matchDimensions(canvasRef.current, boxSize);

      const detections = await faceapi
        .detectAllFaces(videoRef.current, new faceapi.TinyFaceDetectorOptions())
        .withFaceLandmarks()
        .withFaceDescriptors();

      const resizedDetections = faceapi.resizeResults(detections, boxSize);

      faceMatcher = new faceapi.FaceMatcher(LabeledFaceDescriptors, 0.6);

      const results = resizedDetections.map((d) =>
        faceMatcher.findBestMatch(d.descriptor)
      );

      if (results[0]._distance < 0.4) {
        successModal(
          "FaceID doğrulandı.. Yönlendiriliyorsunuz..",
          joinAttendance
        );
      } else {
        warningModal("FaceID doğrulanamadı...");
      }
      clearInterval(cameraInterval);
    }, 100);
  };

  const startVideo = () => {
    setCaptureVideo(true);
    navigator.mediaDevices
      .getUserMedia({ video: { width: 300 } })
      .then((stream) => {
        let video = videoRef.current;
        video.srcObject = stream;
        video.play();
      })
      .catch((err) => {
        console.error("error:", err);
      });
  };

  const closeWebcam = () => {
    videoRef.current.pause();
    videoRef.current.srcObject.getTracks()[0].stop();
    setCaptureVideo(false);
  };

  const getAttendance = () => {
    console.log(params.id);
    axios({
      method: "get",
      url: `${baseUrl}/api/attendance/${params.id}`,
      headers: {
        authorization: `Bearer ${user.token}`,
      },
    })
      .then((response) => {
        console.log(response.data);
        setAttendance(response.data.attendance);
        loadingModal();
      })
      .catch(() => {
        warningModal("Şuan da aktif yoklama bulunmamaktadır", nextRoute);
      });
  };

  // const getClasses = () => {
  //   axios.get(`${baseUrl}/api/class`).then((response) => {
  //     setClasses(response.data);
  //   });
  // };

  const joinAttendance = () => {
    axios({
      method: "put",
      url: `${baseUrl}/api/attendance/add`,
      headers: {
        authorization: `Bearer ${user.token}`,
      },
      data: {
        attendanceId: attendance._id,
        student: user,
      },
    })
      .then(function (response) {
        closeWebcam();
        successModal("Yoklamaya başarıyla katıldınız", nextRoute);
      })
      .catch(function (error) {
        closeWebcam();
        errorModal(error);
      });
  };

  const nextRoute = () => {
    history.push("/dashboard");
  };

  return (
    <div className="join_attendance_wrapper">
      {captureVideo && (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            padding: "10px",
            height: "320px",
          }}
        >
          <video
            autoPlay={true}
            muted={true}
            ref={videoRef}
            className="video_container faceIDShow"
            onPlay={handleVideoOnPlay}
          />
          <canvas ref={canvasRef} style={{ position: "absolute" }} />
        </div>
      )}

      {captureVideo && modalLoaded ? (
        <div
          style={{
            width: "100%",
            display: "flex",
            alignItems: "center",
            flexDirection: "column",
            padding: "15px 0",
          }}
        >
          <Button
            title="Close Camera"
            onClick={() => closeWebcam()}
            style={{ margin: "1rem" }}
          />
        </div>
      ) : (
        <div
          style={{
            width: "100%",
            display: "flex",
            alignItems: "center",
            flexDirection: "column",
            padding: "15px 0",
          }}
        >
          <Button
            title="Open Camera"
            onClick={() => startVideo()}
            style={{ margin: "1rem" }}
          />
        </div>
      )}
    </div>
  );
};

export default JoinAttendance;
