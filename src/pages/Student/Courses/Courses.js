import axios from "axios";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useAuth } from "../../../hook/useAuth";
import { baseUrl } from "../../../utils/getUrl";
import "./Courses.css";
import { errorModal } from "../../../common/SweetAlert";

const Courses = () => {
  const [classes, setClasses] = useState([]);
  const { user } = useAuth();

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
    })
      .then((response) => {
        setClasses(response.data);
      })
      .catch((err) => {
        errorModal(err);
      });
  };

  return (
    <div className="classes-wrapper">
      {classes.map((item) => (
        <div key={item._id} className="classes-box">
          <h2>{item.section}</h2>
          <p>{item.subjectName}</p>
        </div>
      ))}
    </div>
  );
};

export default Courses;
