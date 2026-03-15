import React, { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { assets } from "../../assets/assets";
import toast from "react-hot-toast";
import "./SingleBeatPage.css";
import { ShopContext } from "../../Context/ShopContext";
import axios from "axios";

const SingleBeatPage = () => {
  const { id } = useParams();

  const { currency, addToCart, backend_url } = useContext(ShopContext);

  const [beat, setBeat] = useState({});

  const [beats, setBeats] = useState([]);

  useEffect(()=>{
    const fetchBeats=async()=>{
      try {
        const response=await axios.get(`${backend_url}/api/user/beats`);
        if(response.data.success){
          setBeats(response.data.beats);
        }else{
          console.log(response.data.message);
          
        }
      } catch (error) {
        console.log(error);
        
      }
    }
    fetchBeats()
  },[beats,backend_url])


  useEffect(() => {
    const fetchBeat = async () => {
      try {
        const response = await axios.post(`${backend_url}/api/user/beat/${id}`);
        if(response.data.success){
          setBeat(response.data.beat);
        }else{
          toast(response.data.message);
          console.log(response.data.message);
          
        }
      } catch (error) {
        toast.error(error);
        console.log(error);
      }
    };
    fetchBeat();
  }, [id, beat,backend_url]);
  return (
    <>
      <div className="single-beat-container">
        <div className="single-beat">
          {/*----------------------*/}
          <div className="single-beat-left">
            <div className="single-beat-left-image">
              <img id="single-beat-left-img" src={beat.thumbnail} alt="" />
              <div className="single-beat-preview">
                <audio
                    controls
                    preload="auto"
                    controlsList="nodownload"
                    onContextMenu={(e) => e.preventDefault()}
                  >
                    <source src={beat.audio} type="audio/mpeg" />
                    <source src={beat.audio} type="audio/ogg"/>
                    Your browser does not support the audio element.
                  </audio>
              </div>
              <div className="single-beat-left-details">
                <h3>
                  {beat.title} by{" "}
                  <Link to={`/producer/${beat.producer}`}>
                    @{beat.producer}
                  </Link>{" "}
                  <img
                    id="single-beat-left-verify"
                    src={assets.goldCheckMark}
                    alt=""
                  />{" "}
                </h3>

                <b>
                  {currency} {beat.price}
                </b>
                <div className="cart-img">
                  <img
                    onClick={() => (
                      addToCart(beat._id),
                      toast.success(`${beat.title} added to cart`)
                    )}
                    id="single-beat-left-cart"
                    src={assets.blackCart}
                    alt=""
                  />
                </div>
              </div>
            </div>
          </div>
          {/*----------------------*/}
          <div className="single-beat-right">
            <div className="single-beat-right-header">
              <h1>Similar Beats</h1>
            </div>
            <div className="similar-beat-right">
              {beats.map((beat) => (
                <div key={beat._id} className="similar">
                  <Link to={`/beat/${beat._id}`}>
                    <img src={beat.thumbnail} alt="" />
                  </Link>
                  <p>{beat.title}</p>
                  <Link to={`/producer/${beat.producer}`}>
                    {" "}
                    <p>
                      @{beat.producer}{" "}
                      <img
                        id="single-beat-related-verify"
                        src={assets.goldCheckMark}
                        alt=""
                      />
                    </p>
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SingleBeatPage;
