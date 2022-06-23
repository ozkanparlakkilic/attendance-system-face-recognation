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
  const { user, setUser } = useAuth();

  const login = () => {
    axios({
      method: "post",
      url: `${baseUrl}/api/student/login`,
      headers: {},
      data: {
        email,
        password,
      },
    })
      .then(function (response) {
        setUser(response.data.user);
        const userObj = response.data.user;
        userObj.token = response.data.token;
        userObj.role = "student";
        localStorage.setItem("user", JSON.stringify(userObj));
        loginModal("Giriş yapılıyor", nextPage);
      })
      .catch(function (error) {
        errorModal(error);
      });

    // axios
    //   .post(`${baseUrl}/api/student/login`, {
    //     email,
    //     password,
    //   })
    //   .then(function (response) {
    //     setUser(response.data.user);
    //     const userObj = response.data.user;
    //     userObj.token = response.data.token;
    //     userObj.role = "student";
    //     localStorage.setItem("user", JSON.stringify(userObj));
    //     loginModal("Giriş yapılıyor", nextPage);
    //   })
    //   .catch(function (error) {
    //     errorModal(error);
    //   });
  };

  const nextPage = () => {
    history.push("/dashboard");
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
          title="Register"
          onClick={() => history.push("/register")}
          style={{ margin: "0 .5rem" }}
        />
        <Button
          title="Teacher"
          onClick={() => history.push("/teacher")}
          style={{ margin: "0 .5rem" }}
        />
      </div>
    </div>
  );
};

export default Login;
