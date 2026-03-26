import React, { useContext, useEffect, useState } from 'react'
import './FeaturedBlogsComponent.css'
import TitleComponent from '../TitleComponent/TitleComponent'
import { Link } from 'react-router-dom'
import { ShopContext } from '../../Context/ShopContext'
import axios from 'axios'

const FeaturedBlogsComponent = () => {
    const {backend_url}=useContext(ShopContext);
    const [blogs,setBlogs]=useState([]);

    useEffect(()=>{
        const fetchBlogs=async()=>{
            try {
                const response=await axios.get(`${backend_url}/api/user/blogs`);
                if(response.data.success){
                    setBlogs(response.data.blogs);
                }else{
                    console.log(response.data.message);
                }
            } catch (error) {
                console.log(error);
                
            }
        }
        fetchBlogs();
    },[blogs,backend_url])
  if(blogs.length>0){
    return (
    <>
    <div className="featured-blogs-container">
        <TitleComponent title="Recent Blogs & Updates"/>
        <div className="featured-blogs">
            {
                blogs.map((blog)=>(
                    blog.isFeatured ?
                    <>
                    <div key={blog._id} className="featured-blog">
                        <div className="featured-blog-image">
                           <Link to={`/blog/${blog._id}`}> <img src={blog.image} alt="" /></Link>
                        </div>
                        <div className="blog-title">
                            <h3>{blog.title}</h3>
                        </div>
                        <div className="blog-description">
                            <p>{blog.description}</p>
                        </div>
                    </div>
                    </>
                    :
                    <></>
                ))
            }
        </div>
    </div>
    </>
  )
  }else{
    return(
        <>
        <div id="glitter-class" className="glitter-class">
        <TitleComponent title="Recent Blogs & Updates"/>
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
    )
  }
}

export default FeaturedBlogsComponent