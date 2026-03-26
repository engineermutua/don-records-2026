import React, { useEffect, useState } from 'react'
import './FeaturedArtistsComponents.css'
import TitleComponent from '../TitleComponent/TitleComponent'
import {  assets } from '../../assets/assets'
import { Link } from 'react-router-dom'
import { useContext } from 'react'
import { ShopContext } from '../../Context/ShopContext'
import axios from 'axios'

const FeaturedArtistsComponents = () => {
    const {backend_url}=useContext(ShopContext);
    const [artists,setArtists]=useState([]);

    useEffect(()=>{
        const fetchArtists=async()=>{
            try {
                const response=await axios.get(`${backend_url}/api/user/artists`);
                if(response.data.success){
                    setArtists(response.data.artists);
                }else{
                    console.log(response.data.message);
                }
                
            } catch (error) {
                console.log(error);
            }
        }
        fetchArtists();
    },[artists,backend_url])
  if(artists.length>0){
    return (
    <>
    <div id='featured-artists-container' className="featured-artists-container">
        <TitleComponent title="Featured Artists"/>
        <div className="featured-artists-profile">
            {
                artists.map((artist)=>(
                    artist.role==="artist" && artist.isFeatured?
                    <>
                    <div key={artist._id} className="featured-artist">
                        <div className="featured-artist-image">
                           <Link to={`/artist/${artist.username}`}> <img src={artist.avatar} alt="avatar" /></Link>
                        </div>
                        <div className="featured-artist-detail">
                            <p>@{artist.username}<img src={artist.isVerified?assets.blueCheckMark:""} alt="verification mark" /> </p>
                        </div>
                    </div>
                    </>
                    :
                    <></>
                ))
            }
        </div>
    </div>
    </>
  )
  }else{
    return(
        <>
        <div id="glitter-class-artist" className="glitter-class-artist">
          <TitleComponent title="Featured Artists"/>
          <div className="glitter">
            <div className="glitter-box">
              <div className="glitter-main"></div>
              <div className="glitter-tag"></div>
            </div>
            <div className="glitter-box">
              <div className="glitter-main"></div>
              <div className="glitter-tag"></div>
            </div>
            <div className="glitter-box">
              <div className="glitter-main"></div>
              <div className="glitter-tag"></div>
            </div>
            <div className="glitter-box">
              <div className="glitter-main"></div>
              <div className="glitter-tag"></div>
            </div>
            <div className="glitter-box">
              <div className="glitter-main"></div>
              <div className="glitter-tag"></div>
            </div>
            <div className="glitter-box">
              <div className="glitter-main"></div>
              <div className="glitter-tag"></div>
            </div>
            <div className="glitter-box">
              <div className="glitter-main"></div>
              <div className="glitter-tag"></div>
            </div>
            <div className="glitter-box">
              <div className="glitter-main"></div>
              <div className="glitter-tag"></div>
            </div>
            <div className="glitter-box">
              <div className="glitter-main"></div>
              <div className="glitter-tag"></div>
            </div>
            <div className="glitter-box">
              <div className="glitter-main"></div>
              <div className="glitter-tag"></div>
            </div>
            <div className="glitter-box">
              <div className="glitter-main"></div>
              <div className="glitter-tag"></div>
            </div>
            <div className="glitter-box">
              <div className="glitter-main"></div>
              <div className="glitter-tag"></div>
            </div>
            <div className="glitter-box">
              <div className="glitter-main"></div>
              <div className="glitter-tag"></div>
            </div>
            <div className="glitter-box">
              <div className="glitter-main"></div>
              <div className="glitter-tag"></div>
            </div>
            <div className="glitter-box">
              <div className="glitter-main"></div>
              <div className="glitter-tag"></div>
            </div>
            <div className="glitter-box">
              <div className="glitter-main"></div>
              <div className="glitter-tag"></div>
            </div>
          </div>
        </div>
      </>
    )
  }
}

export default FeaturedArtistsComponents