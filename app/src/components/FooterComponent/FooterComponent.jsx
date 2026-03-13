import React from 'react'
import './FooterComponent.css'
import { assets } from '../../assets/assets'
import { Link, useNavigate } from 'react-router-dom'
import {toast} from 'react-hot-toast'
import { useContext } from 'react'
import {ShopContext} from '../../Context/ShopContext.jsx'
import axios from 'axios'
import { useState } from 'react'


const FooterComponent = () => {
  const navigate=useNavigate()
  const getYear=()=>{
    const date=new Date();
    return date.getFullYear();
    
  }
  const admin_url=import.meta.env.VITE_ADMIN_URL;
  const {backend_url}=useContext(ShopContext)
  const [email,setEmail]=useState("");
  const navigateTo=(id)=>{
        document.getElementById(id)?.scrollIntoView({behavior:'smooth'})
    }

    const handleSubmit=async(e)=>{
      e.preventDefault();
      try {
        const response=await axios.post(`${backend_url}/api/user/subscribe`,{email},);
        if(response.data.success){
          toast.success(response.data.message);
        }else{
          toast.error("You are already a subscriber.");
        } 
      } catch (error) {
        toast.error(error)
      }
    }
  return (
    <>
    <div className="footer">
    <div className="footer-container">
      {/*---------------Footer left---------------- */}
      <div className="footer-left">
        <div className="footer-left-logo">
          <h1>THE DON</h1>
        </div>
        <div className="footer-left-text">
          <p>Premium beats destination</p>
        </div>
        <div className="footer-left-links">
          <Link to='https://wa.me/+254793909678' target='_blank'><img src={assets.whatsappIcon} alt="" /></Link> 
          <Link to='https://www.instagram.com/the._.don._/' target='_blank'><img src={assets.instagramIcon} alt="" /></Link>
          <Link to='https://www.instagram.com/the._.don._/' target='_blank'><img src={assets.facebookIcon} alt="" /></Link>
          <Link to='mailto:thedon254@gmail.com?subject=Hello&body=Message' target='_blank'><img src={assets.emailIcon} alt="" /></Link>
        </div>
        <div className="footer-left-developer">
          <p>Developed by <Link to={'https://portofolio-two-rosy-31.vercel.app/'} target='_blank'>HighValueTech</Link></p>
        </div>
      </div>
      {/*---------------Footer center---------------- */}
      <div className="footer-center">
        <div className="footer-center-header">
          <h1>Site Map</h1>
        </div>
        <div className="footer-center-links">
          <ul>
            <li onClick={()=>(navigate('/'), navigateTo('hero-container'))}>Home</li>
            <li onClick={()=>(navigate('/'),navigateTo('beats-component-container'))}>Beats</li>
            <li onClick={()=>(navigate('/'),navigateTo('featured-artists-container'))}>Artists</li>
            <li onClick={()=>(navigate('/'),navigateTo('featured-producers-container'))}>Producers</li>
            <Link to='/contactUs'><li>Contact Us</li></Link>
            <Link to='/login'><li>Register</li></Link>
            <Link to={admin_url} target="_blank"><li>Admin panel</li></Link>
            <li onClick={()=>(navigate('/'),navigateTo('featured-merchandise-container'))}>Merchandise</li>
          </ul>
        </div>
      </div>


      {/*---------------Footer right---------------- */}
      <div className="footer-right">
        <div className="footer-right-header">
          <h1>Newsletter</h1>
        </div>
        <div className="footer-right-form">
          <form onSubmit={handleSubmit} method='post'>
            <input type="email" name="" id="" value={email} onChange={(e)=>(setEmail(e.target.value))} placeholder='Email Address' required/><br/>
            <button type='submit'>Subscribe</button>
          </form>
        </div>
      </div>
        
    </div>
    <hr/>
    <p id='footer-p'>&copy;{getYear()} The Don. All rights reserved.</p>
    </div>
    </>
  )
}

export default FooterComponent