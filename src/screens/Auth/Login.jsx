import React, { useEffect, useState } from "react";
import "./Auth.css";
import User from "../../assets/images/user.png";
import axios from "../../axiosInstance";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addUser } from "../../store/user";
const Login = () => {
  const navigate = useNavigate();
  const [data, setData] = useState({
    username: null,
    password: null,
  });

  const dispatch = useDispatch();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((preVal) => {
      return {
        ...preVal,
        [name]: value,
      };
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (data.username === null || data.password === null) {
      toast.error("All fields are required!", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } else {
      try {
        const registered = await axios.post("/login", data);
        localStorage.setItem("user", JSON.stringify(registered.data));
        dispatch(addUser(registered.data));

        navigate("/children");
      } catch (error) {
        toast.error("Failed to Login", {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      }
    }
  };
  return (
    <div className="login_form_wrapper">
      <div className="login_form_box ">
        <div id="loginformContent">
          <div className="form_user_icon">
            <img src={User} id="icon" alt="User Icon" />
          </div>

          <form>
            <input
              type="text"
              id="email"
              className="login_form_input "
              name="username"
              placeholder="Email Address"
              onChange={handleChange}
              value={data.username}
              required={true}
            />
            <input
              type="text"
              id="password"
              className="login_form_input "
              name="password"
              placeholder="Password"
              onChange={handleChange}
              value={data.password}
              required={true}
            />
            <input
              type="submit"
              className="login_form_btn"
              value="Login"
              onClick={handleSubmit}
            />
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
