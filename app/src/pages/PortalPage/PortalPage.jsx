import React, { useContext, useState } from 'react'
import './PortalPage.css'
import {ShopContext} from '../../Context/ShopContext'
import {artists, assets, producers} from '../../assets/assets'
import toast from 'react-hot-toast'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'

const PortalPage = () => {
    const {backend_url}=useContext(ShopContext);
    const [user,setUser]=useState({});

    const navigate=useNavigate()

    useState(()=>{
        const fetchUser=async()=>{
            const userId=localStorage.getItem("user");
            if(!userId){
                toast.error('Login to access Dashboard');
                navigate('/login');
            } 
            try {               
                const response=await axios.post(`${backend_url}/api/user/user/${userId}`);
                console.log(response);
                if(response.data.success){
                    setUser(response.data.user);                    
                }else{
                    console.log(response.data.message);
                }
                
            } catch (error) {
                console.log(error); 
            }
        }
        fetchUser()
    },[backend_url])
  return (
    <>
    <div className="portal-container">
    {
        user.role==="fan"
        ?
        <>
        <div className="fan-portal">
            <div className="artist-portal-header">
                <h1>Fan Dashboard</h1>
                <p>Welcome back {user.username}</p>
            </div>
        </div>
        </>
        :
        user.role==="artist"
        ?
        <>
        <div className="artist-portal">
             <div className="artist-portal-header">
                <h1>Artist Dashboard</h1>
                <p>Welcome back {user.username}</p>
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
                                    <p>{producer.name} <img id='producer-verify' src={producer.featured?assets.goldCheckMark:""} alt="" /> </p>
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
                                    <p>{artist.name} <img id='artist-verify' src={artist.featured?assets.blueCheckMark:""} alt="" /> </p>
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
        user.role==="producer"
        ?
        <>
        <div className="producer-portal">
            <div className="producer-portal-header">
                <h1>Producer Dashboard</h1>
                <p>Welcome back {user.username}</p>
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
                                    <p>{artist.name} <img id='artist-verify' src={artist.featured?assets.blueCheckMark:""} alt="" /> </p>
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
                                    <p>{producer.name} <img id='producer-verify' src={producer.featured?assets.goldCheckMark:"https://share.google/Alz9KVeznyw7wJrOl"} alt="" /> </p>
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