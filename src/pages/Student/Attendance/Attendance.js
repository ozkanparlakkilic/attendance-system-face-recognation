import axios from "axios";
import React, { useState } from "react";
import { useEffect } from "react";
import { useAuth } from "../../../hook/useAuth";
import { baseUrl } from "../../../utils/getUrl";
import "./Attendance.css";
import { TiTick } from "react-icons/ti";
import {
  MdOutlineClose,
  MdOutlineKeyboardArrowDown,
  MdOutlineKeyboardArrowUp,
} from "react-icons/md";
import { errorModal } from "../../../common/SweetAlert";

export default function Attendance() {
  const { user } = useAuth();
  const [classes, setClasses] = useState([]);
  const [allAttendance, setAllAttendance] = useState([]);
  const [attendanceCount, setAttendanceCount] = useState(0);
  const [showWeekByCourse, setShowWeekByCourse] = useState(null);

  useEffect(() => {
    getClassesById(getAllAttendance);
  }, []);

  const getClassesById = (cb) => {
    axios({
      method: "get",
      url: `${baseUrl}/api/class/student/${user._id}`,
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
      url: `${baseUrl}/api/attendance`,
      headers: {
        authorization: `Bearer ${user.token}`,
      },
      params: { classIdArr: user.classes.join("_") },
    })
      .then(async (response) => {
        setAllAttendance(response.data.attendance);
        setAttendanceCount(
          response.data.attendance.filter(
            (abs) => abs.absent.indexOf(user._id) > -1
          ).length
        );
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
              style={{ display: "flex", width: "100%", alignItems: "center" }}
            >
              <div style={{ flex: "1" }}>
                <h2>{item.section}</h2>
                <p>{item.subjectName}</p>
              </div>
              <div>
                <p style={{ width: "100%" }}>Attendance : {attendanceCount}</p>
                <p style={{ width: "100%" }}>
                  All Attendance :{" "}
                  {
                    allAttendance.filter((aatt) => aatt.classId === item._id)
                      .length
                  }
                </p>
              </div>
              <div style={{ alignSelf: "flex-start", margin: "10px" }}>
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
                {allAttendance
                  .filter((aatt) => aatt.classId === item._id)
                  .map((att, index) => (
                    <div key={att._id}>
                      <h2 className="week">{index + 1} . Week</h2>
                      <div className="attendance-detail">
                        {convertDateFormat(att.createdAt)}
                        {att.absent.indexOf(user._id) > -1 ? (
                          <TiTick className="icon" style={{ color: "green" }} />
                        ) : (
                          <MdOutlineClose
                            className="icon"
                            style={{ color: "red" }}
                          ></MdOutlineClose>
                        )}
                      </div>
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
