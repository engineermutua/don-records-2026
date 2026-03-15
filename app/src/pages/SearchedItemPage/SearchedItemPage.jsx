import React, { useContext, useEffect, useState } from "react";
import "./SearchedItemPage.css";
import { assets } from "../../assets/assets";
import { ShopContext } from "../../Context/ShopContext";
import { Link, useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";
import axios from "axios";

const SearchedItemPage = () => {
  const { currency, setSearched, searched, backend_url } =
    useContext(ShopContext);
  const { search } = useParams();
  const [term, setTerm] = useState("");
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${backend_url}/api/user/search?query=${term}`,
      );
      if (response.data.success) {
        setSearched(response.data.beat);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
    }
    navigate(`/searchResults/${term}`);
  };

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
  return (
    <>
      <div className="searched-container">
        <div className="searched-results">
          <div className="searched-bar">
            <form onSubmit={handleSubmit} method="post">
              <input
                value={term}
                onChange={(e) => setTerm(e.target.value)}
                type="text"
                placeholder={search}
              />
            </form>
          </div>
          <div className="searched-header">
            <h3>Search results for {search} </h3>
          </div>
          <div className="searched-conta">
          {searched.length > 1 ? (
            searched.map((beat) => (
              <div className="searched-item">
                <div className="searched-item-image">
                  <img id="searched-item-image" src={beat.thumbnail} alt="" />
                </div>
                <div className="searched-item-details">
                  <h3>{beat.title}</h3>
                  <p>central Cee Melodic drill beat</p>
                  <p>@{beat.producer}</p>
                  <b>
                    {currency} {beat.price}
                  </b>
                  <br />
                  <img id="searched-cart" src={assets.blackCart} alt="" />
                </div>

                <div className="searched-item-preview">
                  <p style={{ textAlign: "center", margin: "20px 0" }}>
                    Beat Preview with reduced quality
                  </p>
                  <audio
                    controls
                    preload="auto"
                    controlsList="nodownload"
                    onContextMenu={(e) => e.preventDefault()}
                  >
                    <source src={beat.audio} type="audio/mpeg" />
                    Your browser does not support the audio element.
                  </audio>
                </div>
              </div>
            ))
          ) : (
            <>
              <p>No Beats Found</p>
            </>
          )}
          </div>

          <div className="searched-related">
            <div className="searched-related-header">
              <h3>Related Beats</h3>
            </div>
            <div className="searched-related-container">
              {beats.map((beat) => (
                <div key={beat._id} className="beat-related">
                  <div className="beat-related-thumbnail">
                    <Link to={`/beat/${beat._id}`}>
                      {" "}
                      <img src={beat.thumbnail} alt="" />
                    </Link>
                  </div>
                  <div className="beat-related-title">
                    <p>{beat.title}</p>
                  </div>
                  <div className="beat-related-producer">
                    <Link to={`/producer/${beat.producer}`}>
                      <p>
                        @{beat.producer}{" "}
                        <img
                          id="verified-mark"
                          src={assets.goldCheckMark}
                          alt=""
                        />{" "}
                      </p>
                    </Link>
                  </div>
                  <div className="beat-related-price">
                    <p>
                      {currency} {beat.price}
                    </p>
                  </div>
                  <div className="beat-related-cart">
                    <img id="beat-related-cart" src={assets.blackCart} alt="" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SearchedItemPage;
