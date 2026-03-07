import React, { useState } from 'react'
import './HeroComponent.css'
import { assets } from '../../assets/assets'
import { useNavigate } from 'react-router-dom'

const HeroComponent = () => {
  const navigate=useNavigate();
  const handleSubmit=(e)=>{
    e.preventDefault();
    navigate(`/searchResults/${search}`);
  }

  const [search,setSearch]=useState("");
  const navigateTo=(id)=>{
        document.getElementById(id)?.scrollIntoView({behavior:'smooth'})
    }
  return (
    <>
    <div id='hero-container' className="hero-container">
        <img src={assets.heroImage6} alt="" />

        <div className="hero-search-bar">
          <form onSubmit={handleSubmit}>
          <input type="text" name="" id="" onChange={(e)=>setSearch(e.target.value)} value={search} placeholder='Use Emotion, mood & artist names...' />
          <button onClick={()=>(navigate('/searchResults'))}>Search</button>
          </form>
        </div>
        <div className="hero-explore">
          <button onClick={()=>navigateTo('beats-component-container')}>Explore Beats</button>
        </div>
    </div>
    </>
  )
}

export default HeroComponent