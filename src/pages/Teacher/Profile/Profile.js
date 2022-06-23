import React, { useState } from "react";
import "./Profile.css";
import { useAuth } from "../../../hook/useAuth";
import axios from "axios";
import { baseUrl } from "../../../utils/getUrl";
import { useEffect } from "react";
import { errorModal } from "../../../common/SweetAlert";

const Profile = () => {
  const { user } = useAuth();
  const [classes, setClasses] = useState([]);

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

  return (
    <div className="profile-wrapper">
      <div className="profile">
        <div className="profile-information-box">
          <h1>Teacher Information</h1>
          <span className="profile-information-title">
            FullName :
            <span className="profile-information">{" " + user.fullName}</span>
          </span>
          <span className="profile-information-title">
            Email : <span className="profile-information">{user.email}</span>
          </span>
        </div>
      </div>

      <div className="classes-wrapper">
        <h2 style={{ margin: "30px 0" }}>Course List</h2>
        {classes.map((item) => (
          <div key={item._id} className="classes-box">
            <h2>{item.section}</h2>
            <p>{item.subjectName}</p>
          </div>
        ))}
      </div>

      {console.log(classes)}
    </div>
  );
};

export default Profile;
