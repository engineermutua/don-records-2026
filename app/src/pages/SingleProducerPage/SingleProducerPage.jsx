import React, { useEffect, useState } from "react";
import "./SingleProducerPage.css";
import { Link, useParams } from "react-router-dom";
import toast from "react-hot-toast";
import { producers } from "../../assets/assets.js";

const SingleProducerPage = () => {
  const { username } = useParams();
  const [producer, setproducer] = useState(false);

  const fetchproducer = async () => {
    try {
      producers.map((prod) => {
        if (prod.name === username) {
          setproducer(prod);
        }
      });
    } catch (error) {
      toast.error(error);
    }
  };

  useEffect(() => {
    fetchproducer();
  }, [username, producer]);
  return (
    <>
      <div className="single-producer-container">
        {/*----------------------------*/}
        <div className="single-producer-left">
          <div className="single-producer-image">
            <img id="single-producer-image" src={producer.avatar} alt="" />
          </div>
          <div className="single-producer-details">
            <h4>{producer.name}</h4>
            <div className="single-producer-button">
              <button>Follow</button>
            </div>
          </div>
        </div>
        {/*----------------------------*/}
        <div className="single-producer-right">
          <div className="single-producer-right-bio">
            <h1>About</h1>
            <p>{producer.bio}</p>
          </div>

          <div className="single-producer-right-Links">
            <h1>Social Links</h1>
            <p>Instagram</p>
            <p>Spotify</p>
            <p>Itunes</p>
            <p>Youtube</p>
            <p>Whatsapp</p>
          </div>

          <div className="single-producer-right-frame">
            <h1>Latest Beat Or Project</h1>
            <iframe 
              src={producer.embedded_link} 
              frameborder="0"
              title="Latest Song"
              width="600"
              height="400"
              loading="lazy"
              allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>

        </div>
      </div>
    </>
  );
};

export default SingleProducerPage;
