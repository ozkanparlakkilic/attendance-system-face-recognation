import React from "react";
import Button from "../../../components/Button/Button";
import "./StartAttendance.css";
import { useState } from "react";
import axios from "axios";
import { baseUrl } from "../../../utils/getUrl";
import { useAuth } from "../../../hook/useAuth";
import { confirmModal, errorModal } from "../../../common/SweetAlert";
import { useHistory, useParams } from "react-router-dom";

const StartAttendance = () => {
  const [attendanceStart, setAttendanceStart] = useState(false);
  const params = useParams();

  const { user } = useAuth();
  const history = useHistory();

  const startAttendance = () => {
    axios({
      method: "post",
      url: `${baseUrl}/api/attendance/start`,
      headers: {
        authorization: `Bearer ${user.token}`,
      },
      data: {
        classId: params.id,
      },
    })
      .then(function (response) {
        console.log(response);
        setAttendanceStart(true);
      })
      .catch((err) => {
        errorModal(err);
      });
  };

  const finishAttendance = () => {
    axios({
      method: "put",
      url: `${baseUrl}/api/attendance/finish`,
      headers: {
        authorization: `Bearer ${user.token}`,
      },
      data: {
        classId: params.id,
      },
    })
      .then(function (response) {
        console.log(response);
        setAttendanceStart(false);
        history.push("/dashboard");
      })
      .catch((err) => {
        errorModal(err);
      });
  };

  const confirmStartAttendance = () => {
    confirmModal(
      "Yoklamayı başlatmak istediğinize emin misiniz ?",
      startAttendance
    );
  };

  const confirmFinishAttendance = () => {
    confirmModal(
      "Yoklamayı bitirmek istediğinize emin misiniz ?",
      finishAttendance
    );
  };

  return (
    <div className="start_attendance_wrapper">
      {attendanceStart ? (
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
            title="Finish Attendance"
            onClick={() => confirmFinishAttendance()}
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
            title="Start Attendance"
            onClick={() => confirmStartAttendance()}
            style={{ margin: "1rem" }}
          />
        </div>
      )}
    </div>
  );
};

export default StartAttendance;
