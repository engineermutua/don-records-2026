import React, { useContext, useEffect, useState } from "react";
import "./SingleMerchandisePage.css";
import { Link, useParams } from "react-router-dom";
import toast from "react-hot-toast";
import { assets, products } from "../../assets/assets";
import { ShopContext } from "../../Context/ShopContext";

const SingleMerchandisePage = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(false);
  const { currency } = useContext(ShopContext);
  const fetchProduct = async () => {
    try {
      products.map((prod) => {
        if (prod._id === id) {
          setProduct(prod);
        }
      });
    } catch (error) {
      toast.error(error);
    }
  };
  useEffect(() => {
    fetchProduct();
  }, [id, product]);

  return (
    <>
      <div className="single-merchandise-container">
        <div className="single-merchandise">
          <div className="single-merchandise-image">
            <img id="single-merchandise-image" src={product.images} alt="" />
          </div>
          <div className="single-merchandise-details">
            <h1>{product.title}</h1>
            <p>{product.description}</p>
            <h3>
              {currency} {product.price}
            </h3>
            <p style={{ color: product.Quantity >= 100 ? "green" : "red" }}>
              {product.Quantity >= 100
                ? `In Stock (${product.Quantity})`
                : `In Stock (${product.Quantity})`}
            </p>
            <div className="single-merch-image">
              <img id="single-merch-image" src={assets.addToCartIcon} alt="" />
            </div>
          </div>
        </div>
        <div className="single-merch-related">
          <div className="single-merch-related-header">
            <h1>Related Merchandise</h1>
          </div>
          <div className="single-merch">
            {products.map((p) => (
              <div key={p._id} className="single-m">
                <div className="single-m-img">
                <Link to={`/merchandise/${p._id}`}><img id="single-m-img" src={p.images[0]} alt="" /></Link>
                </div>
                <div className="single-m-details">
                    <h3>{p.title}</h3>
                    <p>{currency} {p.price}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default SingleMerchandisePage;
