import './App.css';
import { useState, useEffect } from "react"
import Home from './screens/Home/Home';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './screens/Auth/Login';
import Signup from './screens/Auth/Signup';
import AdminLogin from './screens/Auth/AdminLogin';
import Children from './screens/Children/Children';
import Checkout from './screens/Checkout/Checkout';
import AdminSignup from './screens/Auth/AdminSignup';
import { ToastContainer } from "react-toastify"
import 'react-toastify/dist/ReactToastify.css';
import { useSelector } from 'react-redux';

function App() {
  const user = useSelector(state => state.user)
  const [authenticated, setAuthenticated] = useState();
  const [isAdmin, setIsAdmin] = useState();
  useEffect(() => {
    if (localStorage.getItem("user") !== null) {
      setAuthenticated(true)
    }
    else {
      setAuthenticated(false)
    }
  }, [localStorage.getItem("user")])
  return (
    <Router>
      <div className="App">
        <ToastContainer
          position="top-center"
          autoClose={5000}
          hideProgressBar={true}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
        <Routes>
          <Route path="/admin/login" element={!authenticated ? <AdminLogin /> : <Navigate replace to="/dashboard" />} />
          <Route path="/login" element={!authenticated ? <Login /> : <Navigate replace to="/" />} />
          <Route path="/signup" element={!authenticated ? <Signup /> : <Navigate replace to="/" />} />
          <Route path="/admin/signup" element={!authenticated ? <AdminSignup /> : <Navigate replace to="/dashboard" />} />
          <Route path="/dashboard" element={authenticated ? <Home /> : <Navigate replace to="/admin/login" />} />
          <Route path="/" element={authenticated ? <Children /> : <Navigate replace to="/login" />} />
          <Route path="/checkout" element={authenticated ? <Checkout /> : <Navigate replace to="/login" />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
