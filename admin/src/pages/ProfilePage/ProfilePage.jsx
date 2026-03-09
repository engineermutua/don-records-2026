import React, { useState } from 'react'
import './ProfilePage.css'
import { assets } from '../../assets/assets'
import toast from 'react-hot-toast';

const ProfilePage = () => {
  const [file,setFile]=useState(false);
  const handleSubmit=(e)=>{
    try {
      e.preventDefault()
      
    } catch (error) {
      toast.error(error)
    }
  }
  return (
    <>
    <div className="profile-container">
      <div className="profile-left">
        <img id='profile-img' src={file?URL.createObjectURL(file) :assets.avatar} alt="" />
        <form onSubmit={handleSubmit}>
          <input onChange={(e)=>(setFile(e.target.files[0]))} type="file" name="" id="" />
        </form>
      </div>
      <div className="profile-right">
        <form onSubmit={handleSubmit}>
          <div className="form-class-small">
            <input type="text" name="fname" id="" placeholder='First Name'/>
            <input type="text" name="lname" id="" placeholder='Last Name'/>
          </div>
          <div className="form-class-large">
            <input type="text" name="email" id="" placeholder='Email Address'/>
          </div>
          <div className="form-class-small">
            <input type="text" name="phone" id="" placeholder='Contact'/>
            <input type="text" name="" id="" placeholder='County'/>
          </div>
          <div className="form-class-large">
            <textarea name="" id=""  rows="4" placeholder='Bio'></textarea>
          </div>
          <div className="form-class-btn">
            <button>Update</button>
          </div>
        </form>
      </div>
    </div>
    </>
  )
}

export default ProfilePage