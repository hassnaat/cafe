import './App.css';
import Home from './screens/Home/Home';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './screens/Auth/Login';
import Signup from './screens/Auth/Signup';
import AdminLogin from './screens/Auth/AdminLogin';
import Children from './screens/Children/Children';
import Checkout from './screens/Checkout/Checkout';
import AdminSignup from './screens/Auth/AdminSignup';
import { ToastContainer } from "react-toastify"
import 'react-toastify/dist/ReactToastify.css';

function App() {
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
          <Route path="/" element={<Home />} />
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/admin/signup" element={<AdminSignup />} />
          <Route path="/children" element={<Children />} />
          <Route path="/checkout" element={<Checkout />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
