import axios from "axios";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useHistory } from "react-router-dom";
import { useAuth } from "../../../hook/useAuth";
import { baseUrl } from "../../../utils/getUrl";
import "./ListAttendance.css";
import { errorModal } from "../../../common/SweetAlert";

const ListAttendance = () => {
  const [classes, setClasses] = useState([]);
  const { user } = useAuth();
  const history = useHistory();

  useEffect(() => {
    getClassesById();
  }, []);

  const getClassesById = () => {
    axios({
      method: "get",
      url: `${baseUrl}/api/class/student/${user._id}`,
      headers: {
        authorization: `Bearer ${user.token}`,
      },
      params: { classIdArr: user.classes.join("_") },
    })
      .then((response) => {
        setClasses(response.data);
      })
      .catch((err) => {
        errorModal(err);
      });
  };

  const routeAttendance = (class_id) => {
    history.push(`join-attendance/${class_id}`);
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

export default ListAttendance;
