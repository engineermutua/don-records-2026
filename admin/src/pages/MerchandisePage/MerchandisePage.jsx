import React from 'react'
import './MerchandisePage.css'
import { assets, products } from '../../assets/assets'

const MerchandisePage = () => {
  return (
    <>
    <div className="merchandise-container">
      {/*-------------------------------*/}
      <div className="merchandise-left">
        <div className="merchandise-left-header">
          <p>Merchandise</p>
        </div>
        <div className="merchandise-left-content">
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
      <div className="merchandise-right">
        <div className="merchandise-right-header">
          <h1>Add Merchandise</h1>
        </div>
        <div className="merchandise-right-content">
          <form>
            <div className="form-img">
              <img id='prod-img' src={assets.addProduct} alt="" />
              <img id='prod-img' src={assets.addProduct} alt="" />
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
              <input type="text" name="" id="" placeholder='Quantity'/>
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

export default MerchandisePage