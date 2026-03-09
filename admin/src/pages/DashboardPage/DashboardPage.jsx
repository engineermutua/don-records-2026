import React from 'react'
import './DashboardPage.css'
import { assets } from '../../assets/assets'
import { useNavigate } from 'react-router-dom'

const DashboardPage = () => {
  const navigate=useNavigate();
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
              <p>1000</p>
            </div>
            
          </div>
          <div className="dash-top-right">
            <div className="dash-top-right-1">
              <img id='dash-img' src={assets.userIcon} alt="" />
            </div>
            <div className="dash-top-right-1">
              <p>Total Users</p>
              <p>254</p>
            </div>
            
          </div>
        </div>

        {/*---------------------------------*/}
        <div className="dash-bottom">
          <div className="dash-bottom-left">
            <div className="dash-bottom-left-header">
              <p><img id='dash-img2' src={assets.approval} alt="" />Pending Approvals</p>
            </div>
          </div>
          <div className="dash-bottom-right">
            <div className="dash-bottom-right-header">
                <p><img id='dash-img2' src={assets.recent} alt="" /> Recent Orders</p>
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