import React from "react";
import "./Ecommerce.css";
import { useDispatch, useSelector } from "react-redux";
import { addItemsToCart } from "../../../store/reducers/cart";
import ovaltick from "./assets/oval_tick.png";
import { toast, ToastContainer } from "react-toastify";
import discountBadge from "./assets/discount_badge_icon.png";
const ProductDetails = ({ product }) => {
  const dispatch = useDispatch();
  return (
    <>
      <ToastContainer
        position="bottom-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
      <section className="container mt-6">
        <div className="row container-fluid justify-content-center">
          <div className="col-12 col-md-6 container flex-column">
            <div className="product_img">
              <div className="product-detail-badge">
                <img src={discountBadge} alt="" />
                <span>
                  {product.discountType === "Percentage"
                    ? `${-product.discountValue + "%"}`
                    : `${-product.discountValue + " Rs"}`}{" "}
                </span>
              </div>
              <img
                src={product.image && product.image}
                alt=""
                className="product-big-img"
              />
            </div>
          </div>
          <div className="col-12 col-md-6">
            <div className="contaier-fluid product-details-col flex-column">
              <h5 className="">{product.name}</h5>
              <div className="product-price">
                <span>Selling Price : </span>
                <span style={{ textDecoration: "line-through" }}>
                  ₹{product.sellingPrice}
                </span>
              </div>

              <div className="paycard-view">
                <div className="dealPrice-view">
                  <p>Selling Price</p>
                  <p>₹{product.sellingPrice}</p>
                </div>
                <div className="dealPrice-view">
                  <p>Discount</p>
                  <p>
                    {" "}
                    {product.discountType === "Percentage"
                      ? `${-product.discountValue + "%"}`
                      : `${-product.discountValue + " Rs"}`}{" "}
                  </p>
                </div>

                <div className="youPay-view">
                  <h4>You Pay</h4>
                  <h4>₹{product.offerPrice}</h4>
                </div>
              </div>
              <div className="detais-buttons-container container-fluid">
                <button className="btn btn-primary ">Add to Cart</button>
              </div>
            </div>
          </div>
        </div>
        <div className="row container">
          <div className="col-12 col-md-6">
            <div className="container-fluid mt-4" style={{ paddingLeft: 0 }}>
              <h4>Description</h4>
              <p>{product.description}</p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default ProductDetails;
