import React, { useContext, useEffect, useState } from "react";
import "./BeatsComponent.css";
import TitleComponent from "../TitleComponent/TitleComponent";
import { assets } from "../../assets/assets";
import { ShopContext } from "../../Context/ShopContext";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import axios from "axios";

const BeatsComponent = () => {
  const { currency, addToCart, backend_url } = useContext(ShopContext);
  const [beats, setBeats] = useState([]);
  useEffect(() => {
    const fetchBeats = async () => {
      try {
        const response = await axios.get(`${backend_url}/api/user/beats`);
        if (response.data.success) {
          setBeats(response.data.beats);
        } else console.log(response.data.message);
      } catch (error) {
        console.log(error);
      }
    };
    fetchBeats();
  }, [beats, backend_url]);

  if (beats.length > 0) {
    return (
      <>
        <div
          id="beats-component-container"
          className="beats-component-container"
        >
          <TitleComponent title="Featured Beats & Instrumentals" />
          <div className="featured-beats-container">
            {beats.map((beat) =>
              beat.isFeatured ? (
                <>
                  <div key={beat._id} className="featured-beat">
                    <div className="featured-beat-container">
                      <div className="featured-beat-thumbnail">
                        <Link to={`/beat/${beat._id}`}>
                          <img src={beat.thumbnail} alt="thumbnail" />
                        </Link>
                      </div>

                      <div className="featured-beat-details">
                        <div className="featured-beat-detail">
                          <h5>
                            {currency}
                            {beat.price}
                          </h5>
                        </div>

                        <div className="featured-beat-cart">
                          <img
                            onClick={() => (
                              addToCart(beat._id),
                              toast.success(`${beat.title} added to cart`)
                            )}
                            id="featured-beat-cart-image"
                            src={assets.addToCartIcon}
                            alt=""
                          />
                        </div>
                      </div>
                    </div>
                    <div className="featured-beat-producer">
                      <Link to={`/producer/${beat.producer}`}>
                        {" "}
                        <p>
                          @{beat.producer}
                          <img
                            id="featured-beat-checkmark"
                            src={assets.goldCheckMark}
                            alt=""
                          />{" "}
                        </p>
                      </Link>
                    </div>
                  </div>
                </>
              ) : (
                <></>
              ),
            )}
          </div>
        </div>
      </>
    );
  } else {
    return (
      <>
        <div id="glitter-class" className="glitter-class">
        <TitleComponent title="Featured Beats & Instrumentals" />
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
          
        </div>
        </div>
      </>
    );
  }
};

export default BeatsComponent;
