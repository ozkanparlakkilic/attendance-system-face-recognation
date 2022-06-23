import React from "react";
import { useHistory } from "react-router-dom";
import Menu from "../../../components/Menu/Menu";
import "./Dashboard.css";
import { FaUserCircle } from "react-icons/fa";
import { GiNotebook } from "react-icons/gi";
import { MdOutlineFrontHand } from "react-icons/md";
import { FiBookOpen } from "react-icons/fi";

const Dashboard = () => {
  const history = useHistory();

  return (
    <div className="dashboard">
      <div className="dashboard_menu_box">
        <Menu
          title="Attendance List"
          description="Shows a roll call list of courses"
          childClass="box box-down cyan"
          icon={<GiNotebook className="icon icon-cyan" />}
          onClick={() => history.push("/teacher/attendance")}
        />
        <Menu
          title="Courses"
          description="Lists the lessons given by the teacher"
          childClass="box red"
          icon={<FiBookOpen className="icon icon-red" />}
          onClick={() => history.push("/teacher/courses")}
        />
        <Menu
          title="Take attendance"
          description="Please enter here to start polling"
          childClass="box box-down blue"
          icon={<MdOutlineFrontHand className="icon icon-blue" />}
          onClick={() => history.push("/teacher/take-attendance")}
        />
        <Menu
          title="Profile"
          description="Teacher's profile"
          childClass="box orange"
          icon={<FaUserCircle className="icon icon-orange" />}
          onClick={() => history.push("/teacher/profile")}
        />
      </div>
    </div>
  );
};

export default Dashboard;
