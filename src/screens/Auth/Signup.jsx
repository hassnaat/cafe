import React, { useEffect, useState } from "react";
import "./Auth.css";
import User from "../../assets/images/user.png";
import axios from "../../axiosInstance";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addUser } from "../../store/user";
import asyncLocalStorage from "./asyncLocalStorage";
const Signup = () => {
  const navigate = useNavigate();
  const [data, setData] = useState({
    username: null,
    password: null,
    confirmPassword: null,
    name: null,
    phone_number: null,
    age: null,
    role: "PARENT",
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
    if (data.password !== data.confirmPassword) {
      toast.error("Password doesn't match", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } else if (
      data.name === null ||
      data.username === null ||
      data.phone_number === null ||
      data.age === null ||
      data.password === null ||
      data.confirmPassword === null
    ) {
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
        const registered = await axios.post("/register", data);
        const stored = await asyncLocalStorage.setItem(
          "user",
          JSON.stringify(registered.data)
        );
        // dispatch(addUser(registered.data));

        window.location.href = "/";
      } catch (error) {
        toast.error("Failed to register", {
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
              id="name"
              className="login_form_input "
              name="name"
              placeholder="Name"
              onChange={handleChange}
              value={data.name}
              required={true}
            />
            <input
              type="text"
              id="phone"
              className="login_form_input "
              name="phone_number"
              placeholder="Phone Number"
              onChange={handleChange}
              value={data.phone_number}
              required={true}
            />
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
              type="number"
              id="age"
              className="login_form_input "
              name="age"
              placeholder="age"
              onChange={handleChange}
              value={data.age}
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
              type="text"
              id="cpassword"
              className="login_form_input "
              name="confirmPassword"
              placeholder="Confirm Password"
              onChange={handleChange}
              value={data.confirmPassword}
              required={true}
            />
            <input
              type="submit"
              className="login_form_btn"
              value="Signup"
              onClick={handleSubmit}
            />
          </form>
          <Link to="/login" className="goto_signup_btn">
            Go to Login
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Signup;
