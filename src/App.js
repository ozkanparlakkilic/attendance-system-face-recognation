import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import StudentLogin from "./pages/Student/Login/Login";
import "./App.css";
import StudentRegister from "./pages/Student/Register/Register";
import StudentDashboard from "./pages/Student/Dashboard/Dashboard";
import StudentCourses from "./pages/Student/Courses/Courses";
import StudentProfile from "./pages/Student/Profile/Profile";

import JoinAttendance from "./pages/Student/JoinAttendance/JoinAttendance";
import { UserProvider } from "./providers/UserProvider";
import { ModelProvider } from "./providers/ModelProvider";
import ListAttendance from "./pages/Student/ListAttendance/ListAttendance";
import Attendance from "./pages/Student/Attendance/Attendance";

import TeacherDashboard from "./pages/Teacher/Dashboard/Dashboard";
import TeacherCourses from "./pages/Teacher/Courses/Courses";
import TeacherProfile from "./pages/Teacher/Profile/Profile";
import TeacherLogin from "./pages/Teacher/Login/Login";
import TakeAttendance from "./pages/Teacher/TakeAttendance/TakeAttendance";
import StartAttendance from "./pages/Teacher/StartAttendance/StartAttendance";
import AttendanceListByCourses from "./pages/Teacher/AttendanceListByCourses/AttendanceListByCourses";

function App() {
  const user = JSON.parse(localStorage.getItem("user"));
  const teacher = "teacher";
  const student = "student";

  return (
    <ModelProvider>
      <UserProvider>
        <div className="App">
          <Router>
            <Switch>
              <Route path="/" exact component={StudentLogin} />
              <Route path="/register" exact component={StudentRegister} />
              <Route path="/teacher" exact component={TeacherLogin} />
              {user.role === student && (
                <Switch>
                  <Route path="/dashboard" exact component={StudentDashboard} />
                  <Route path="/courses" exact component={StudentCourses} />
                  <Route path="/profile" exact component={StudentProfile} />
                  <Route path="/attendance" exact component={Attendance} />
                  <Route
                    path="/join-attendance/:id"
                    exact
                    component={JoinAttendance}
                  />
                  <Route
                    path="/list-attendance"
                    exact
                    component={ListAttendance}
                  />
                </Switch>
              )}
              {user.role === teacher && (
                <Switch>
                  <Route
                    path="/teacher/dashboard"
                    exact
                    component={TeacherDashboard}
                  />
                  <Route
                    path="/teacher/courses"
                    exact
                    component={TeacherCourses}
                  />
                  <Route
                    path="/teacher/profile"
                    exact
                    component={TeacherProfile}
                  />
                  <Route
                    path="/teacher/take-attendance"
                    exact
                    component={TakeAttendance}
                  />
                  <Route
                    path="/teacher/start-attendance/:id"
                    exact
                    component={StartAttendance}
                  />
                  <Route
                    path="/teacher/attendance/"
                    exact
                    component={AttendanceListByCourses}
                  />
                </Switch>
              )}
            </Switch>
          </Router>
        </div>
      </UserProvider>
    </ModelProvider>
  );
}

export default App;
