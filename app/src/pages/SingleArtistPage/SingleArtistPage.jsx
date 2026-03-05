import React, { useEffect, useState } from "react";
import "./SingleArtistPage.css";
import { Link, useParams } from "react-router-dom";
import toast from "react-hot-toast";
import { artists } from "../../assets/assets";

const SingleArtistPage = () => {
  const { username } = useParams();
  const [artist, setArtist] = useState(false);

  const fetchArtist = async () => {
    try {
      artists.map((art) => {
        if (art.name === username) {
          setArtist(art);
        }
      });
    } catch (error) {
      toast.error(error);
    }
  };

  useEffect(() => {
    fetchArtist();
  }, [username, artist]);
  return (
    <>
      <div className="single-artist-container">
        {/*----------------------------*/}
        <div className="single-artist-left">
          <div className="single-artist-image">
            <img id="single-artist-image" src={artist.avatar} alt="" />
          </div>
          <div className="single-artist-details">
            <h4>{artist.name}</h4>
            <div className="single-artist-button">
              <button>Follow</button>
            </div>
          </div>
        </div>
        {/*----------------------------*/}
        <div className="single-artist-right">
          <div className="single-artist-right-bio">
            <h1>About</h1>
            <p>{artist.bio}</p>
          </div>

          <div className="single-artist-right-Links">
            <h1>Social Links</h1>
            <p>Instagram</p>
            <p>Spotify</p>
            <p>Itunes</p>
            <p>Youtube</p>
            <p>Whatsapp</p>
          </div>

          <div className="single-artist-right-frame">
            <h1>Latest Song</h1>
            <iframe 
              src={artist.embedded_link} 
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

export default SingleArtistPage;
