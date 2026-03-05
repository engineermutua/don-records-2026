import React, { useEffect, useState } from "react";
import "./SingleBlogPage.css";
import { Link, useParams } from "react-router-dom";
import toast from "react-hot-toast";
import { assets, blogs } from "../../assets/assets.js";

const SingleBlogPage = () => {
  const { id } = useParams();

  const date = new Date();

  const [blog, setBlog] = useState(false);

  const fetchBlog =async() => {
    try {
      blogs.map((b) => {
        if(b._id === id) {
          setBlog(b);
          console.log(b);
        }
      });
    } catch (error) {
      toast.error(error);
    }
  };

  useEffect(() => {
    fetchBlog();
  }, [id]);

  const container=document.querySelector('.related-blogs');
  const scrollSpeed=2;

  function autoScroll() {
  if (container.scrollLeft >= (container.scrollWidth - container.clientWidth)) {
    container.scrollLeft = 0;
  } else {
    container.scrollLeft += scrollSpeed;
  }
}

// Set interval for speed (e.g., 30ms)
setInterval(autoScroll, 30);

  return (
    <>
      <div className="single-blog-container">
        <div className="single-blog">
          <div className="single-blog-header">
            <p>
              Created on {date.getDate()}/{date.getMonth()}/
              {date.getUTCFullYear()} at {date.getHours() - 12}:
              {date.getMinutes()}
              {date.getHours() > 12 ? "PM" : "Am"}
            </p>
           <Link to={`/producer/${blog.author}`}><p>@{blog.author} <img id="verified" src={blog.featured ? assets.goldCheckMark : ""} alt="" /> </p></Link> 
          </div>

          <div className="single-blog-image">
            <img src={blog.images} alt="" />
          </div>
          <div className="single-blog-title">
            <h1>{blog.title}</h1>
          </div>
          <div className="single-blog-description">
            <p>{blog.description}</p>
          </div>
        </div>
        {/*--------------Related Blogs---------------*/}
        <hr style={{marginBottom:"10px"}}/>
        <div className="single-blog-related">
        <div className="related-blogs-header">
            <h1>You Might Like</h1>
        </div>
        <div className="related-blogs">
            {
                blogs.map((blo)=>(
                    <div key={blo._id} className="related-blog">
                        <div className="related-blog-image">
                          <Link to={`/blog/${blo._id}`}> <img id="related-blog-image" onClick={()=>window.location.reload()} src={blo.images[0]} alt="" /></Link> 
                        </div>
                        <div className="related-blog-details">
                            <h1>{blo.title}</h1>
                        </div>
                    </div>
                ))
            }
        </div>
      </div>
      </div>

      
    </>
  );
};

export default SingleBlogPage;
