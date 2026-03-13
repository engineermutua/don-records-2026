import React, { useContext, useEffect, useState } from 'react'
import './DashboardPage.css'
import { assets } from '../../assets/assets'
import { Link, useNavigate } from 'react-router-dom'
import { ManagementContext } from '../../Context/ManagementContext'
import toast from 'react-hot-toast'
import axios from 'axios'

const DashboardPage = () => {
  const navigate=useNavigate();
  const [users,setUsers]=useState([]);

  const [orders,setOrders]=useState([]);

  const [beats,setBeats]=useState([])
  const [merchandise,setMerchandise]=useState([])
  const [blogs,setBlogs]=useState([])

  const {backend_url}=useContext(ManagementContext);

  useEffect(()=>{
    const fetchUsers=async()=>{
      try {
        const response=await axios.get(`${backend_url}/api/user/users`);
        if(response.data.success){
          setUsers(response.data.users);
        }else{
          toast.error(response.data.message);
        }
        
      } catch (error) {
        toast.error(error);
      }
    }

    const fetchOrders=async()=>{
      try {
        const response=await axios.get(`${backend_url}/api/admin/orders`);
        if(response.data.success){
          setOrders(response.data.orders);
        }else{
          toast.error(response.data.message);
        }
        
      } catch (error) {
        toast.error(error);
      }
    }
    const fetchBeats=async()=>{
      try {
        const response=await axios.get(`${backend_url}/api/admin/beats`);
        if(response.data.success){
          setBeats(response.data.beats);
        }else{
          toast.error(response.data.message);
        }
        
      } catch (error) {
        toast.error(error);
      }
    }

    const fetchMerchandise=async()=>{
      try {
        const response=await axios.get(`${backend_url}/api/admin/merchandise`);
        if(response.data.success){
          setMerchandise(response.data.merchandise);
        }else{
          toast.error(response.data.message);
        }
        
      } catch (error) {
        toast.error(error);
      }
    }

    const fetchBlogs=async()=>{
      try {
        const response=await axios.get(`${backend_url}/api/admin/blogs`);
        if(response.data.success){
          setBlogs(response.data.blogs);
        }else{
          toast.error(response.data.message);
        }
        
      } catch (error) {
        toast.error(error);
      }
    }
    fetchBeats();
    fetchBlogs();
    fetchMerchandise();
    fetchOrders();
    fetchUsers();
  },[users,backend_url])
  return (
    <>
    <div className="dashboard">
      <div className="dashboard-container">
        {/*---------------------------------*/}
        <div className="dash-top">
          <div className="dash-top-left">
            <div className="dash-top-left-2">
              <img id='dash-img' src={assets.revenueIcon} alt="" />
            </div>
            <div className="dash-top-left-1">
              <p>Total Revenue</p>
              <p>kes 200,000</p>
            </div>
          </div>
          <div className="dash-top-center">
            <div className="dash-top-center-">
              <img id='dash-img' src={assets.orderIcon} alt="" />
            </div>
            <div className="dash-top-center-">
              <p>Total Orders</p>
              <p>{orders.length}</p>
            </div>
            
          </div>
          <div className="dash-top-right">
            <div className="dash-top-right-1">
              <img id='dash-img' src={assets.userIcon} alt="" />
            </div>
            <div className="dash-top-right-1">
              <p>Total Users</p>
              <p>{users.length}</p>
            </div>
            
          </div>
        </div>
        {/**/}
        <div style={{marginTop:"20px"}} className="dash-top">
          <div className="dash-top-left">
            <div className="dash-top-left-2">
              <img id='dash-img' src={assets.beatIcon} alt="" />
            </div>
            <div className="dash-top-left-1">
              <p>Total Beats</p>
              <p>{beats.length}</p>
            </div>
          </div>
          <div className="dash-top-center">
            <div className="dash-top-center-">
              <img id='dash-img' src={assets.merch} alt="" />
            </div>
            <div className="dash-top-center-">
              <p>Total Merchandise</p>
              <p>{merchandise.length}</p>
            </div>
            
          </div>
          <div className="dash-top-right">
            <div className="dash-top-right-1">
              <img id='dash-img' src={assets.blog} alt="" />
            </div>
            <div className="dash-top-right-1">
              <p>Total Blogs</p>
              <p>{blogs.length}</p>
            </div>
            
          </div>
        </div>

        {/*---------------------------------*/}
        <div className="dash-bottom">
          <div className="dash-bottom-left">
            <div className="dash-bottom-left-header">
              <p><img id='dash-img2' src={assets.approval} alt="" />Pending Approvals</p>
            </div>
            <div className="dash-bottom-left-body">
              {
                users.map((user)=>(
                  user.isVerified
                  ?
                  ""
                  :
                  <div key={user._id} id='pending-approval-user' className="pending-approval-user">
                    <Link to={'/users'}><p>{user.first_name} {user.last_name}</p></Link>
                    <p>{user.role}</p>
                    <p>{user.email}</p>
                  </div>
                )).slice(0,10)
              }
            </div>
          </div>
          <div className="dash-bottom-right">
            <div className="dash-bottom-right-header">
                <p><img id='dash-img2' src={assets.recent} alt="" /> Recent Orders</p>
            </div>
            <div className="dash-bottom-right-body">
              {
              orders.map((order)=>(
                  <div key={order._id} id='recent-orders' className="recent-orders">
                    <Link to={'/orders'}><p>{order.status}</p></Link>
                    <p>{order.reference}</p>
                    <p>{}</p>
                  </div>
                )).slice(0,10)
              }
            </div>
          </div>
        </div>
        {/*---------------------------------*/}
        <div className="nav-act">
          <div className="nav-act-header">
            <p>Quick Actions</p>
          </div>
          <div className="quick-acts">
            <div className="quick-acts-btn">
              <button onClick={()=>(navigate('/users'))}>Manage Users</button>
            </div>
            <div className="quick-acts-btn">
              <button onClick={()=>(navigate('/merchandise'))}>Manage Merchandise</button>
            </div>
            <div className="quick-acts-btn">
              <button onClick={()=>(navigate('/beats'))}>Manage Beats</button>
            </div>
            <div className="quick-acts-btn">
              <button onClick={()=>(navigate('/orders'))}>Manage Orders</button>
            </div>
            <div className="quick-acts-btn">
              <button onClick={()=>(navigate('/revenue'))}>Review Revenue</button>
            </div>
          </div>
        </div>
        
      </div>

    </div>
    </>
  )
}

export default DashboardPage