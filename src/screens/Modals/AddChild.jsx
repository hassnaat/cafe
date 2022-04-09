import React, { useEffect, useState } from "react";
import axios from "../../axiosInstance";
import "./Modals.css";
import useFetch from "../../hooks/UseFetch";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
const AddChild = ({ setAddChild, setChildrenData }) => {
  const [provinceId, setProvinceId] = useState(1);
  const navigate = useNavigate();
  const [cityId, setCityId] = useState(1);
  const [schoolId, setSchoolId] = useState(1);
  const provinces = useFetch("/provinces");
  const [cities, setCities] = useState(null);
  const [schools, setSchools] = useState(null);
  const userData = useSelector((state) => state.user);
  const [disableSubmit, setDisableSubmit] = useState(true);
  const [data, setData] = useState({
    name: null,
    age: null,
    image: null,
    user_id: userData.user.id,
    province_id: null,
    city_id: null,
    school_id: null,
  });

  const fetchCities = async () => {
    try {
      const res = await axios.get(`/cities/${provinceId}`);
      setCities(res);
      setCityId(res.data[0].city_id);
    } catch (error) {}
  };
  const fetchSchools = async () => {
    try {
      const res = await axios.get(`/schools/${cityId}`);
      setSchools(res);
      setSchoolId(res.data[0].school_id);
    } catch (error) {}
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
    data.image === null || data.name === null || data.age === null
      ? setDisableSubmit(true)
      : setDisableSubmit(false);
  }, [data.image, data.name, data.age]);

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
  const convertBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);
      fileReader.onload = () => {
        resolve(fileReader.result);
      };
      fileReader.onerror = (error) => {
        reject(error);
      };
    });
  };
  const handleImageUpload = async (event) => {
    console.log(event.target.files[0]);
    const file = event.target.files[0];
    const base64 = await convertBase64(file);
    setData((preVal) => {
      return {
        ...preVal,
        image: base64,
      };
    });
  };

  const handleSubmit = async (e) => {
    console.log(data);
    e.preventDefault();
    if (data.name === null || data.age === null) {
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
        const res = await axios.post(
          "/addChild",
          {
            ...data,

            province_id: parseInt(provinceId),
            city_id: parseInt(cityId),
            school_id: parseInt(schoolId),
          },
          {
            headers: {
              Authorization: `Bearer ${userData.token}`,
            },
          }
        );
        window.location.href = "/";
      } catch (error) {
        toast.error("Something went wrong", {
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
    <div className="modal_backdrop" onClick={() => setAddChild(false)}>
      <div className="custom_modal_box" onClick={(e) => e.stopPropagation()}>
        <div className="cmb_heading">Add a child</div>
        <form>
          <input
            type="text"
            id="name"
            className="login_form_input "
            name="name"
            placeholder="Full Name"
            onChange={handleChange}
            value={data.name}
          />
          <input
            type="number"
            id="age"
            className="login_form_input "
            name="age"
            placeholder="Age"
            onChange={handleChange}
            value={data.age}
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

          <label for="picture" className="image_upload_label">
            Upload Profile Picture
            <input
              style={{
                visibility: "hidden",
                position: "absolute",
                zIndex: "-1",
              }}
              type="file"
              id="picture"
              accept="image/*"
              className="login_form_input "
              name="picture"
              placeholder="Profile Picture"
              onChange={handleImageUpload}
            />
          </label>

          <input
            type="submit"
            className={`login_form_btn ${
              data.image === null && "disable_submit_btn"
            }`}
            value="Add Child"
            onClick={handleSubmit}
          />
        </form>
      </div>
    </div>
  );
};

export default AddChild;
