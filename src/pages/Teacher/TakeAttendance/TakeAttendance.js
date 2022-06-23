import axios from "axios";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useHistory } from "react-router-dom";
import { errorModal } from "../../../common/SweetAlert";
import { useAuth } from "../../../hook/useAuth";
import { baseUrl } from "../../../utils/getUrl";
import "./TakeAttendance.css";

const TakeAttendance = () => {
  const [classes, setClasses] = useState([]);
  const { user } = useAuth();
  const history = useHistory();

  useEffect(() => {
    getClassesById();
  }, []);

  const getClassesById = () => {
    axios({
      method: "get",
      url: `${baseUrl}/api/class/teacher/${user._id}`,
      headers: {
        authorization: `Bearer ${user.token}`,
      },
    })
      .then((response) => {
        setClasses(response.data);
      })
      .catch((err) => {
        errorModal(err);
      });
  };

  const routeAttendance = (class_id) => {
    history.push(`start-attendance/${class_id}`);
  };

  return (
    <div className="classes-wrapper">
      {classes.map((item) => (
        <div
          key={item._id}
          className="classes-box"
          onClick={() => {
            routeAttendance(item._id);
          }}
        >
          <h2>{item.section}</h2>
          <p>{item.subjectName}</p>
        </div>
      ))}
    </div>
  );
};

export default TakeAttendance;
