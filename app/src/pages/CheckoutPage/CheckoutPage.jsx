import React, { useState } from 'react'
import './CheckoutPage.css'
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import {assets} from '../../assets/assets.js'

const CheckoutPage = () => {
    const [mpesa,setMpesa]=useState(false);
    const [paypal,setPaypal]=useState(false);
    const [cod,setCod]=useState(true);
    const navigate=useNavigate();
  return (
    <>
    <div className="checkout-container">
        {/*---------------------------------*/}
        <div className="checkout-left">
            <h1>Delivery Address</h1>
            <div className="checkout-left-form">
                <form>
                    <div className="form-class">
                        <input type="text" name="fname" id="" placeholder='First Name' />
                        <input type="text" name="lname" id=""  placeholder='Last Name'/>
                    </div>
                    <br></br>
                    <input type="email" name="email" id=""  placeholder='Email Address'/>
                    <br></br>
                    <input type="text" name="phone" id="" placeholder='Phone Number' />
                    <br></br>
                    <div className="form-class">
                        <input type="text" name="county" id="" placeholder='County' />
                        <input type="text" name="code" id="" placeholder='Postal Code'/>
                    </div>
                    <br></br>
                    <div className="form-class">
                        <input type="text" name="ward" id="" placeholder='Ward'/>
                        <input type="text" name="street" id="" placeholder='Street'/>
                    </div>
                    <br></br>
                    <textarea name="notes" id="" rows={3} placeholder='Order Notes(Sizes for merchandise & length for beats)'></textarea>
                </form>
            </div>
        </div>
        {/*---------------------------------*/}
        <div className="checkout-right">
            <h1>Your Order</h1>
            <div className="checkout-right-order">
                <div className="checkout-right-order-img">
                    <img id='checkout-right-order-img' src={assets.product5} alt="" />
                </div>
                <div className="checkout-right-order-details">
                    <p>Shirt</p>
                    <p>Kes 5,000</p>
                </div>
            </div>

            <hr />
            <p>Subtotal: kes 5,000</p>
            <hr />

            <div className="checkout-right-payment">
                <h4>Payment Options</h4>

                <div className="checkout-right-mpesa">
                    <div onClick={()=>(setMpesa(!mpesa),setPaypal(false),setCod(false))} style={{background:mpesa?"#32CD32":"",border:mpesa?"0":""}} className="mpesa-box">

                    </div>
                    <p>Mpesa</p>
                </div>

                <div className="checkout-right-paypal">
                    <div onClick={()=>(setMpesa(false),setPaypal(!paypal),setCod(false))} style={{background:paypal?"#1F51FF":"",border:paypal?"0":""}} className="paypal-box">

                    </div>
                    <p>PayPal</p>
                </div>

                <div className="checkout-right-cod">
                    <div onClick={()=>(setMpesa(false),setPaypal(false),setCod(!cod))} style={{background:cod?"#FFD700":"",border:cod?"0":""}} className="cod-box">

                    </div>
                    <p>Cash On Delivery</p>
                </div>

                {
                    mpesa
                    ?
                    <>
                    <button onClick={()=>toast.success("Feature under Development. Use Cash on delivery")} style={{backgroundColor:mpesa?"#32CD32":""}}>Lipa Na Mpesa</button>
                    </>
                    :
                    paypal
                    ?
                    <>
                    <button onClick={()=>toast.success("Feature under Development. Use Cash on delivery")} style={{backgroundColor:paypal?"#1F51FF":"",color:paypal?"#FAF9F6 ":""}}>Pay With PayPay</button>
                    </>
                    :
                    cod
                    ?
                    <>
                    <button onClick={()=>(toast.success('order placed Successfully.'),navigate('/order'))} style={{backgroundColor:cod?"#FFD700":""}}>Order Now</button>
                    </>
                    :
                    <></>
                }
            </div>

        </div>
    </div>
    </>
  )
}

export default CheckoutPage