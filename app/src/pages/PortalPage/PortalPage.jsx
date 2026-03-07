import React, { useContext, useState } from 'react'
import './PortalPage.css'
import {ShopContext} from '../../Context/ShopContext'
import {artists, assets, producers} from '../../assets/assets'
import toast from 'react-hot-toast'
import { Link } from 'react-router-dom'

const PortalPage = () => {
    const [role,setRole]=useState("producer");
    const {username}=useContext(ShopContext);
  return (
    <>
    <div className="portal-container">
    {
        role==="fan"
        ?
        <>
        <div className="fan-portal">
            <div className="artist-portal-header">
                <h1 onDoubleClick={()=>setRole("producer")} >Fan Dashboard</h1>
                <p>Welcome back {username}</p>
            </div>
        </div>
        </>
        :
        role==="artist"
        ?
        <>
        <div className="artist-portal">
             <div className="artist-portal-header">
                <h1 onDoubleClick={()=>setRole("producer")} >Artist Dashboard</h1>
                <p>Welcome back {username}</p>
            </div>

            <div className="artist-portal-prod">
                <div className="artist-prod-header">
                    <h3>Available Producers</h3>
                </div>
                <div className="artist-prod-list">
                    {
                        producers.map((producer)=>(
                            <div key={producer._id} className="artist-prod">
                                <div className="artist-prod-img">
                                 <Link to={`/producer/${producer.name}`}> <img id='artist-prod-img' src={producer.avatar} alt="" /></Link>  
                                </div> 
                                <div className="artist-prod-details">
                                    <p>{producer.name} <img id='producer-verify' src={assets.goldCheckMark} alt="" /> </p>
                                </div>
                            </div>
                        ))
                    }
                    
                </div>
            </div>

            <div className="artist-portal-artists">
                <div className="artist-artists-header">
                    <h3>Other Artists</h3>
                </div>
                <div className="artist-artists-list">
                    {
                        artists.map((artist)=>(
                            <div key={artist._id} className="artist-artist">
                                <div className="artist-artist-img">
                                  <Link to={`/artist/${artist.name}`}> <img id='artist-artist-img' src={artist.avatar} alt="" /></Link> 
                                </div> 
                                <div className="artist-artist-details">
                                    <p>{artist.name} <img id='artist-verify' src={assets.blueCheckMark} alt="" /> </p>
                                </div>
                            </div>
                        ))
                    }
                    
                </div>
            </div>


            

            <div className="artist-sessions">
                <button onClick={()=>(toast.success('Feature Under Development.'))} >Book Session</button>
            </div>
        </div>
        </>
        :
        role==="producer"
        ?
        <>
        <div className="producer-portal">
            <div className="producer-portal-header">
                <h1 onDoubleClick={()=>setRole("artist")}>Producer Dashboard</h1>
                <p>Welcome back {username}</p>
            </div>
            <div className="producer-portal-artists">
                <div className="producer-artists-header">
                    <h3>Available Artists</h3>
                </div>
                <div className="producer-artists-list">
                    {
                        artists.map((artist)=>(
                            <div key={artist._id} className="producer-artist">
                                <div className="producer-artist-img">
                                   <Link to={`/artist/${artist.name}`}><img id='producer-artist-img' src={artist.avatar} alt="" /></Link> 
                                </div> 
                                <div className="producer-artist-details">
                                    <p>{artist.name} <img id='artist-verify' src={assets.blueCheckMark} alt="" /> </p>
                                </div>
                            </div>
                        ))
                    }
                    
                </div>
            </div>


            <div className="producer-portal-prod">
                <div className="producer-prod-header">
                    <h3>Other Producers</h3>
                </div>
                <div className="producer-prod-list">
                    {
                        producers.map((producer)=>(
                            <div key={producer._id} className="producer-prod">
                                <div className="producer-prod-img">
                                  <Link to={`/producer/${producer.name}`}> <img id='producer-prod-img' src={producer.avatar} alt="" /></Link> 
                                </div> 
                                <div className="producer-prod-details">
                                    <p>{producer.name} <img id='producer-verify' src={assets.goldCheckMark} alt="" /> </p>
                                </div>
                            </div>
                        ))
                    }
                    
                </div>
            </div>

            <div className="producer-sessions">
                <button onClick={()=>(toast.success('Feature Under Development.'))} >Booked Sessions</button>
            </div>
            
        </div>
        </>
        :
        <>
        <div className="default-portal">
            <p>You don't have permission to access this Dashboard.</p>
        </div>
        </>
    }
    </div>
    </>
  )
}

export default PortalPage