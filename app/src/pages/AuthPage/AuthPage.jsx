import React, { useContext, useEffect, useState } from "react";
import "./AuthPage.css";
import { assets } from "../../assets/assets";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import {ShopContext} from '../../Context/ShopContext'
import axios from 'axios'

const AuthPage = () => {
  const [login, setLogin] = useState(true);

  const [avatar,setAvatar]=useState(false);
  const [fname,setFname]=useState("");
  const [lname,setLname]=useState("");
  const [usernamee,setUSername]=useState("");
  const [phone,setPhone]=useState("")
  const [email,setEmail]=useState("");
  const [role,setRole]=useState("");
  const [password,setPassword]=useState("");

  

  const {setUserId,backend_url,setToken}=useContext(ShopContext);

  
  const navigate=useNavigate();

  const handleSubmit=async(e)=>{
    e.preventDefault();
    try {
      if(login){
        const response=await axios.post(`${backend_url}/api/user/login`,{email,password},)
        if(response.data.success){
          setUserId(response.data.user._id);
          localStorage.setItem("user",response.data.user._id)
          let token=localStorage.getItem("token");
          if(!token){
            setToken(response.data.token);
            localStorage.setItem("token",response.data.token);
          }
          toast.success(response.data.message);
          navigate('/')
        }else{
          toast.error(response.data.message)
        }
        
      }else{
        const formData=new FormData();
        formData.append("avatar",avatar)
        formData.append("fname",fname)
        formData.append("lname",lname)
        formData.append("username",usernamee);
        formData.append("email",email)
        formData.append("phone",phone)
        formData.append("role",role)
        formData.append("password",password)

        const response=await axios.post(`${backend_url}/api/user/register`,formData,);
        if(response.data.success){
          setToken(response.data.token);
          localStorage.setItem('token',response.data.token);
          toast.success(response.data.message);
          setLogin(true)
        }else{
          toast.error(response.data.message);
        }
        
      }
      
    } catch (error) {
      console.log(error);
      toast.error(error);
      
    }
      
  }
  useEffect(()=>{},[backend_url])
  return (
    <>
      <div className="register-container">
        <div className="register-form">
          <form onSubmit={handleSubmit} >
            {login ? (
              <>
                <div className="input-class">
                  <label htmlFor="">Email</label>
                  <br />
                  <input value={email} onChange={(e)=>setEmail(e.target.value)} type="text" />
                </div>
                <div className="input-class">
                  <label htmlFor="">Password</label>
                  <br />
                  <input type="password" value={password} onChange={(e)=>setPassword(e.target.value)} />
                </div>
                <div className="input-class">
                    <button type="submit">Login</button>
                </div>
                <p>Don't have account?<span onClick={()=>setLogin(false)}>Register</span></p>
              </>
            ) : (
              <>
              <div id="avatar-class" className="input-class">
                  <label htmlFor="avatar">
                    <img 
                    id="user-avatar" 
                    name='user-avatar'
                    src={avatar? URL.createObjectURL(avatar):assets.userIcon} 
                    alt="profile picture" 
                    /> 
                    <input 
                    name="avatar"
                    id="avatar"
                    onChange={(e)=>(setAvatar(e.target.files[0]))} 
                    type="file" 
                    hidden
                    />
                  </label>
                </div>
               <div className="input-class">
                  <label htmlFor="">First name</label>
                  <br />
                  <input type="text" value={fname} onChange={(e)=>setFname(e.target.value)} />
                </div>
                 <div className="input-class">
                  <label htmlFor="">Last name</label>
                  <br />
                  <input type="text" value={lname} onChange={(e)=>setLname(e.target.value)} />
                </div>
               <div className="input-class">
                  <label htmlFor="">Username</label>
                  <br />
                  <input type="text" value={usernamee} onChange={(e)=>setUSername(e.target.value)} />
                </div>
                <div className="input-class">
                  <label htmlFor="">Phone number</label>
                  <br />
                  <input type="text" value={phone} onChange={(e)=>setPhone(e.target.value)} />
                </div>
              <div className="input-class">
                  <label htmlFor="">Email</label>
                  <br />
                  <input type="text" value={email} onChange={(e)=>setEmail(e.target.value)} />
                </div>
                <div className="input-class">
                  <label htmlFor="">Role</label>
                  <br />
                  <select value={role} onChange={(e)=>setRole(e.target.value)} id="">
                    <option value="fan">Fan/User</option>
                    <option value="artist">Artist</option>
                    <option value="producer">Producer</option>
                  </select>
                </div>
                <div className="input-class">
                  <label htmlFor="">Password</label>
                  <br />
                  <input type="password" value={password} onChange={(e)=>setPassword(e.target.value)} />
                </div>
                
                <div className="input-class">
                    <button type="submit">Register</button>
                </div>
                <p>Already have an account?<span onClick={()=>setLogin(true)}>Login</span></p>
              </>
            )}
          </form>
        </div>
      </div>
    </>
  );
};

export default AuthPage;
