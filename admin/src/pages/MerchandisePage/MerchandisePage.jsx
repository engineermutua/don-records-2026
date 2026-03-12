import React, { useState } from 'react'
import './MerchandisePage.css'
import { assets } from '../../assets/assets'
import {toast} from 'react-hot-toast'
import axios from 'axios'
import { useContext } from 'react'
import { ManagementContext } from '../../Context/ManagementContext'
import { useEffect } from 'react'

const MerchandisePage = () => {
  const [image1,setImage1]=useState(null);
  const [image2,setImage2]=useState(null);
  const [isFeatured,setIsFeatured]=useState(false);
  const [title,setTitle]=useState("The Dons Appparel");
  const [description,setDescription]=useState("The Dons Appparel");
  const [price,setPrice]=useState(0.00);
  const [quantity,setQuantity]=useState(0.00);
  const {backend_url}=useContext(ManagementContext);
  const [merchandise,setMerchandise]=useState([]);

  const handleChange=(e)=>{
    setIsFeatured(e.target.checked);
  }

  useEffect(()=>{
    const fetchMerchandise=async()=>{
      try {
        const response=await axios.get(`${backend_url}/api/user/merchandise`);        
        if(response.data.success){
          setMerchandise(response.data.merchandise);  
        }else{
          toast.error(response.data.message);
        }
        
      } catch (error) {
        toast.error(error);
        console.log(error);
        
      }
    }

    fetchMerchandise();
  },[merchandise,backend_url])

  const handleSumit=async(e)=>{
    e.preventDefault();
    try {
      const formData=new FormData();
      image1 && formData.append("image1",image1);
      image2 && formData.append("image2",image2);
      formData.append("title",title);
      formData.append("description",description);
      formData.append("price",price);
      formData.append("quantity",quantity);
      formData.append("isFeatured",isFeatured);
      const response=await axios.post(`${backend_url}/api/admin/addMerchandise`,formData,)
      if(response){
        console.log(response);   
        toast.success(response.data.message);
      }
    } catch (error) {
      toast.error(error)
    }
  }

  const deleteMerch=async(id)=>{
    try {
      const response=await axios.post(`${backend_url}/api/admin/deleteMerchandise/${id}`);
      if(response.data.success){
        toast.success(response.data.message);
      }
      
    } catch (error) {
      toast.error(error)
    }
  }
  return (
    <>
    <div className="merchandise-container">
      {/*-------------------------------*/}
      <div className="merchandise-left">
        <div className="merchandise-left-header">
          <p>Merchandise</p>
        </div>
        <div className="merchandise-left-content">
          {
            merchandise.map((product,i)=>(
              <div key={product._id} className="merch-product">
                <div className="merch-id">
                  <p>{i+1}</p>
                </div>
                <div className="merch-img">
                  <img id='merch-img' src={product.image[0]} alt="" />
                </div>
                <div className="merch-title">
                  <p>Title: {product.title}</p>
                </div>
                <div className="merch-quantity">
                  <p>Quantity: {product.quantity}</p>
                </div>
                <div className="merch-price">
                  <p>price {product.price}</p>
                </div>
                <div id='merch-actions' className="merch-actions">
                  <img id='merch-action' onClick={()=>deleteMerch(product._id)}  src={assets.deleteI} alt="" />
                  {/*<img id='merch-action' src={assets.edit} alt="" />*/}
                </div>
              </div>
            ))
          }
        </div>
      </div>
      {/*-------------------------------*/}
      <div className="merchandise-right">
        <div className="merchandise-right-header">
          <h1>Add Merchandise</h1>
        </div>
        <div className="merchandise-right-content">
          <form onSubmit={handleSumit} method='post'>
            <div className="form-img">
              <label htmlFor="image1">
                <img 
                id='prod-img' 
                src={image1 && image1?URL.createObjectURL(image1):assets.addProduct} 
                alt="" 
                />
                <input 
                onChange={(e)=>setImage1(e.target.files[0])}
                type="file" 
                name="image1"
                id='image1'
                hidden
                />
              </label>
              <label htmlFor="image2">
                <img 
                id='prod-img' 
                src={image2 && image2?URL.createObjectURL(image2):assets.addProduct} 
                alt="" 
                />
                <input 
                onChange={(e)=>setImage2(e.target.files[0])}
                type="file" 
                name="image2"
                id='image2'
                hidden
                />
              </label>
            </div>
            <div className="form-class">
              <input type="text" value={title} onChange={(e)=>setTitle(e.target.value)} placeholder='Title'/>
            </div>
            <div className="form-class">
              <input type="text" value={description} onChange={(e)=>setDescription(e.target.value)} placeholder='Description'/>
            </div>
            <div className="form-class">
              <input type="text" value={price} onChange={(e)=>setPrice(e.target.value)} placeholder='Price'/>
            </div>
            <div className="form-class">
              <input type="text" value={quantity} onChange={(e)=>setQuantity(e.target.value)} placeholder='Quantity'/>
            </div>
            <div className="form-check">
              <label htmlFor="isFeatured">Select to feature merchandise to home page</label>
              <input style={{justifySelf:"left"}} type="checkbox" checked={isFeatured} onChange={handleChange} />
            </div>
            <div className="form-btn">
              <button type='submit'>Add</button>
            </div>
          </form>
        </div>
      </div>
    </div>
    </>
  )
}

export default MerchandisePage