import React, { useEffect, useRef } from "react";
import Input from "../../../components/Input/Input";
import Button from "../../../components/Button/Button";
import "./Register.css";
import { useState } from "react";
import Webcam from "react-webcam";
import axios from "axios";
import { baseUrl } from "../../../utils/getUrl";
import Multiselect from "multiselect-react-dropdown";
import { useHistory } from "react-router-dom";
import { errorModal, successModal } from "../../../common/SweetAlert";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [usn, setUsn] = useState("");
  const [classes, setClasses] = useState([]);
  const [selectClasses, setSelectClasses] = useState([]);
  const [image, setImage] = useState("");
  const [showWebcam, setShowWebcam] = useState(false);
  const history = useHistory();

  const multiselectRef = useRef();

  const videoConstraints = {
    width: 1280,
    height: 720,
    facingMode: "user",
  };

  useEffect(() => {
    getClasses();
  }, [classes]);

  const getClasses = () => {
    axios
      .get(`${baseUrl}/api/class`)
      .then((response) => {
        setClasses(response.data);
      })
      .catch(function (error) {
        errorModal(error);
      });
  };

  const b64toBlob = (b64Data, contentType = "", sliceSize = 512) => {
    const byteCharacters = atob(b64Data);
    const byteArrays = [];

    for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
      const slice = byteCharacters.slice(offset, offset + sliceSize);

      const byteNumbers = new Array(slice.length);
      for (let i = 0; i < slice.length; i++) {
        byteNumbers[i] = slice.charCodeAt(i);
      }

      const byteArray = new Uint8Array(byteNumbers);
      byteArrays.push(byteArray);
    }

    const blob = new Blob(byteArrays, { type: contentType });
    return blob;
  };

  const register = () => {
    const selectedClassesId = selectClasses.map((item) => item._id);

    const contentType = "image/png";
    const blob = b64toBlob(image.split(",").pop(), contentType);

    console.log(selectedClassesId.toString());

    const formData = new FormData();
    formData.append("email", email);
    formData.append("password", password);
    formData.append("fullName", fullName);
    formData.append("usn", usn);
    formData.append("classes", selectedClassesId.toString());
    formData.append("image", blob);

    axios({
      method: "post",
      url: `${baseUrl}/api/student/register`,
      headers: {
        "Content-Type": "multipart/form-data",
      },
      data: formData,
    })
      .then(function (response) {
        successModal("Kaydınız oluşturuldu", nextPage);
      })
      .catch(function (error) {
        errorModal(error);
      });
  };

  const nextPage = () => {
    history.push("/");
  };

  const openWebcam = () => {
    setShowWebcam(true);
  };

  const onSelect = () => {
    setSelectClasses(multiselectRef.current.getSelectedItems());
  };

  const onRemove = () => {
    setSelectClasses(multiselectRef.current.getSelectedItems());
  };

  return (
    <div className="register_wrapper">
      <div className="video_box">
        {showWebcam && (
          <Webcam
            className="video_container faceIDShow"
            audio={false}
            screenshotFormat="image/png"
            videoConstraints={videoConstraints}
          >
            {({ getScreenshot }) => (
              <button
                onClick={() => {
                  const imageSrc = getScreenshot();
                  setImage(imageSrc);
                  setShowWebcam(false);
                }}
                style={{ position: "absolute", bottom: 0 }}
              >
                Capture photo
              </button>
            )}
          </Webcam>
        )}
      </div>

      <div
        style={{
          width: "100%",
          display: "flex",
          alignItems: "center",
          flexDirection: "column",
          padding: "15px 0",
        }}
      >
        <Multiselect
          options={classes} // Options to display in the dropdown
          displayValue="subjectName" // Property name to display in the dropdown options
          className="multi_select_box"
          onSelect={() => onSelect()}
          onRemove={() => onRemove()}
          ref={multiselectRef}
        />
        <div className="input_box">
          <Input
            placeholder="Fullname"
            onChange={(e) => setFullName(e.target.value)}
          />
          <Input placeholder="Usn" onChange={(e) => setUsn(e.target.value)} />
          <Input
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
          />
          <Input
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
            type="password"
          />
        </div>
        <Button
          title="Take My Picture"
          onClick={() => openWebcam()}
          style={{ margin: "1rem" }}
        />
        <Button title="Register" onClick={() => register()} />
      </div>
    </div>
  );
};

export default Register;
