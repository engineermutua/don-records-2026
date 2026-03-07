import React from 'react'
import './OrderPage.css'
import {assets} from '../../assets/assets.js'

const OrderPage = () => {

  const date=new Date();
  return (
    <>
    <div className="order-container">
        <div className="order-container-header">
          <h1>Your Orders</h1>
        </div>
        <div className="order-box">
          <div className="order-box-header">
            <p><b>Order:</b> #78U65RT8y6</p>
            <p><b>Date</b> {0}{date.getDay()}/{0}{date.getMonth()}/{date.getFullYear()}</p>
          </div>
          <hr />
          <div className="order-item">
            <div className="order-item-img">
              <img id='order-item-img' src={assets.product5} alt="" />
            </div>
            <div className="order-item-title">
              <p>Gaza Shirt</p>
            </div>
            <div className="order-item-status">
              <p>Order Placed</p>
            </div>
            <div className="order-item-expected">
              <p>Expceted by <b>{date.getDay()+7}/{0}{date.getMonth()}/{date.getFullYear()}</b></p>
            </div>
          </div>
        </div>
    </div>
    </>
  )
}

export default OrderPage