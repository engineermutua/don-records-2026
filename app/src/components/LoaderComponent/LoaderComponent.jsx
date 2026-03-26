import React from 'react'
import './LoaderComponent.css'

const LoaderComponent = (props) => {
  return (
    <div className="loading-container">
      <div className="loader">

      </div>
      <div className="loader-text">
        <p>{props.text}</p>
      </div>
    </div>
  )
}

export default LoaderComponent