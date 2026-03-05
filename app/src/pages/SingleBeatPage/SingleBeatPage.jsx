import React, { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { assets, beats } from "../../assets/assets";
import toast from "react-hot-toast";
import "./SingleBeatPage.css";
import { ShopContext } from '../../Context/ShopContext'


const SingleBeatPage = () => {
  const { id } = useParams();

  const {currency}=useContext(ShopContext)

  const [beat, setBeat] = useState(false);

  const fetchBeat = async () => {
    try {
      beats.map((beat) => {
        if (beat._id === id) {
          setBeat(beat);
        }
      });
    } catch (error) {
      toast.error(error);
    }
  };

  useEffect(() => {
    fetchBeat();
  }, [id, beat]);
  return (
    <>
      <div className="single-beat-container">
        <div className="single-beat">
          {/*----------------------*/}
          <div className="single-beat-left">
            <div className="single-beat-left-image">
              <img id="single-beat-left-img" src={beat.thumbnail} alt="" />
              <div className="single-beat-preview">
                <audio controls preload="auto" autoPlay>
                  <source src={beat.audio} type="audio/mpeg" />
                  Your browser does not support the audio element.
                </audio>
              </div>
              <div className="single-beat-left-details">
                <h3>{beat.title} by <Link to={`/producer/${beat.producer}`}>@{beat.producer}</Link>{" "}
                  <img
                    id="single-beat-left-verify"
                    src={assets.goldCheckMark}
                    alt=""
                  />{" "}
                </h3>
                
                
                <b>{currency} {beat.price}</b>
                <div className="cart-img">
                  <img
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
                 <Link to={`/producer/${beat.producer}`}> <p>@{beat.producer} <img id="single-beat-related-verify" src={assets.goldCheckMark} alt=""/></p></Link>
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
