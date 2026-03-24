import React, { useContext, useEffect, useState } from "react";
import "./CartPage.css";
import { useNavigate } from "react-router-dom";
import { ShopContext } from "../../Context/ShopContext";
import axios from 'axios'

const CartPage = () => {
  const navigate = useNavigate();
  const [cartData, setCartData] = useState([]);
  const [products,setProducts]=useState([]);
  const {
    currency,
    updateQuantity,
    cartItems,
    addToCart,
    getCartAmount,
    backend_url
  } = useContext(ShopContext);
  

  useEffect(()=>{
    const fetchProducts=async()=>{
      try {
        const response=await axios.get(`${backend_url}/api/user/products`);
        if(response.data.success){
          setProducts(response.data.products)
        }else{
          console.log(response.data.message);
        }
      } catch (error) {
        console.log(error);
        
      }
    }
    fetchProducts()
  },[products,backend_url])

  useEffect(() => {    
    if (products.merchandise && Object.keys(cartItems).length > 0) {
      const tempData = [];

      for (const productId in cartItems) {
        if (cartItems[productId] > 0) {
          tempData.push({
            _id: productId,
            quantity: cartItems[productId],
          });
          
        }
      }
      setCartData(tempData);
    }

    
  }, [cartItems, products]);
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
          <hr />
          {/*----------------------------------*/}
          {
          cartData.map((item, index) => {
            const product =
              products.merchandise.find(
                (product) => product._id === item._id,
              ) || products.beats.find((product) => product._id === item._id);              

            return (
              <>
                <div key={index} className="cart-center">
                  <div className="cart-center-item">
                    <div className="cart-center-item-image">
                      <img
                        id="cart-center-item-image"
                        src={product.image || product.thumbnail}
                        alt=""
                      />
                    </div>
                    <div className="cart-center-item-details">
                      <h6>{product.title}</h6>
                      <button onClick={()=>updateQuantity(item._id,(item.quantity=0))}>Remove</button>
                    </div>
                  </div>
                  <div className="cart-center-price">
                    <p>{currency} {product.price}</p>
                  </div>
                  <div className="cart-center-quantity">
                    <div className="cart-center-quantity-left">
                      <p onClick={()=>addToCart(item._id)}>+</p>
                    </div>
                    <div className="cart-center-quantity-center">
                      <p>{item.quantity}</p>
                    </div>
                    <div className="cart-center-quantity-right">
                      <p onClick={()=>updateQuantity(item._id,(item.quantity-1))}>-</p>
                    </div>
                  </div>
                  <div className="cart-center-total">
                    <p>{item.quantity*product.price}</p>
                  </div>
                </div>
              </>
            );
          })}
          <hr />
          <div className="cart-bottom">
            <div className="cart-bottom-subtotal">
              <p>Subtotal:</p>
              <p>{currency} {getCartAmount()}</p>
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
              <button onClick={() => navigate("/checkout")}>Checkout</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CartPage;
