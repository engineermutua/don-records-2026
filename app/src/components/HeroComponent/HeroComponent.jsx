import React from 'react'
import './HeroComponent.css'
import { assets } from '../../assets/assets'

const HeroComponent = () => {
  return (
    <>
    <div id='hero-container' className="hero-container">
        <img src={assets.heroImage} alt="" />
        <div className="search-bar">
            <input type="search" name="" id="" placeholder='Use emotions, mood and artist names' />
            <button>Search</button>
        </div>
    </div>
    </>
  )
}

export default HeroComponent