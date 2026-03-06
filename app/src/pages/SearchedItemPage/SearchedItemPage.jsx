import React, { useContext, useState } from 'react'
import './SearchedItemPage.css'
import { assets, beats } from '../../assets/assets'
import { ShopContext } from '../../Context/ShopContext'
import { Link, useNavigate, useParams } from 'react-router-dom'

const SearchedItemPage = () => {
    const {currency}=useContext(ShopContext);
    const {search}=useParams();
    const [term, setTerm]=useState("");
    const navigate=useNavigate();
    const handleSubmit=(e)=>{
        e.preventDefault();
        navigate(`/searchResults/${term}`);
        window.location.reload();

    }
  return (
    <>
    <div className="searched-container">
        <div className="searched-results">
            <div className="searched-bar">
                <form onSubmit={handleSubmit}>
                    <input value={term} onChange={(e)=>setTerm(e.target.value)} type="text" name="" id="" placeholder={search} />
                </form>
            </div>
            <div className="searched-header">
                <h3>Search results for {search} </h3>
            </div>
            <div className="searched-item">
                <div className="searched-item-image">
                    <img id='searched-item-image' src={assets.thumbnail11} alt="" />
                </div>
                <div className="searched-item-details">
                    <h3>Sad Drill Type Beat</h3>
                    <p>central Cee Melodic drill beat</p>
                    <p>@the_.don</p>
                    <p>120BPM</p>
                    <b>kes 1500</b><br/>
                    <img id='searched-cart' src={assets.blackCart} alt="" />
                </div>

                <div className="searched-item-preview">
                    <p style={{textAlign:"center",margin:"20px 0"}}>Beat Preview with reduced quality</p>
                    <audio controls preload="auto" autoPlay controlsList="nodownload">
                        <source src={assets.beat3} type="audio/mpeg" />
                        Your browser does not support the audio element.
                        </audio>
                    </div>
            </div>

            <div className="searched-related">
                <div className="searched-related-header">
                    <h3>Related Beats</h3>
                </div>
                <div className="searched-related-container">
                    {
                        beats.map((beat)=>(
                            <div key={beat._id} className="beat-related">
                                <div className="beat-related-thumbnail">
                                  <Link to={`/beat/${beat._id}`}> <img src={beat.thumbnail} alt="" /></Link> 
                                </div>
                                <div className="beat-related-title">
                                    <p>{beat.title}</p>
                                </div>
                                <div className="beat-related-producer">
                                    <Link to={`/producer/${beat.producer}`}><p>@{beat.producer} <img id='verified-mark' src={assets.goldCheckMark} alt="" /> </p></Link>
                                </div>
                                <div className="beat-related-price">
                                    <p>{currency} {beat.price}</p>
                                </div>
                                <div className="beat-related-cart">
                                   <img id='beat-related-cart' src={assets.blackCart} alt="" />
                                </div>
                            </div>
                        ))
                    }
                </div>
            </div>
        </div>
    </div>
    </>
  )
}

export default SearchedItemPage