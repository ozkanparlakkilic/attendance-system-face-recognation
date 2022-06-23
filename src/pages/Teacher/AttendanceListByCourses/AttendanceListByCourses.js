import axios from "axios";
import React, { useState } from "react";
import { useEffect } from "react";
import { useAuth } from "../../../hook/useAuth";
import { baseUrl } from "../../../utils/getUrl";
import "./AttendanceListByCourses.css";
import { FaUserCircle } from "react-icons/fa";
import {
  MdOutlineKeyboardArrowDown,
  MdOutlineKeyboardArrowUp,
} from "react-icons/md";
import { errorModal } from "../../../common/SweetAlert";

export default function AttendanceListByCourses() {
  const { user } = useAuth();
  const [classes, setClasses] = useState([]);
  const [allAttendance, setAllAttendance] = useState([]);
  const [showWeekByCourse, setShowWeekByCourse] = useState(null);
  const [showStudentByWeek, setShowStudentByWeek] = useState(null);

  useEffect(() => {
    getClassesById(getAllAttendance);
  }, []);

  const getClassesById = (cb) => {
    axios({
      method: "get",
      url: `${baseUrl}/api/class/teacher/${user._id}`,
      headers: {
        authorization: `Bearer ${user.token}`,
      },
    })
      .then((response) => {
        setClasses(response.data);
        cb();
      })
      .catch((err) => {
        errorModal(err);
      });
  };

  const getAllAttendance = () => {
    axios({
      method: "get",
      url: `${baseUrl}/api/attendance/students`,
      headers: {
        authorization: `Bearer ${user.token}`,
      },
      params: { classIdArr: user.classes.join("_") },
    })
      .then(async (response) => {
        setAllAttendance(response.data.attendance);
        console.log(response.data.attendance);
      })
      .catch((err) => {
        errorModal(err);
      });
  };

  const convertDateFormat = (date) => {
    const x = new Date(date);
    let formatDate = new Date(x.toISOString().slice(0, -1));
    return (
      <div className="date">
        <p>
          Time :
          {" " +
            checkCharacterCount(formatDate.getHours()) +
            ":" +
            checkCharacterCount(formatDate.getMinutes()) +
            ":" +
            checkCharacterCount(formatDate.getSeconds())}
        </p>
        <p>
          Date :
          {" " +
            checkCharacterCount(formatDate.getDate()) +
            "/" +
            checkCharacterCount(formatDate.getMonth() + 1) +
            "/" +
            formatDate.getFullYear()}
        </p>
      </div>
    );
  };

  const checkCharacterCount = (text) => {
    return text.toString().length === 1 ? `0${text}` : text;
  };

  return (
    <div>
      <div className="classes-wrapper">
        {classes.map((item, index) => (
          <div key={item._id} className="classes-box">
            <div
              style={{
                display: "flex",
                padding: "10px",
                alignItems: "flex-start",
              }}
            >
              <div style={{ flex: "1" }}>
                <h2>{item.section}</h2>
                <p>{item.subjectName}</p>
              </div>

              <div>
                {showWeekByCourse === null || showWeekByCourse !== index ? (
                  <MdOutlineKeyboardArrowDown
                    className="arrow-icon"
                    onClick={() => setShowWeekByCourse(index)}
                  />
                ) : (
                  <MdOutlineKeyboardArrowUp
                    className="arrow-icon"
                    onClick={() => setShowWeekByCourse(null)}
                  />
                )}
              </div>
            </div>

            {showWeekByCourse === index && (
              <div style={{ margin: "20px" }}>
                {allAttendance.length !== 0 &&
                  allAttendance
                    .filter((aatt) => aatt.classId === item._id)
                    .map((att, index) => (
                      <div key={att._id}>
                        <div className="week">
                          <h2 className="week-title">{index + 1} . Hafta</h2>
                          <div>
                            {showStudentByWeek === null ||
                            showStudentByWeek !== index ? (
                              <MdOutlineKeyboardArrowDown
                                className="arrow-icon"
                                onClick={() => setShowStudentByWeek(index)}
                              />
                            ) : (
                              <MdOutlineKeyboardArrowUp
                                className="arrow-icon"
                                onClick={() => setShowStudentByWeek(null)}
                              />
                            )}
                          </div>
                        </div>

                        <div className="attendance-detail">
                          {convertDateFormat(att.createdAt)}
                          <span>Student Count : {att.absent.length}</span>
                        </div>
                        {showStudentByWeek === index && (
                          <div>
                            {att.absent.length !== 0 &&
                              att.absent.map((student, index) => (
                                <div key={index} className="student-info">
                                  <FaUserCircle className="user-icon" />
                                  <div style={{ margin: "0 20px" }}>
                                    <div className="student-information-detail">
                                      <span className="student-title">
                                        Student No :
                                        <span className="student-description">
                                          {student.usn}
                                        </span>
                                      </span>
                                    </div>
                                    <div className="student-information-detail">
                                      <span className="student-title">
                                        Student Full Name :
                                        <span className="student-description">
                                          {student.fullName}
                                        </span>
                                      </span>
                                    </div>
                                  </div>
                                </div>
                              ))}
                          </div>
                        )}
                      </div>
                    ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
