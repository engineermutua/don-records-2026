import React, { useEffect, useState } from "react";
import "./SingleProducerPage.css";
import { Link, useParams } from "react-router-dom";
import toast from "react-hot-toast";
import { assets, producers } from "../../assets/assets.js";

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
            <h4>
              {producer.name}{" "}
              <img
                id="single-producer-verify"
                src={assets.goldCheckMark}
                alt=""
              />{" "}
            </h4>
            <div className="single-producer-button">
              <button
                onClick={() =>
                  toast.success(`Started Following ${producer.name}`)
                }
              >
                Follow
              </button>
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
            <div className="single-producer-right-Links-header">
              <h1>Social Links</h1>
            </div>
            <div className="single-producer-right-Links-details">
              <Link to={`${producer.instagram}`} target="_blank">
                <p>
                  {" "}
                  <img
                    id="social-link-icon"
                    src={assets.instagramIcon}
                    alt=""
                  />{" "}
                  Instagram
                </p>
              </Link>
              <Link to={`${producer.spotify}`} target="_blank">
                <p>
                  <img id="social-link-icon" src={assets.spotifyIcon} alt="" />
                  Spotify
                </p>
              </Link>
              <Link to={`${producer.itunes}`} target="_blank">
                <p>
                  <img id="social-link-icon" src={assets.itunesIcon} alt="" />
                  Itunes
                </p>
              </Link>
              <Link to={`${producer.youtube}`} target="_blank">
                <p>
                  <img id="social-link-icon" src={assets.youtubeIcon} alt="" />
                  Youtube
                </p>
              </Link>
              <Link to={`${producer.whatsapp}`} target="_blank">
                <p>
                  <img id="social-link-icon" src={assets.whatsappIcon} alt="" />
                  Whatsapp
                </p>
              </Link>
            </div>
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
