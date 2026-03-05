import React from 'react'
import './FooterComponent.css'
import { assets } from '../../assets/assets'
import { Link, useNavigate } from 'react-router-dom'

const FooterComponent = () => {
  const navigate=useNavigate()
  const getYear=()=>{
    const date=new Date();
    return date.getFullYear();
    
  }
  const navigateTo=(id)=>{
        document.getElementById(id)?.scrollIntoView({behavior:'smooth'})
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
          <img src={assets.whatsappIcon} alt="" />
          <img src={assets.instagramIcon} alt="" />
          <img src={assets.facebookIcon} alt="" />
          <img src={assets.emailIcon} alt="" />
        </div>
      </div>
      {/*---------------Footer center---------------- */}
      <div className="footer-center">
        <div className="footer-center-header">
          <h1>Site Map</h1>
        </div>
        <div className="footer-center-links">
          <ul>
            <li onClick={()=>(navigate('/') && navigateTo('hero-container'))}>Home</li>
            <li onClick={()=>navigateTo('beats-component-container')}>Beats</li>
            <li onClick={()=>navigateTo('featured-artists-container')}>Artists</li>
            <li onClick={()=>navigateTo('featured-producers-container')}>Producers</li>
            <Link to='/contactUs'><li>Contact Us</li></Link>
            <Link to='/login'><li>Register</li></Link>
            <li onClick={()=>navigateTo('beats-component-container')}>Admin panel</li>
            <li onClick={()=>navigateTo('featured-merchandise-container')}>Merchandise</li>
          </ul>
        </div>
      </div>


      {/*---------------Footer right---------------- */}
      <div className="footer-right">
        <div className="footer-right-header">
          <h1>Newsletter</h1>
        </div>
        <div className="footer-right-form">
          <form action="#" method='post'>
            <input type="email" name="" id="" placeholder='Email Address' /><br/>
            <button>Subscribe</button>
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