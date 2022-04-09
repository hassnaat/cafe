import React, { useState, useEffect } from "react";
import "./Home.css";
import Avatar from "../../assets/images/avatar.jpg";
import burger from "../../assets/images/burger.jpg";
import pizza from "../../assets/images/pizza.png";
import sandwitch from "../../assets/images/sandwitch.png";
import water from "../../assets/images/water.jpg";
import fries from "../../assets/images/fries.jpg";
import juice from "../../assets/images/juice.jpg";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import axios from "../../axiosInstance";
import { toast } from "react-toastify";
import {
  addItem,
  clearCart,
  decrementItem,
  incrementItem,
  removeItem,
} from "../../store/cart";
import { addUser } from "../../store/user";
import useFetch from "../../hooks/UseFetch";
import CheckoutModal from "../Modals/Checkout";
import Logout from "../Auth/Logout";
import LogoutAdmin from "../Auth/LogoutAdmin";

const Home = () => {
  const navigate = useNavigate();
  const [childId, setChildId] = useState("");
  const [childData, setChildData] = useState({});
  const [checkoutModal, setCheckoutModal] = useState(false);
  const user = useSelector((state) => state.user);
  const cart = useSelector((state) => state.cart);
  const productList = useFetch("/products", {
    headers: { Authorization: `Bearer ${user.token}` },
  });
  const handleString = (str) => {
    let string = str;
    if (str.length < 4) {
      for (let i = str.length; i <= 3; i++) {
        string = "0" + string;
      }
    }
    return string;
  };
  const searchChild = async (e) => {
    e.preventDefault();
    dispatch(clearCart());
    try {
      const child = await axios.get(
        `/children/${user.user.user_code}${handleString(childId)}`,
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );
      setChildData(child.data);
      console.log(child);
    } catch (error) {
      toast.error("Couldn't Found!", {
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

  const dispatch = useDispatch();
  useEffect(() => {
    console.log(productList);
  }, [productList]);
  return (
    <div className="home_screen">
      {checkoutModal && (
        <CheckoutModal
          setCheckoutModal={setCheckoutModal}
          searchChild={searchChild}
          childData={childData}
        />
      )}
      <div className="home_screen_header">
        <div className="hs_logout_wrapper">
          <Logout />
        </div>
        <div className="hs_header_left">
          <div className="hs_hl_image">
            <img
              src={
                childData.image !== null
                  ? `data:image/png;base64,${childData.image}`
                  : Avatar
              }
              alt=""
            />
          </div>
          <div className="hs_hl_info">
            <div>Name: {childData?.name}</div>
            <div>age: {childData?.age}</div>
            <div>Balance: {childData?.balance} SR</div>
          </div>
        </div>
        <div className="hs_header_right">
          <form className="hs_hr_form">
            <label className="hs_hr_formlabel">Enter ID:</label>
            <input
              type="text"
              className="hs_hr_forminput"
              name=""
              onChange={(e) => {
                setChildId(e.target.value);
              }}
            />
            <button className="hs_hr_formbtn" onClick={searchChild}>
              Search
            </button>
          </form>
        </div>
      </div>
      <div className="home_screen_body">
        <div className="home_screen_cart">
          <div className="hsc_cart_heading">Cart</div>
          <div className="hsc_cart_body">
            {cart.products.map((item, index) => (
              <div className="hsc_cart_item">
                <img
                  src={`data:image/png;base64,${item.image}`}
                  className="hscc_item_image"
                />
                <span className="hscc_item_title">{item.product_name}</span>
                <div className="hscc_item_count">
                  <span
                    className="hscc_item_cbtn"
                    onClick={() => dispatch(incrementItem(index))}
                  >
                    +
                  </span>
                  <span className="hscc_item_quantity">{item.qty}</span>
                  {item.qty > 1 ? (
                    <span
                      className="hscc_item_cbtn"
                      onClick={() => dispatch(decrementItem(index))}
                    >
                      -
                    </span>
                  ) : (
                    <span
                      className="hscc_item_xbtn"
                      onClick={() => dispatch(removeItem(item.product_id))}
                    >
                      <span>x</span>
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
          {cart.products.length > 0 && childData.name && (
            <div className="hsc_cart_footer">
              <span className="hsc_cf_total">
                Total:
                {cart.products.length > 0
                  ? cart.products
                      .map((item, index) => {
                        return cart.products[index].price * item.qty;
                      })
                      .reduce((total, num) => {
                        return total + num;
                      })
                  : 0}
              </span>
              <button
                type="submit"
                className="ch_cart_button"
                onClick={() => setCheckoutModal(true)}
              >
                Proceed to checkout
              </button>
            </div>
          )}
        </div>
        <div className="home_screen_products">
          {/* {productList.loading && (
            <div className="loading_section">Loading Products...</div>
          )}
          {productList.error && (
            <div className="loading_section">Something went wrong!</div>
          )}
          {productList.response?.data?.length < 1 && (
            <div className="loading_section">No Product available!</div>
          )} */}
          {productList.response &&
            productList.response.data?.map((item) => {
              return (
                <div
                  className="home_screen_product"
                  onClick={() => dispatch(addItem(item))}
                >
                  <img src={`data:image/png;base64,${item.image}`} alt="" />
                </div>
              );
            })}
          {/* <div className="home_screen_product">
            <img src={pizza} alt="" />
          </div>
          <div className="home_screen_product">
            <img src={water} alt="" />
          </div>
          <div className="home_screen_product">
            <img src={juice} alt="" />
          </div>
          <div className="home_screen_product">
            <img src={sandwitch} alt="" />
          </div>
          <div className="home_screen_product">
            <img src={fries} alt="" />
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default Home;
