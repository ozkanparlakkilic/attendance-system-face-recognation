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
          title="Attendance"
          description="Lists the student's participation in the lesson, lesson by lesson"
          childClass="box box-down cyan"
          icon={<GiNotebook className="icon icon-cyan" />}
          onClick={() => history.push("/attendance")}
        />
        <Menu
          title="Courses"
          description="Lists the courses you have taken this semester"
          childClass="box red"
          icon={<FiBookOpen className="icon icon-red" />}
          onClick={() => history.push("/courses")}
        />
        <Menu
          title="List attendance"
          description="To participate in the roll call, please enter here"
          childClass="box box-down blue"
          icon={<MdOutlineFrontHand className="icon icon-blue" />}
          onClick={() => history.push("/list-attendance")}
        />
        <Menu
          title="Profile"
          description="Student's profile"
          childClass="box orange"
          icon={<FaUserCircle className="icon icon-orange" />}
          onClick={() => history.push("/profile")}
        />
      </div>
    </div>
  );
};

export default Dashboard;
