import React from 'react'
import { assets, products } from '../../assets/assets'
import './BeatsPage.css'

const BeatsPage = () => {
  return (
    <>
    <div className="beats-container">
      {/*-------------------------------*/}
      <div className="beats-left">
        <div className="beats-left-header">
          <p>beats</p>
        </div>
        <div className="beats-left-content">
          {
            products.map((product,i)=>(
              <div key={product.id} className="merch-product">
                <div className="merch-id">
                  <p>{i+1}</p>
                </div>
                <div className="merch-img">
                  <img id='merch-img' src={product.image[0]} alt="" />
                </div>
                <div className="merch-title">
                  <p>Title: {product.title}</p>
                </div>
                <div className="merch-quantity">
                  <p>Quantity: {product.quantity}</p>
                </div>
                <div className="merch-price">
                  <p>price {product.price}</p>
                </div>
                <div id='merch-actions' className="merch-actions">
                  <img id='merch-action' src={assets.deleteI} alt="" />
                  <img id='merch-action' src={assets.edit} alt="" />
                </div>
              </div>
            ))
          }
        </div>
      </div>
      {/*-------------------------------*/}
      <div className="beats-right">
        <div className="beats-right-header">
          <h1>Add beats</h1>
        </div>
        <div className="beats-right-content">
          <form>
            <div className="form-img">
              <img id='prod-img' src={assets.fileI} alt="" />
              <p>Drag Or Drop file</p>
            </div>
            <div className="form-class">
              <input type="text" name="" id="" placeholder='Title'/>
            </div>
            <div className="form-class">
              <input type="text" name="" id="" placeholder='Description'/>
            </div>
            <div className="form-class">
              <input type="text" name="" id="" placeholder='Price'/>
            </div>
            <div className="form-class">
              <input type="text" name="" id="" placeholder='Length'/>
            </div>
            <div className="form-class">
              <input type="text" name="" id="" placeholder='Producer'/>
            </div>
            <div className="form-btn">
              <button>Add</button>
            </div>
          </form>
        </div>
      </div>
    </div>
    </>
  )
}

export default BeatsPage