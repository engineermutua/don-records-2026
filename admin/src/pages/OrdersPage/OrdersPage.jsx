import React from 'react'
import './OrdersPage.css'
import {assets, orders} from '../../assets/assets.js'

const OrdersPage = () => {
  return (
    <>
    <div className="order-container">
      {/*---------------------------*/}
      <div className="order-top">
        <div className="order-search">
          <form>
            <input type="text" name="" id="" placeholder='Search using order id or reference'/>
          </form>
          <img id='order-img' src={assets.search} alt="" />
        </div>
      </div>
      {/*---------------------------*/}
      <div className="order-bottom">
        <div className="order-bottom-top">
          <div className="bottom-class">
            <b>Actions</b>
          </div>
          <div className="bottom-class">
            <b>ID</b>
          </div>
          <div className="bottom-class">
            <b>Contact</b>
          </div>
          <div className="bottom-class">
            <b>Date</b>
          </div>
          <div className="bottom-class">
            <b>Reference</b>
          </div>
          <div className="bottom-class">
            <b>Customer</b>
          </div>
          <div className="bottom-class">
            <b>Address</b>
          </div>
          <div className="bottom-class">
            <b>Payment</b>
          </div>
          <div className="bottom-class">
            <b>Status</b>
          </div>
        </div>
        <div className="order-bottom-bottom">
          {
            orders.map((order,i)=>(
              <div key={order._id} className="order-class">
                <div className="order-act">
                  <img id='order-img' src={assets.deleteI} alt="" />
                </div>
                <div className="order-id">
                  <p>{i+1}</p>
                </div>
                <div className="order-contact">
                  <p>{order.phone}</p>
                </div>
                  <div className="order-date">
                    <p>{order.date.getDate()}/{order.date.getMonth()}/{order.date.getFullYear()} </p>
                  </div>
                  <div className="order-ref">
                    <p>{order.reference}</p>
                  </div>
                  <div className="order-cust">
                    <p>{order.name}</p>
                  </div>
                  <div className="order-address">
                    <p>{order.address}</p>
                  </div>
                  <div className="order-pay">
                    <p>{order.payment}</p>
                  </div>
                  <div className="order-status">
                    <form>
                    <select name="" id=""  defaultValue={order.status} >
                      <option value="">{order.status}</option>
                      <option value="">Order Placed</option>
                      <option value="">Order Received</option>
                      <option value="">Order Packeged for Delivery</option>
                      <option value="">Pending delivery</option>
                      <option value="">Delivered</option>
                    </select>
                    </form>
                  </div>
              </div>
            ))
          }
        </div>
      </div>
    </div>
    </>
  )
}

export default OrdersPage