import React from "react";
import "./Auth.css";
const Logout = (isAdmin) => {
  const handleLogout = () => {
    localStorage.removeItem("user");
    if (isAdmin) {
      window.location.pathname = !isAdmin ? "/login" : "/admin/login";
    } else {
      window.location.pathname = "/login";
    }
  };

  return (
    <div className="logout_btn" onClick={handleLogout}>
      Logout
    </div>
  );
};

export default Logout;
