import React, { useContext, useEffect, useState } from 'react'
import './OrderPage.css'
import { ShopContext } from "../../Context/ShopContext";
import axios from 'axios'

const OrderPage = () => {

  const {backend_url,token,products}=useContext(ShopContext);
  const [orders,setOrders]=useState([]);

  useEffect(()=>{
    const fetchOrders=async()=>{
      try {
        const response=await axios.post(`${backend_url}/api/user/orders`,{},{headers:{token}})
        if(response.data.success){
          setOrders(response.data.orders)
          
        }else{
          console.log(response.data.message);
        } 
      } catch (error) {
        console.log(error);
      }
    }
    fetchOrders()
    
    
  },[orders,backend_url,token])
  return (
    <>
    <div className="order-container">
        <div className="order-container-header">
          <h1>Your Orders</h1>
        </div>
        {
          orders.map((order)=>(
            
        <div key={order._id} className="order-box">
          <div className="order-box-header">
            <p><b>Order:</b>{order.reference}</p>
            <p><b>Date</b> {new Date(order.createdAt).toLocaleDateString("en-US", {year: "numeric", month: "long", day: "numeric", })}{" "}</p>
          </div>
          <hr style={{marginBottom:"10px"}}/>
          {
            order.items.map((item)=>{
              
              const orderInfo=(products.merchandise?.find((product)=>product._id===(item._id || item.sku )) || products.beats?.find((product)=>product._id===(item._id || item.sku )));   
               
              return(
               <div key={item._id} className="order-item" id='order-item'>
                <div className="order-item-img">
                  <img id='order-item-img' src={orderInfo.thumbnail? orderInfo.thumbnail : orderInfo.image?orderInfo.image:orderInfo.image[0]} alt="" />
                </div>
                <div className="order-item-title">
                  <p>{orderInfo.title}</p>
                </div>
                <div className="order-item-status">
                  <p>{order.status}</p>
                </div>
                <div className="order-item-expected">
                  <p>Expceted by <b>{new Date(order.createdAt).toLocaleDateString("en-US", {year: "numeric", month: "long", day: "numeric", })}{" "}</b></p>
                </div>
            </div>
              )
            })
          }

          
        </div>
          ))
        }
    </div>
    </>
  )
}

export default OrderPage