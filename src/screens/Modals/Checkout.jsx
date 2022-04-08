import React, { useEffect, useState } from "react";
import axios from "../../axiosInstance";
import "./Modals.css";
import useFetch from "../../hooks/UseFetch";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { clearCart } from "../../store/cart";

const CheckoutModal = ({ setCheckoutModal, childData, searchChild }) => {
  const user = useSelector((state) => state.user);
  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const total = () =>
    cart.products.length > 0
      ? cart.products
          .map((item, index) => {
            return cart.products[index].price * item.qty;
          })
          .reduce((total, num) => {
            return total + num;
          })
      : 0;

  const handleCheckout = async () => {
    try {
      const updated = axios.put(
        "/children",
        {
          child_id: childData.child_id,
          balance: childData.balance - parseInt(total()),
        },
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );
      setCheckoutModal(false);
      window.location.pathname = "/";
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
  console.log(childData);
  return (
    <div className="modal_backdrop" onClick={() => setCheckoutModal(false)}>
      <div className="custom_modal_box2" onClick={(e) => e.stopPropagation()}>
        <div className="cmb_heading">Checkout</div>
        {childData.balance < total() ? (
          <div className="cmb_no_balance">You dont have enough balance!</div>
        ) : (
          <div className="checkout_modal_body">
            <div className="cmb_body_item">
              <div className="cmb_body_itemleft">Total</div>
              <div className="cmb_body_itemright">{total()} SR</div>
            </div>
            <div className="cmb_body_item">
              <div className="cmb_body_itemleft">Remaining Balance</div>
              <div className="cmb_body_itemright">
                {childData.balance - parseInt(total())} SR
              </div>
            </div>
            <div className="cmd_checkout_btn" onClick={handleCheckout}>
              Checkout
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CheckoutModal;
