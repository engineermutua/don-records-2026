import React, { useContext, useEffect, useState } from 'react'
import './BlogsPage.css'
import { assets } from '../../assets/assets'
import toast from 'react-hot-toast';
import axios from 'axios';
import { ManagementContext } from '../../Context/ManagementContext';

const BlogsPage = () => {
  const [image,setImage]=useState(null);
  const [title,setTitle]=useState("");
  const [description,setDescription]=useState("");
  const [tags,setTags]=useState("");
  const [isFeatured,setIsFeatured]=useState(false);
  const handleChange=(e)=>{
    setIsFeatured(e.target.checked);
  }
  const {backend_url}=useContext(ManagementContext);

  const [blogs,setBlogs]=useState([]);

  const handleSubmit=async(e)=>{
    e.preventDefault();
    try {
      const formData=new FormData();

      image && formData.append("image",image);
      formData.append("title",title);
      formData.append("description",description);
      formData.append("tags",tags);
      formData.append("isFeatured",isFeatured);
      const response=await axios.post(`${backend_url}/api/admin/addBlog`,formData,);
      console.log(response);
      if(response.data.success){
        toast.success(response.data.message)
      }else{
        toast.error(response.data.message)
      }
      
    } catch (error) {
      toast.error(error)
    }
  }

  const deleteBlog=async(id)=>{
    try {
      const response=await axios.post(`${backend_url}/api/admin/deleteBlog/${id}`);
      if(response.data.success){
        toast.success(response.data.message);
      }else{
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error(error)
    }
  }

  useEffect(()=>{
    const fetchBlogs=async()=>{
      try {
        const response=await axios.get(`${backend_url}/api/user/blogs`);
        if(response.data.success){
          setBlogs(response.data.blogs);
        }else{
          toast.error(response.data.message);
        }
      } catch (error) {
        toast.error(error)
      }
    }
    fetchBlogs()
  },[blogs,backend_url])
  return (
    <>
    <div className="blogs-container">
          {/*-------------------------------*/}
          <div className="blogs-left">
            <div className="blogs-left-header">
              <p>blogs</p>
            </div>
            <div className="blogs-left-content">
              {
                blogs.map((product,i)=>(
                  <div key={product._id} className="merch-product">
                    <div className="merch-id">
                      <p>{i+1}</p>
                    </div>
                    <div className="merch-img">
                      <img id='merch-img' src={product.image} alt="" />
                    </div>
                    <div className="merch-title">
                      <p>Title: {product.title}</p>
                    </div>
                    <div className="merch-quantity">
                      <p>{product.tags}</p>
                    </div>
                    <div className="merch-price">
                      <p> {product.isFeatured ?"Featured":"Not featured"}</p>
                    </div>
                    <div id='merch-actions' className="merch-actions">
                      <img id='merch-action' onClick={()=>deleteBlog(product._id)} src={assets.deleteI} alt="" />
                     {/* <img id='merch-action' src={assets.edit} alt="" />*/}
                    </div>
                  </div>
                ))
              }
            </div>
          </div>
          {/*-------------------------------*/}
          <div className="blogs-right">
            <div className="blogs-right-header">
              <h1>Add Blog</h1>
            </div>
            <div className="blogs-right-content">
              <form onSubmit={handleSubmit} method='post'>
                <div className="form-img">
                  <label htmlFor="image">
                    <img id='prod-img' src={image&& image? URL.createObjectURL(image):assets.addProduct} alt="" />
                    <input 
                    type="file"
                    onChange={(e)=>setImage(e.target.files[0])} 
                    name="image" 
                    id="image" 
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
                  <input type="text" value={tags} onChange={(e)=>setTags(e.target.value)} placeholder='Tags'/>
                </div>
                <div className="form-check">
                  <label htmlFor="isFeatured">Click to feature on HomePage</label>
                  <input checked={isFeatured} onChange={handleChange} type="checkbox" name="isFeatured" id="isFeatured" />
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

export default BlogsPage