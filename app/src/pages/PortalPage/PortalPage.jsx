import React, { useContext, useState } from 'react'
import './PortalPage.css'
import {ShopContext} from '../../Context/ShopContext'

const PortalPage = () => {
    const [role]=useState("producer");
    const {username}=useContext(ShopContext);
  return (
    <>
    <div className="portal-container">
    {
        role==="fan"
        ?
        <>
        <div className="fan-portal">
            <h1>Fan</h1>
        </div>
        </>
        :
        role==="artist"
        ?
        <>
        <div className="fan-portal">
            <h1>Artist</h1>
        </div>
        </>
        :
        role==="producer"
        ?
        <>
        <div className="fan-portal">
            <h1>Producer Dashboard</h1>
            <p>Welcome back {username}</p>
            <h6>Please be patient your portal is under development.</h6>
        </div>
        </>
        :
        <></>
    }
    </div>
    </>
  )
}

export default PortalPage