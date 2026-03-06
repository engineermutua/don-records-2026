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
  return (
    <>
    <div id='hero-container' className="hero-container">
        <img src={assets.heroImage} alt="" />

        <div className="hero-search-bar">
          <form onSubmit={handleSubmit}>
          <input type="text" name="" id="" onChange={(e)=>setSearch(e.target.value)} value={search} placeholder='Use Emotion, mood & artist names...' />
          <button onClick={()=>(navigate('/searchResults'))}>Search</button>
          </form>
        </div>
    </div>
    </>
  )
}

export default HeroComponent