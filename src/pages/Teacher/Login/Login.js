import React from "react";
import Input from "../../../components/Input/Input";
import Button from "../../../components/Button/Button";
import "./Login.css";
import { useState } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import { baseUrl } from "../../../utils/getUrl";
import { useAuth } from "../../../hook/useAuth";
import { errorModal, loginModal } from "../../../common/SweetAlert";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const history = useHistory();
  const { setUser } = useAuth();

  const login = () => {
    axios
      .post(`${baseUrl}/api/teacher/login`, {
        email,
        password,
      })
      .then(function (response) {
        console.log(response);
        setUser(response.data.user);
        const userObj = response.data.user;
        userObj.token = response.data.token;
        userObj.role = "teacher";
        localStorage.setItem("user", JSON.stringify(userObj));
        loginModal("Giriş yapılıyor", nextPage);
      })
      .catch(function (error) {
        errorModal(error);
      });
  };

  const nextPage = () => {
    history.push("/teacher/dashboard");
    window.location.reload();
  };

  return (
    <div className="login_wrapper">
      <div className="input_box">
        <Input placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
        <Input
          placeholder="Password"
          type="password"
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>

      <div className="button_box">
        <Button
          title="Login"
          onClick={() => login()}
          style={{ margin: "0 .5rem" }}
        />
        <Button
          title="Student"
          onClick={() => history.push("/")}
          style={{ margin: "0 .5rem" }}
        />
      </div>
    </div>
  );
};

export default Login;
