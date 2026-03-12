import React, { useContext, useEffect, useEffectEvent, useState } from "react";
import "./OrdersPage.css";
import { assets } from "../../assets/assets.js";
import toast from "react-hot-toast";
import { ManagementContext } from "../../Context/ManagementContext.jsx";
import axios from "axios";
import { Link } from "react-router-dom";

const OrdersPage = () => {
  const { backend_url } = useContext(ManagementContext);
  const [orderss, setOrders] = useState([]);
  const [status,setStatus]=useState("");
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      toast.success("Feature Under Development");
    } catch (error) {
      toast.error(error);
    }
  };

  const deleteOrder=async(id)=>{
    try {
      const response=await axios.post(`${backend_url}/api/admin/deleteOrder/${id}`);
      if(response.data.success){
        toast.success(response.data.message);
      }else{
        toast.error(response.data.message);
      }
      
    } catch (error) {
      toast.error(error);
    }
  }

  {/*----------Check later------------*/}
  const updateStatus=async(e,id)=>{
    setStatus(e.target.value);
    try {
      const response=await axios.post(`${backend_url}/api/admin/updateStatus/${id}`,{status:status})
      console.log(response);
      if(response.data.success){
        toast.success(response.data.message)
      }else{
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error(error);
    }
  }
  {/*const [user,setUser]=useState({});

  const fetchUser=async(id)=>{
    try {
      const response=await axios.post(`${backend_url}/api/user/user/${id}`);
      if(response.data.success){
        setUser(response.data.user)
      }else{
        toast.error(response.data.message);
      }
      
    } catch (error) {
      toast.error(error);
    }
  }*/}
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get(`${backend_url}/api/admin/orders`);
        if (response.data.success) {
          setOrders(response.data.orders);
        } else {
          toast.error(response.data.message);
        }
      } catch (error) {
        toast.error(error);
      }
    };
    fetchOrders();
  }, [orderss, backend_url]);
  return (
    <>
      <div className="order-container">
        {/*---------------------------*/}
        <div className="order-top">
          <div className="order-search">
            <form onSubmit={handleSubmit}>
              <input
                type="text"
                name=""
                id=""
                placeholder="Search using order id or reference"
              />
            </form>
            <img
              onClick={() => {
                toast.success("Search Feature Under Development");
              }}
              id="order-img"
              src={assets.search}
              alt=""
            />
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
            {orderss.map((order, i) => {
              return(
              <div key={order._id} className="order-class">
                <div className="order-act">
                  <img onClick={()=>{deleteOrder(order._id)}} id="order-img" src={assets.deleteI} alt="" />
                </div>
                <div className="order-id">
                  <p>{i + 1}</p>
                </div>
                <div className="order-date">
                  <p>
                    {new Date(order.createdAt).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}{" "}
                  </p>
                </div>
                <div className="order-ref">
                  <p>{order.reference}</p>
                </div>
                <div className="order-cust">
                 <Link to={`/user/${order.userId}`}> <p>{order.userId}</p></Link>
                </div>
                <div className="order-address">
                  <p>{order.address.county},{order.address.constituency},{order.address.ward}</p>
                </div>
                <div className="order-pay">
                  <p>{order.paymentStatus?"paid":"pending"}</p>
                </div>
                <div className="order-status">
                  <form onSubmit={(e)=>e.preventDefault()}>
                    <select value={status} onChange={(e)=>(updateStatus(e,order._id))}>
                      <option value={order.status}>{order.status}</option>
                      <option value="order placed">Order Placed</option>
                      <option value="order received">Order Received</option>
                      <option value="order packaged">Order Packeged for Delivery</option>
                      <option value="out for delivery">Pending delivery</option>
                      <option value="deivered">Delivered</option>
                    </select>
                  </form>
                </div>
              </div>  
           ) })}
          </div>
        </div>
      </div>
    </>
  );
};

export default OrdersPage;
