import React from "react";
import "./CartPage.css";
import { assets } from "../../assets/assets";
import { useNavigate } from "react-router-dom";

const CartPage = () => {
    const navigate=useNavigate();
  return (
    <>
      <div className="cart-container">
        <div className="cart">
          <div className="cart-top">
            <div className="cart-top-item">
                <h3>Item</h3>
            </div>
            <div className="cart-top-price">
                <h3>Price</h3>
            </div>
            <div className="cart-top-quantity">
                <h3>Quantity</h3>
            </div>
            <div className="cart-top-total">
                <h3>Total</h3>
            </div>
          </div>
          <hr/>
          <div className="cart-center">
             <div className="cart-center-item">
                <div className="cart-center-item-image">
                    <img id="cart-center-item-image" src={assets.product5} alt="" />
                </div>
                <div className="cart-center-item-details">
                    <h4>Shirt</h4>
                    <button>Remove</button>
                </div>
            </div>
            <div className="cart-center-price">
                <p>kes 2,500</p>
            </div>
            <div className="cart-center-quantity">
                <div className="cart-center-quantity-left">
                    <p>+</p>
                </div>
                <div className="cart-center-quantity-center">
                    <p>2</p>
                </div>
                <div className="cart-center-quantity-right">
                    <p>-</p>
                </div>
            </div>
            <div className="cart-center-total">
                <p>kes 5,000</p>
            </div>
          </div>
          <hr/>
          <div className="cart-bottom">
            <div className="cart-bottom-subtotal">
                <p>Subtotal:</p>
                <p>Kes 5,000</p>
            </div>
            <div className="cart-bottom-vat">
                <p>VAT Tax:</p>
                <p>Kes 0.00</p>
            </div>
            <div className="cart-bottom-delivery">
                <p>Delivery:</p>
                <p>Kes 0.00</p>
            </div>
            <div className="cart-bottom-btn">
                <button onClick={()=>navigate('/checkout')}>Checkout</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CartPage;
