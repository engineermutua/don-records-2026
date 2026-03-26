import React, { useEffect, useState } from 'react'
import './FeaturedProducersComponents.css'
import TitleComponent from '../TitleComponent/TitleComponent'
import { assets } from '../../assets/assets'
import { Link } from 'react-router-dom'
import { useContext } from 'react'
import { ShopContext } from '../../Context/ShopContext'
import axios from 'axios'

const FeaturedProducersComponents = () => {
    const {backend_url}=useContext(ShopContext);
    const [producers,setProducers]=useState([]);

    useEffect(()=>{
        const fetchProducers=async()=>{
            try {
                const response=await axios.get(`${backend_url}/api/user/producers`);
                if(response.data.success){
                    setProducers(response.data.producers);
                }else{
                    console.log(response.data.message);
                }
                
            } catch (error) {
                console.log(error);
            }
        }
        fetchProducers();
    },[producers,backend_url])
  if(producers.length>0){
    return (
    <>
    <div  id='featured-producers-container' className="featured-producers-container">
        <TitleComponent title="Featured Producers"/>
        <div className="featured-producers">
            {
                producers.map((producer)=>(
                    producer.role==="producer" && producer.isFeatured ?
                    <>
                    <div key={producer._id} className="featured-producer">
                        <div className="featured-producer-image">
                           <Link to={`/producer/${producer.username}`}><img src={producer.avatar} alt="producer-image" /></Link> 
                        </div>
                        <div className="featured-producer-details">
                            <p>@{producer.username}<img src={producer.isVerified?assets.goldCheckMark:""} alt="verified mark" /></p>
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
        <div id="glitter-class-producer" className="glitter-class-producer">
          <TitleComponent title="Featured Producers"/>
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

export default FeaturedProducersComponents