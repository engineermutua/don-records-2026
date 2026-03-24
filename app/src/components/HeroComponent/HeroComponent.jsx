import React, { useContext, useState } from 'react'
import './HeroComponent.css'
import { assets } from '../../assets/assets'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { ShopContext } from '../../Context/ShopContext'
import toast from 'react-hot-toast'

const HeroComponent = () => {
  const navigate=useNavigate();
  const {backend_url,setSearched}=useContext(ShopContext);
  const [query,setQuery]=useState("");
  const handleSubmit=async(e)=>{
    e.preventDefault();
    try {
      const response=await axios.post(`${backend_url}/api/user/search?query=${query}`);
      if(response.data.success){
        setSearched(response.data.beat);
        
      }else{
        toast.error(response.data.message);
      }
      
    } catch (error) {
      console.log(error);
      
    }
    navigate(`/searchResults/${query}`);
  }

  const navigateTo=(id)=>{
        document.getElementById(id)?.scrollIntoView({behavior:'smooth'})
    }
  return (
    <>
    <div id='hero-container' className="hero-container">
        <img src={assets.heroImage6} alt="" />

        <div className="hero-search-bar">
          <form onSubmit={handleSubmit} method="post">
          <input type="text" name="" id="" onChange={(e)=>setQuery(e.target.value)} value={query} placeholder='Use Emotion, mood & artist names...' />
          </form>
        </div>
        <div className="hero-explore">
          <button onClick={()=>navigateTo('beats-component-container')}>Explore Beats</button>
        </div>
    </div>
    </>
  )
}

export default HeroComponent;