import React, { useState } from 'react'
import './PortalPage.css'

const PortalPage = () => {
    const [role]=useState("producer");
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
            <h1>Producer</h1>
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