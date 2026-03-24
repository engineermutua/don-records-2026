import React, { useContext, useEffect, useState } from 'react'
import './CheckoutPage.css'
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { ShopContext } from "../../Context/ShopContext";
import axios from 'axios'

const CheckoutPage = () => {
    const [mpesa,setMpesa]=useState(false);
    const [paypal,setPaypal]=useState(false);
    const [cod,setCod]=useState(true);
    const [fname,setFname]=useState("");
    const [lname,setLname]=useState("");
    const [email,setEmail]=useState("");
    const [phone,setPhone]=useState("");
    const [county,setCounty]=useState("");
    const [postal,setPostal]=useState("");
    const [ward,setWard]=useState("");
    const [street,setStreet]=useState("");
    const [note,setNote]=useState("");
    const navigate=useNavigate();
    const [cartData, setCartData] = useState([]);
  const [products,setProducts]=useState([]);
  const {
    currency,
    cartItems,
    getCartAmount,
    token,
    backend_url
  } = useContext(ShopContext);

  const date=new Date();
  const time=`${"order"+date.getDay(),date.getMonth(),date.getFullYear(),date.getHours(),date.getMinutes(),date.getSeconds(),date.getMilliseconds()}`

  const placeOrderCod=async()=>{
    const formData=new FormData();
    formData.append("fname",fname);
    formData.append("email",email);
    formData.append("phone",phone);
    formData.append("county",county);
    formData.append("postal",postal);
    formData.append("ward",ward);
    formData.append("street",street);
    formData.append("note",note);
    try {
      const response=await axios.post(`${backend_url}/api/user/order`,{items:cartData,amount:getCartAmount(),address:formData,reference:date.getMinutes()},{headers:{token}});
      console.log(response);
      if(response.data.success){
        toast.success(response.data.message);
        navigate('/order');
      }else{
        console.log(response.data.message);
        toast.error(response.data.message)
      }
      
    } catch (error) {
      console.log(error);
      
    }
  }

  useEffect(()=>{
    console.log(time);
    
    const fetchProducts=async()=>{
      try {
        const response=await axios.get(`${backend_url}/api/user/products`);
        if(response.data.success){
          setProducts(response.data.products)
        }else{
          console.log(response.data.message);
        }
      } catch (error) {
        console.log(error);
        
      }
    }
    fetchProducts()
  },[products,backend_url])

  useEffect(() => {    
    if (products.merchandise && Object.keys(cartItems).length > 0) {
      const tempData = [];

      for (const productId in cartItems) {
        if (cartItems[productId] > 0) {
          tempData.push({
            _id: productId,
            quantity: cartItems[productId],
          });
          
        }
      }
      setCartData(tempData);
    }

    
  }, [cartItems, products]);
  return (
    <>
    <div className="checkout-container">
        {/*---------------------------------*/}
        <div className="checkout-left">
            <h1>Delivery Address</h1>
            <div className="checkout-left-form">
                <form>
                    <div className="form-class">
                        <input type="text" value={fname} onChange={(e)=>setFname(e.target.value)} name="fname" id="" placeholder='First Name' />
                        <input type="text" value={lname} onChange={(e)=>setLname(e.target.value)} name="lname" id=""  placeholder='Last Name'/>
                    </div>
                    <br></br>
                    <input type="email" name="email" value={email} onChange={(e)=>setEmail(e.target.value)} id=""  placeholder='Email Address'/>
                    <br></br>
                    <input type="text" name="phone" value={phone} onChange={(e)=>setPhone(e.target.value)} id="" placeholder='Phone Number' />
                    <br></br>
                    <div className="form-class">
                        <input type="text" name="county" value={county} onChange={(e)=>setCounty(e.target.value)} id="" placeholder='County' />
                        <input type="text" name="code" value={postal} onChange={(e)=>setPostal(e.target.value)} id="" placeholder='Postal Code'/>
                    </div>
                    <br></br>
                    <div className="form-class">
                        <input type="text" name="ward" value={ward} onChange={(e)=>setWard(e.target.value)} id="" placeholder='Ward'/>
                        <input type="text" name="street" value={street} onChange={(e)=>setStreet(e.target.value)} id="" placeholder='Street'/>
                    </div>
                    <br></br>
                    <textarea name="notes" value={note} onChange={(e)=>setNote(e.target.value)} id="" rows={3} placeholder='Order Notes(Sizes for merchandise & length for beats)'></textarea>
                </form>
            </div>
        </div>
        {/*---------------------------------*/}
        <div className="checkout-right">
            <h1>Your Orders</h1>
            <div id='checkout-right-items' className="checkout-right-items">
            
             {
                cartData.map((item, index) => {
                const product =
                products.merchandise.find(
                    (product) => product._id === item._id,
                ) || products.beats.find((product) => product._id === item._id);              

                return (
                    <>
                    <div key={index} className="checkout-right-order">
                        <div className="checkout-right-order-img">
                            <img id='checkout-right-order-img' src={product.image || product.thumbnail} alt="" />
                        </div>
                        <div  className="checkout-right-order-details">
                            <p>{product.title}</p>
                            <p>{currency} {product.price}</p>
                        </div>
                    </div>
                    
                    </>
                    )
                    
                }  
            )} 
            </div>

             <hr/>   
            <p>Subtotal: {currency} {getCartAmount()}</p>
            <hr />

            <div className="checkout-right-payment">
                <h4>Payment Options</h4>

                <div className="checkout-right-mpesa">
                    <div onClick={()=>(setMpesa(!mpesa),setPaypal(false),setCod(false))} style={{background:mpesa?"#32CD32":"",border:mpesa?"0":""}} className="mpesa-box">

                    </div>
                    <p>Mpesa</p>
                </div>

                <div className="checkout-right-paypal">
                    <div onClick={()=>(setMpesa(false),setPaypal(!paypal),setCod(false))} style={{background:paypal?"#1F51FF":"",border:paypal?"0":""}} className="paypal-box">

                    </div>
                    <p>PayPal</p>
                </div>

                <div className="checkout-right-cod">
                    <div onClick={()=>(setMpesa(false),setPaypal(false),setCod(!cod))} style={{background:cod?"#FFD700":"",border:cod?"0":""}} className="cod-box">

                    </div>
                    <p>Cash On Delivery</p>
                </div>

                {
                    mpesa
                    ?
                    <>
                    <button onClick={()=>toast.success("Feature under Development. Use Cash on delivery")} style={{backgroundColor:mpesa?"#32CD32":""}}>Lipa Na Mpesa</button>
                    </>
                    :
                    paypal
                    ?
                    <>
                    <button onClick={()=>toast.success("Feature under Development. Use Cash on delivery")} style={{backgroundColor:paypal?"#1F51FF":"",color:paypal?"#FAF9F6 ":""}}>Pay With PayPay</button>
                    </>
                    :
                    cod
                    ?
                    <>
                    <button onClick={()=>(placeOrderCod())} style={{backgroundColor:cod?"#FFD700":""}}>Order Now</button>
                    </>
                    :
                    <></>
                }
            </div>

        </div>
    </div>
    </>
  )
}

export default CheckoutPage