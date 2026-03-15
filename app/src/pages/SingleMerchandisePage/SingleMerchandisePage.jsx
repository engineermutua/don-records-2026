import React, { useContext, useEffect, useState } from "react";
import "./SingleMerchandisePage.css";
import { Link, useParams } from "react-router-dom";
import toast from "react-hot-toast";
import { assets } from "../../assets/assets";
import { ShopContext } from "../../Context/ShopContext";
import axios from "axios";

const SingleMerchandisePage = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(false);
  const [merchandise,setMerchandise]=useState([]);
  const { currency,addToCart,backend_url} = useContext(ShopContext);
  
  useEffect(() => {
    const fetchProduct = async () => {
    try {
      const response=await axios.post(`${backend_url}/api/user/merchandise/${id}`)
      if(response.data.success){
        setProduct(response.data.merchandise);
      }else{
        toast.error(response.data.message);
        console.log(response.data.message);
      }
    } catch (error) {
      toast.error(error);
    }
  }
    fetchProduct();
  }, [id, product,backend_url]);


  useEffect(() => {
    const fetchMerchandise = async () => {
    try {
      const response=await axios.get(`${backend_url}/api/user/merchandise`)
      if(response.data.success){
        setMerchandise(response.data.merchandise);
      }else{
        console.log(response.data.message);
      }
    } catch (error) {
      toast.error(error);
    }
  }
    fetchMerchandise();
  }, [merchandise,backend_url]);

  return (
    <>
      <div className="single-merchandise-container">
        <div className="single-merchandise">
          <div className="single-merchandise-image">
            <img id="single-merchandise-image" src={product.image?product.image[0]:product.image} alt="" />
          </div>
          <div className="single-merchandise-details">
            <h1>{product.title}</h1>
            <br/>
            <h3>
              {currency} {product.price}
            </h3>
            <p style={{ color: product.quantity >= 150 ? "green" : "red" }}>
              {product.quantity >= 100
                ? `In Stock (${product.quantity})`
                : `Stock Alert (${product.quantity})`}
            </p>
            <div className="single-merch-image">
              <img onClick={()=>(addToCart(product._id),toast.success(`${product.title} added to cart`))} id="single-merch-image" src={assets.addToCartIcon} alt="" />
            </div>
          </div>
        </div>
        <div className="single-merch-related">
          <div className="single-merch-related-header">
            <h1>Related Merchandise</h1>
          </div>
          <div className="single-merch">
            {merchandise.map((p) => (
              <div key={p._id} className="single-m">
                <div className="single-m-img">
                <Link to={`/merchandise/${p._id}`}><img id="single-m-img" src={p.image[0]} alt="" /></Link>
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
