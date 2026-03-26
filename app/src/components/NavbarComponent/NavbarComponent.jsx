import React, { useContext, useState } from 'react'
import './NavbarComponent.css'
import {assets} from '../../assets/assets.js'
import { ShopContext } from '../../Context/ShopContext.jsx'
import { Link, useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'
import { useEffect } from 'react'

const NavbarComponent = () => {
    const {getCartCount,pic,user}=useContext(ShopContext);
    const navigate=useNavigate();
    const [hover,setHover]=useState(false);
    const [token,setToken]=useState(false);
    const navigateTo=(id)=>{
        document.getElementById(id)?.scrollIntoView({behavior:'smooth'})
    }


    useEffect(()=>{
        const fetchToken=async()=>{
            try {
                const resp=await localStorage.getItem("token");
                if(resp){
                    setToken(resp);
                }
                
            } catch (error) {
                console.log(error);
                toast.error(error);
            }
        }
        fetchToken();
    },[])

  return (
    <>
    <div onDoubleClick={()=>(window.location.reload(), toast.success('Status Updated'))} className="navbar">
    <div className="navbar-container">
        {/*--------------Left----------------*/}
        
        <div className="navbar-left">
            <div className="navbar-sidemenu">
                <img id='nav-menu-icon' onClick={()=>document.getElementById('nav-sidemenu').style.display='block'} src={assets.menuIcon} alt="" />
                
            </div>
            <div className="navbar-logo">
                <h1 style={{cursor:"pointer"}} onClick={()=>navigate('/')}>The Don</h1>
            </div>

        </div>
        {/*--------------Right----------------*/}
        <div className="navbar-right">
            <div className="navbar-cart">
                <img onClick={()=>navigate('/cart')} id='nav-cart-icon' src={assets.cartIcon} alt="" />
                {
                    getCartCount()>0
                    ?
                    <div id='nav-cart-count' className="nav-cart-count">
                        <p>{getCartCount()}</p> 
                    </div>
                    :
                    <></>
                }

            </div>
            <div className="navbar-user">
                <img onClick={()=>(navigate('/profile'))} id='nav-user-icon' src={pic?pic:assets.userIcon} alt="" />
                <h4>{user?user:"user"}</h4>
            </div>
            <div className="navbar-dropdown">
                <img onClick={()=>(setHover(!hover), document.getElementById('drop-down-hover').style.display=hover?'none':"block")} id='navbar-dropdown' src={assets.dropDownIcon} alt="" />
            </div>                        
        </div>    
    </div>
    {/*---------------Side Menu-----------------*/}

    <div id='nav-sidemenu' className="nav-sidemenu">
        <div className="sidemenu-header">
            <img style={{cursor:"pointer"}} onClick={()=>document.getElementById('nav-sidemenu').style.display='none'} src={assets.logo} alt="" />
        </div>
        <div className="sidemenu-list">
            <ul>
                <li onClick={()=>(navigate('/'), navigateTo('hero-container'),document.getElementById('nav-sidemenu').style.display='none')}>Home</li>
                <li onClick={()=>(navigate('/'), navigateTo('beats-component-container'),document.getElementById('nav-sidemenu').style.display='none')}>Beats</li>
                <li onClick={()=>(navigate('/'), navigateTo('hero-container'),document.getElementById('nav-sidemenu').style.display='none')}>Music</li>
                <li onClick={()=>(navigate('/'), navigateTo('featured-merchandise-container'),document.getElementById('nav-sidemenu').style.display='none')}>Merchandise</li>
                <li onClick={()=>(navigate('/'),navigate('/notifications'),document.getElementById('nav-sidemenu').style.display='none')} >
                    <div>
                        <p>Notifications</p>
                        <div id='green-dot-notifs' className='green-dot-notifs'></div>
                    </div>
                </li>
                <li onClick={()=>(navigate('/'), navigateTo('featured-artists-container'),document.getElementById('nav-sidemenu').style.display='none')}>Artists</li>
                <li onClick={()=>(navigate('/'), navigateTo('featured-producers-container'),document.getElementById('nav-sidemenu').style.display='none')}>Producers</li>
                <li onClick={()=>(navigate('/'), navigateTo('hero-container'),document.getElementById('nav-sidemenu').style.display='none')}>FAQs</li>
                <li onClick={()=>(navigate('/contactUs'),document.getElementById('nav-sidemenu').style.display='none')}>Contact Us</li>
                {
                    token
                    ?
                    <li onClick={()=>(localStorage.clear(), localStorage.removeItem("token"),document.getElementById('nav-sidemenu').style.display='none',navigate('/login'))}>Logout</li>
                    :
                    <li onClick={()=>(navigate('/login'),document.getElementById('nav-sidemenu').style.display='none')}>Login</li>
                }
            </ul>
        </div>
        <div className="sidemenu-footer">
            <img onClick={()=>document.getElementById('nav-sidemenu').style.display='none'} src={assets.closeIcon} alt="" />
        </div>
    </div>

    {/*------------------------------------*/}
    <div id='drop-down-hover' className="drop-down-hover">
        <div className="drop-down-header">

        </div>
        <div className="drop-down-content">
            <ul>
                <Link to='/profile'><li onClick={()=>(document.getElementById('drop-down-hover').style.display='none')}>User Profile</li></Link>
                <Link to='/portal'><li onClick={()=>document.getElementById('drop-down-hover').style.display='none'} >Dashboard</li></Link> 
                <hr/>
                <li onClick={()=>(localStorage.removeItem("token"),localStorage.removeItem("user"),localStorage.clear(), toast.success("Logged out Successfully"),document.getElementById('drop-down-hover').style.display='none',navigate('/login'))}>Logout</li>
            </ul>
        </div>
    </div>

    
    </div>
    </>
  )
}

export default NavbarComponent