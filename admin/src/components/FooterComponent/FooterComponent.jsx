import React, { useContext } from 'react'
import './FooterComponent.css'
import { assets } from '../../assets/assets'
import { Link, useNavigate } from 'react-router-dom'
import {toast} from 'react-hot-toast'
import { ManagementContext } from '../../Context/ManagementContext'
const FooterComponent = () => {
  const navigate=useNavigate()
  const getYear=()=>{
    const date=new Date();
    return date.getFullYear();
    
  }
  const navigateTo=(id)=>{
        document.getElementById(id)?.scrollIntoView({behavior:'smooth'})
    }

    const handleSubmit=(e)=>{
      try {
        e.preventDefault();
      } catch (error) {
        toast.error(error)
      }
    }
    const {frontend_url}=useContext(ManagementContext)
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
            <li onClick={()=>(navigate('/'))}>Dashboard</li>
            <li onClick={()=>(navigate('/merchandise'))}>Merchandise</li>
            <li onClick={()=>(navigate('/beats'))}>Beats</li>
            <li onClick={()=>(navigate('/users'))}>Users</li>
            <Link to='/orders'><li>Orders</li></Link>
            <Link to='/revenue'><li>Revenue</li></Link>
            <Link to={frontend_url} target='_blank'><li>Website</li></Link>
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
            <input type="email" name="" id="" placeholder='Email Address' required/><br/>
            <button onClick={()=>toast.success('Thank you for subscribing.')}>Subscribe</button>
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