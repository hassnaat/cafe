import React, { useEffect, useState } from "react";
import "./Auth.css";
import User from "../../assets/images/user.png";
import axios from "../../axiosInstance";
import useFetch from "../../hooks/UseFetch";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addUser } from "../../store/user";
import asyncLocalStorage from "./asyncLocalStorage";
const AdminSignup = () => {
  const navigate = useNavigate();
  const [data, setData] = useState({
    username: null,
    password: null,
    confirmPassword: null,
    name: null,
    phone_number: null,
    age: null,
    role: "CASHIER",
    province_id: null,
    city_id: null,
    school_id: null,
  });
  const [provinceId, setProvinceId] = useState(1);
  const [cityId, setCityId] = useState(1);
  const [schoolId, setSchoolId] = useState(1);
  const provinces = useFetch("/provinces");
  const [cities, setCities] = useState(null);
  const [schools, setSchools] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const fetchCities = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`/cities/${provinceId}`);
      setCities(res);
      setLoading(false);
      setCityId(res.data[0].city_id);
    } catch (error) {
      setLoading(false);
      setError(error);
    }
  };
  const fetchSchools = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`/schools/${cityId}`);
      setSchools(res);
      setLoading(false);
      setSchoolId(res.data[0].school_id);
    } catch (error) {
      setLoading(false);
      setError(error);
    }
  };
  const handleProvinceChange = (id) => {
    setProvinceId(id);
  };
  const handleCityChange = (id) => {
    setCityId(id);
  };
  useEffect(() => {
    console.log(provinceId);
    fetchCities();
  }, [provinceId]);

  useEffect(() => {
    console.log(cityId);
    fetchSchools();
  }, [cityId]);

  useEffect(() => {
    console.log(provinceId);
  }, [provinceId]);

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
        const registered = await axios.post("/register", {
          ...data,
          province_id: parseInt(provinceId),
          city_id: parseInt(cityId),
          school_id: parseInt(schoolId),
        });
        const stored = await asyncLocalStorage.setItem(
          "user",
          JSON.stringify(registered.data)
        );
        window.location.href = "/dashboard";
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
            <select
              id="province"
              className="login_form_input "
              name="province_id"
              onChange={(e) => {
                handleProvinceChange(e.target.value);
              }}
            >
              {provinces.response &&
                provinces.response.data.map((item) => {
                  return (
                    <option value={`${item.province_id}`}>
                      {item.province_name}
                    </option>
                  );
                })}
            </select>

            <select
              id="city"
              className="login_form_input "
              name="city"
              onChange={(e) => {
                handleCityChange(e.target.value);
              }}
            >
              {cities?.data &&
                cities.data.map((item) => {
                  return (
                    <option value={`${item.city_id}`}>{item.city_name}</option>
                  );
                })}
            </select>
            <select
              id="school"
              className="login_form_input "
              name="school"
              onChange={(e) => {
                setSchoolId(e.target.value);
              }}
            >
              {schools?.data &&
                schools.data.map((item) => {
                  return (
                    <option value={`${item.school_id}`}>
                      {item.school_name}
                    </option>
                  );
                })}
            </select>
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
              value="Cashier Signup"
              onClick={handleSubmit}
            />
          </form>
          <Link to="/admin/login" className="goto_signup_btn">
            Go to Login
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AdminSignup;
