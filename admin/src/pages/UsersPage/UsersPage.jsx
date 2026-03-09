import React from 'react'
import './UsersPage.css'
import {assets, users} from '../../assets/assets.js'

const UsersPage = () => {
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
            <button>Filter</button>
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
          {
            users.map((user,i)=>(
              <>
              <hr/>
              <div key={user._id} className="user-bottom">
                <div className="user-id">
                  <p>0{i+1}</p>
                </div>
                <div className="user-name">
                  <p>{user.name}</p>
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
                  <p>{user.status}</p>
                </div>
                <div className="user-date">
                  <p>{0}{user.date.getDate()}/{0}{user.date.getMonth()}/{user.date.getFullYear()}</p>
                </div>
                <div className="user-act">
                  <img id='user-act' src={assets.approved} alt="" />
                  <img id='user-act' src={assets.deleteI} alt="" />
                  <img id='user-act' src={assets.edit} alt="" />
                </div>
              </div>
           
              </>
            ))
          }
        </div>
      </div>
    </div>
    </>
  )
}

export default UsersPage