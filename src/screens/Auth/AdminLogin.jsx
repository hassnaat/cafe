import React, { useEffect, useState } from "react";
import "./Auth.css";
import User from "../../assets/images/user.png";
import axios from "../../axiosInstance";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addUser } from "../../store/user";
import asyncLocalStorage from "./asyncLocalStorage";
const AdminLogin = () => {
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
    console.log(data);
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
        const stored = await asyncLocalStorage.setItem(
          "user",
          JSON.stringify(registered.data)
        );
        window.location.href = "/dashboard";
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
              value="Cashier Login"
              onClick={handleSubmit}
            />
          </form>
          <Link to="/admin/signup" className="goto_signup_btn">
            Go to Signup
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
