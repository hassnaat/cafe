import React, { useState } from "react";
import "./Checkout.css";
import Juice from "../../assets/images/juice 2.png";
import axios from "../../axiosInstance";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
const Checkout = () => {
  const [amount, setAmount] = useState(0);
  const user = useSelector((state) => state.user);
  const params = new URLSearchParams(window.location.search);
  const navigate = useNavigate();
  const child_id = params.get("child_id");
  const balance = params.get("balance");
  const months = [
    "01",
    "02",
    "03",
    "04",
    "05",
    "06",
    "07",
    "08",
    "09",
    "10",
    "11",
    "12",
  ];
  const years = [
    "2022",
    "2023",
    "2024",
    "2025",
    "2026",
    "2027",
    "2028",
    "2029",
    "2030",
    "2031",
    "2032",
    "2033",
    "2034",
    "2035",
  ];
  const handleCheckout = async () => {
    try {
      const updated = await axios.put(
        "/children",
        {
          child_id,
          balance: balance + amount,
        },
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );
      console.log(updated);
      if (updated) {
        navigate("/");
      }
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
  };
  return (
    <div className="mainscreen">
      <div className="ch_card">
        <div className="ch_card_leftside">
          <img src={Juice} alt="" />
        </div>
        <div className="ch_card_rightside">
          <form action="">
            <h1>Add Balance</h1>
            <h2>Payment Information</h2>
            <p>Cardholder Name</p>
            <input
              type="text"
              className="ch_card_inputbox"
              name="name"
              required
            />
            <p>Card Number</p>
            <input
              type="number"
              className="ch_card_inputbox"
              name="card_number"
              id="card_number"
              required
            />
            <p>Amount</p>
            <input
              type="number"
              className="ch_card_inputbox"
              name="amount"
              id="amount"
              onChange={(e) => setAmount(e.target.value)}
              required
            />

            {/* <p>Card Type</p>
            <select
              className="ch_card_inputbox"
              name="card_type"
              id="card_type"
              required
            >
              <option value="">--Select a Card Type--</option>
              <option value="Visa">Visa</option>
              <option value="RuPay">RuPay</option>
              <option value="MasterCard">MasterCard</option>
            </select> */}
            <div className="expcvv">
              <p className="expcvv_text">Expiry</p>
              <select className="expcvv_opts">
                {months.map((item) => (
                  <option value={item}>{item}</option>
                ))}
              </select>
              <select className="expcvv_opts">
                {years.map((item) => (
                  <option value={item}>{item}</option>
                ))}
              </select>

              <p className="expcvv_text2">CVV</p>
              <input
                type="password"
                className="ch_card_inputbox"
                name="cvv"
                id="cvv"
                required
              />
            </div>
            <p></p>
            <button
              type="submit"
              className="ch_card_button"
              onClick={handleCheckout}
            >
              ADD
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
