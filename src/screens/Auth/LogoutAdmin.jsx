import React from "react";
import "./Auth.css";
const LogoutAdmin = (isAdmin) => {
  const handleLogout = () => {
    localStorage.removeItem("user");

    window.location.pathname = !isAdmin ? "/login" : "/admin/login";
  };

  return (
    <div className="logout_btn" onClick={handleLogout}>
      Logout
    </div>
  );
};

export default LogoutAdmin;
