import React, { useContext } from 'react'
import './BeatsComponent.css'
import TitleComponent from '../TitleComponent/TitleComponent'
import { assets, beats } from '../../assets/assets'
import { ShopContext } from '../../Context/ShopContext'
import { Link } from 'react-router-dom'

const BeatsComponent = () => {
    const {currency}=useContext(ShopContext);
  return (
    <>
    <div id='beats-component-container' className="beats-component-container">
        <TitleComponent title="Featured Beats & Instrumentals" />
        <div className="featured-beats-container">
            {
                beats.map((beat)=>(
                    beat.featured?
                    <>
                    <div className="featured-beat">
                        <div key={beat._id} className="featured-beat-container">
                            <div className="featured-beat-thumbnail">
                               <Link to={`/beat/${beat._id}`}><img src={beat.thumbnail} alt="" /></Link> 
                            </div>
                            
                            <div className="featured-beat-details">
                                <div className="featured-beat-detail">
                                    <h5>{currency}{beat.price}</h5>
                                </div>
                                
                                <div className="featured-beat-cart">
                                    <img id='featured-beat-cart-image' src={assets.addToCartIcon} alt="" />
                                </div>
                            </div>
                        </div>
                        <div className="featured-beat-producer">
                          <Link to={`/producer/${beat.producer}`}> <p>@{beat.producer}<img id='featured-beat-checkmark' src={assets.goldCheckMark}  alt="" /> </p></Link> 
                        </div>
                        </div>
                    </>
                    :
                    <>
                    <p>No Featured beats</p>
                    </>
                    
                ))
            }
        </div>
    </div>
    </>
  )
}

export default BeatsComponent