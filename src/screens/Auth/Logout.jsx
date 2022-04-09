import React from "react";
import "./Auth.css";
const Logout = () => {
  const handleLogout = () => {
    const user = JSON.parse(localStorage.getItem("user"));
    const userType = user.user.authorities[0].name;
    if (userType === "ROLE_PARENT") {
      localStorage.removeItem("user");
      window.location.pathname = "/login";
    } else {
      localStorage.removeItem("user");
      window.location.pathname = "/admin/login";
    }
  };

  return (
    <div className="logout_btn" onClick={handleLogout}>
      Logout
    </div>
  );
};

export default Logout;
