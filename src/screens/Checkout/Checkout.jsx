import React from "react";
import "./Checkout.css";
import Juice from "../../assets/images/juice 2.png";
const Checkout = () => {
  return (
    <div className="mainscreen">
      <div className="ch_card">
        <div className="ch_card_leftside">
          <img src={Juice} alt="" />
        </div>
        <div className="ch_card_rightside">
          <form action="">
            <h1>CheckOut</h1>
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

            <p>Card Type</p>
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
            </select>
            <div className="expcvv">
              <p className="expcvv_text">Expiry</p>
              <input
                type="date"
                className="ch_card_inputbox"
                name="exp_date"
                id="exp_date"
                required
              />

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
            <button type="submit" className="ch_card_button">
              CheckOut
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
