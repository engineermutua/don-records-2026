import React, { useContext } from 'react'
import './MerchandiseComponent.css'
import TitleComponent from '../TitleComponent/TitleComponent'
import { assets, products } from '../../assets/assets'
import { ShopContext } from '../../Context/ShopContext'
import { Link } from 'react-router-dom'

const MerchandiseComponent = () => {
    const {currency}=useContext(ShopContext);
  return (
    <>
    <div id='featured-merchandise-container' className="featured-merchandise-container">
        <TitleComponent title="Bestseller Merchandise" />
        <div className="featured-merchandise">
            {
                products.map((product)=>(
                    product.bestseller ?
                    <div key={product._id} className="featured-merch">
                        <div className="featured-merch-image">
                          <Link to={`/merchandise/${product._id}`}><img src={product.images[0]} alt="" /></Link> 
                        </div>
                        <div className="featured-merch-details">
                            <div className="featured-merch-detail1">
                                <h4>{product.title}</h4>
                                <p>{currency}{product.price}</p>
                            </div>

                            <div className="featured-merch-detail">
                                <img id='featured-merch-cart' src={assets.addToCartIcon} alt="" />
                            </div>
                            
                        </div>
                    </div>
                    :
                    <>
                    
                    </>
                ))
            }
        </div>
    </div>
    </>
  )
}

export default MerchandiseComponent