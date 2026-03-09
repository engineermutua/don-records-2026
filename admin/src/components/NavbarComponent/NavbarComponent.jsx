import React, { useContext } from "react";
import { assets } from "../../assets/assets";
import './NavbarComponent.css'
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import { ManagementContext } from "../../Context/ManagementContext";

const NavbarComponent = () => {
  const {setToken,frontend_url}=useContext(ManagementContext);
  return (
    <div className="navbar-container">
      <div className="nav">
        <div className="nav-left">
          <img onClick={()=>(document.getElementById('nav-side').style.display='block')} id="side-img" src={assets.sideIcon} alt="" />
        </div>
        <div className="nav-center">
         <Link to={frontend_url} target="_blank" > <h1 onDoubleClick={()=>(window.location.reload(),toast.success('Refreshing webpage'))}>The Don</h1></Link>
        </div>
        <div className="nav-right">
         <Link to={'/profile'}><p onClick={()=>(document.getElementById('nav-side').style.display='none')}><img id="avatar-img" src={assets.avatar} alt="" />admin</p></Link> 
        </div>
      </div>
      <div id="nav-side" className="nav-side">
        <div className="side-header">
          <p><img onClick={()=>(document.getElementById('nav-side').style.display='none')} id="header-img" src={assets.logo} alt="" /></p>
        </div>
        <div className="side-content">
          <ul>
          <Link to={'/'}><li onClick={()=>(document.getElementById('nav-side').style.display='none')}><img id="side-content-img" src={assets.home} alt="" /> Dashboard</li></Link>
            <Link to={'/merchandise'}><li onClick={()=>(document.getElementById('nav-side').style.display='none')}><img id="side-content-img" src={assets.merch} alt="" />Merchandise</li></Link>
            <Link to={'/beats'}><li onClick={()=>(document.getElementById('nav-side').style.display='none')}><img id="side-content-img" src={assets.beatIcon} alt="" />Beats</li></Link>
            <Link to={'/blogs'}><li onClick={()=>(document.getElementById('nav-side').style.display='none')}><img id="side-content-img" src={assets.blog} alt="" />Blogs</li></Link>
            <Link to={'/users'}><li onClick={()=>(document.getElementById('nav-side').style.display='none')}><img id="side-content-img" src={assets.userIcon} alt="" />Users</li></Link>
            <Link to={'/orders'}><li onClick={()=>(document.getElementById('nav-side').style.display='none')}><img id="side-content-img" src={assets.orderIcon} alt="" />Orders</li></Link>
            <Link to={'/revenue'}><li onClick={()=>(document.getElementById('nav-side').style.display='none')}><img id="side-content-img" src={assets.revenueIcon} alt="" />Revenue</li></Link>
          </ul>
          <p><img onClick={()=>(setToken(false),toast.success('Logout Successful'))} id="side-logout-img" src={assets.logout} alt="" /></p>
        </div>
        <div className="side-footer">
          <p><img onClick={()=>(document.getElementById('nav-side').style.display='none')} id="footer-img" src={assets.close} alt="" /></p>
        </div>
      </div>
    </div>
  );
};

export default NavbarComponent;
