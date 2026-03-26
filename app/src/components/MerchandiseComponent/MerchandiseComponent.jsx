import React, { useContext, useEffect, useState } from "react";
import "./MerchandiseComponent.css";
import TitleComponent from "../TitleComponent/TitleComponent";
import { assets } from "../../assets/assets";
import { ShopContext } from "../../Context/ShopContext";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import axios from "axios";

const MerchandiseComponent = () => {
  const { currency, addToCart, backend_url } = useContext(ShopContext);
  const [merchandise, setMerchandise] = useState([]);
  useEffect(() => {
    const fetchMerchandise = async () => {
      try {
        const response = await axios.get(`${backend_url}/api/user/merchandise`);
        if (response.data.success) {
          setMerchandise(response.data.merchandise);
        } else console.log(response.data.message);
      } catch (error) {
        console.log(error);
      }
    };
    fetchMerchandise();
  }, [merchandise, backend_url]);
  if (merchandise.length > 0) {
    return (
      <>
        <div
          id="featured-merchandise-container"
          className="featured-merchandise-container"
        >
          <TitleComponent title="Bestseller Merchandise" />
          <div className="featured-merchandise">
            {merchandise.map((product) =>
              product.isFeatured ? (
                <div key={product._id} className="featured-merch">
                  <div className="featured-merch-image">
                    <Link to={`/merchandise/${product._id}`}>
                      <img src={product.image[0]} alt="" />
                    </Link>
                  </div>
                  <div className="featured-merch-details">
                    <div className="featured-merch-detail1">
                      <h4>{product.title}</h4>
                      <p>
                        {currency}
                        {product.price}
                      </p>
                    </div>

                    <div className="featured-merch-detail">
                      <img
                        onClick={() => (
                          addToCart(product._id),
                          toast.success(`${product.title} added to cart`)
                        )}
                        id="featured-merch-cart"
                        src={assets.addToCartIcon}
                        alt=""
                      />
                    </div>
                  </div>
                </div>
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
          <TitleComponent title="Bestseller Merchandise" />
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

export default MerchandiseComponent;
