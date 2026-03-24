import React, { useContext, useEffect, useState } from "react";
import "./UsersPage.css";
import { assets } from "../../assets/assets.js";
import { ManagementContext } from "../../Context/ManagementContext.jsx";
import axios from "axios";
import toast from "react-hot-toast";

const UsersPage = () => {
  const { backend_url } = useContext(ManagementContext);
  const [userss, setUsers] = useState([]);

  const deleteUser=async(id)=>{
    try {
      const response=await axios.post(`${backend_url}/api/admin/deleteUser/${id}`);
      if(response.data.success){
        toast.success(response.data.message);
      }else{
        toast.error(response.data.message)
      }
    } catch (error) {
      toast.error(error)
    }
  }


  const validateUser=async(id)=>{
    try {
      const response=await axios.post(`${backend_url}/api/admin/validateUser/${id}`);
      if(response.data.success){
        toast.success(response.data.message);
      }else{
        toast.error(response.data.message)
      }
    } catch (error) {
      toast.error(error)
    }
  }

  const featureUser=async(id)=>{
    try {
      const response=await axios.post(`${backend_url}/api/admin/feature/${id}`);
      if(response.data.success){
        toast("User has been featured")
      }else{
        toast.error("Could not Feature user.")
        console.log(response.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error)
      
    }
  }

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get(`${backend_url}/api/user/users`);
        if (response.data.success) {
          setUsers(response.data.users);
        } else {
          toast.error(response.data.message);
        }
      } catch (error) {
        console.log(error);
        toast.error(error);
      }
    };
    fetchUsers();
  }, [userss, backend_url]);
  return (
    <>
      <div className="users-container">
        {/*-----------------------------*/}
        <div className="users-top">
          <div className="users-top-left">
            <form>
              <select name="" id="">
                <option value="">user</option>
                <option value="">fan</option>
                <option value="">producer</option>
                <option value="">admin</option>
              </select>
            </form>
            <div className="filter-btn">
              <button onClick={()=>{toast.success('Feature Under development')}}>Filter</button>
            </div>
          </div>
        </div>
        {/*-----------------------------*/}
        <div className="users-bottom">
          <div className="users-bottom-top">
            <div className="bottom-class">
              <b>ID</b>
            </div>
            <div className="bottom-class">
              <b>Name</b>
            </div>
            <div className="bottom-class">
              <b>Role</b>
            </div>
            <div className="bottom-class">
              <b>Contact</b>
            </div>
            <div className="bottom-class">
              <b>Email</b>
            </div>
            <div className="bottom-class">
              <b>Status</b>
            </div>
            <div className="bottom-class">
              <b>Date Joined</b>
            </div>
            <div className="bottom-class">
              <b>Action</b>
            </div>
          </div>
          <div className="users-bottom-bottom">
            {userss.map((user, i) => (
              <>
                <hr />
                <div key={user._id} className="user-bottom">
                  <div className="user-id">
                    <p>0{i + 1}</p>
                  </div>
                  <div className="user-name">
                    <p>{user.username}</p>
                  </div>
                  <div className="user-role">
                    <p>{user.role}</p>
                  </div>
                  <div className="user-phone">
                    <p>{user.phone}</p>
                  </div>
                  <div className="user-email">
                    <p>{user.email}</p>
                  </div>
                  <div className="user-status">
                    <p>{user.isVerified?"Verified":"Not Verified"}</p>
                  </div>
                  <div className="user-date">
                    <p>
                      {new Date(user.createdAt).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </p>
                  </div>
                  <div className="user-act">
                    <img onClick={()=>validateUser(user._id)} id="user-act" src={user.isVerified?assets.approve:assets.approved} alt="" />
                    <img id="user-act" onClick={()=>(featureUser(user._id))} src={user.isFeatured?assets.featured:assets.feature} alt="" />
                    <img onClick={()=>deleteUser(user._id)} id="user-act" src={assets.deleteI} alt="" />
                   {/* <img id="user-act" src={assets.edit} alt="" />*/}
                  </div>
                </div>
              </>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default UsersPage;
