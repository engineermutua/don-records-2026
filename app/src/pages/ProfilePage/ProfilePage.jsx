import React, { useEffect, useState } from 'react'
import './ProfilePage.css'
import { assets } from '../../assets/assets'
import toast from 'react-hot-toast';

const ProfilePage = () => {
    const [image,setImage]=useState(false);

    const handleClick=(e)=>{
        try {
            const file=e.target.files[0];
            setImage(file);
            
        } catch (error) {
            toast.error(error)
        }
    }

    useEffect(()=>{},[image])
  return (
    <>
    <div className="profile-container">
        <div className="profile-left">
            <div className="profile-left-avatar">
                {
                    image?
                    <img src={URL.createObjectURL(image)} alt="" />
                    :
                    <img src={assets.avatar1} alt="" />
                }
            </div>
            <div className="profile-left-file">
                {
                    image
                    ?
                    <>
                    <p>{image.name}</p>
                    </>
                    :
                    <>
                    <p>Change Avatar</p>
                    <br/>
                    <input onChange={handleClick} type="file" name="" id="" />
                    </>
                }
                
            </div>
        </div>
        <div className="profile-right">
            <div className="profile-right-form">
                <form method='post'>
                    <div className="input-class">
                        <input type="text" name="" id="" placeholder='First Name' />
                        <input type="text" name="" id="" placeholder='Last Name' />
                    </div>
                    <div className="input-class">
                        <input type="email" name="" id="" placeholder='Email Address' />
                    </div>
                    <div className="input-class">
                        <input type="text" name="" id="" placeholder='phone' />
                        <input type="text" name="" id="" placeholder='County' />
                    </div>
                    <div className="input-class">
                        <textarea rows={5} name="" id="" placeholder='Bio(Tell the fans about yourself)'></textarea>
                    </div>
                    <div className="input-btn">
                        <button>Change</button>
                    </div>
                </form>
            </div>
        </div>
    </div>
    </>
  )
}

export default ProfilePage