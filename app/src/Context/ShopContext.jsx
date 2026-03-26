import { createContext, useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import axios from "axios";

export const ShopContext = createContext();

const ShopContextProvider = (props) => {
  const username = "the_don";
  const currency = "kes";

  const [token, setToken] = useState("");

  const [userId, setUserId] = useState("");

  const [pic, setPic] = useState(false);

  const [user, setUser] = useState(false);

  const [searched, setSearched] = useState([]);

  const [cartItems, setCartItems] = useState({});
  const [products,setProducts]=useState([]);

  const [loading,setLoading]=useState(false);

  const backend_url = import.meta.env.VITE_BACKEND_URL;

  const addToCart = async (productId) => {
    let cartData = structuredClone(cartItems);
    if (cartData[productId]) {
      cartData[productId] += 1;
    } else {
      cartData[productId] = {};
      cartData[productId] = 1;
    }
    setCartItems(cartData);
    if (token) {
      try {
        await axios.post(`${backend_url}/api/user/addToCart`,{productId},{headers:{token}},);
        toast.success("Item added to cart successfully");
      } catch (error) {
        console.log(error);
      }
    }
  };

  const getCartCount=()=>{
    let totalCount=0;

    if(!cartItems || typeof cartItems !=="object"){
      return 0;
    }
    for(const productId in cartItems){
      try {
        if(cartItems[productId]>0){
          totalCount+=cartItems[productId];
        }
      } catch (error) {
        console.log(error);
        
      }
    }
    return totalCount;
    
  }

  useEffect(()=>{},[cartItems]);

  const updateQuantity=async(productId,quantity)=>{
    let cartData=structuredClone(cartItems);
    cartData[productId]=quantity;

    setCartItems(cartData);

    if(token){
      try {
        await axios.post(`${backend_url}/api/user/updateCart`,{productId,quantity},{headers:{token}},);

      } catch (error) {
        console.log(error);
        
      }
    }
  }

  const getCartAmount = () => {
    let totalAmount = 0;
    if(products){
      for(const productId in cartItems){
      const itemInfo=(products.merchandise?.find((product)=>product._id===productId) || products.beats?.find((product)=>product._id===productId));
      
      if(itemInfo && cartItems[productId]>0){
        totalAmount+=itemInfo.price * cartItems[productId];        
      }
    }
    }
    return totalAmount;
    
  };


  const myCart=async(token)=>{
    try {
      const response=await axios.post(`${backend_url}/api/user/cart`,{},{headers:{token}},);
      if(response.data.success){
        setCartItems(response.data.cartData);
      }else{
        console.log(response.data.message);
      }

    } catch (error) {
      console.log(error);
      
    }
  }

  useEffect(()=>{
    if(token){
      myCart(token);
    }
  },[token])

  

  useEffect(() => {
    const fetchToken = async () => {
      try {
        if(!token){
            const storedToken=localStorage.getItem("token");
            if(storedToken){
                setToken(storedToken);
            }else{
                console.log("Could not set token");   
            }
        }
      } catch (error) {
        console.log(error);
      }
    };
    
    
    fetchToken();
  }, []);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const resp = await localStorage.getItem("user");
        if (resp) {
          setUserId(resp);
          const response = await axios.post(
            `${backend_url}/api/user/user/${resp}`,
          );          
          setPic(response.data.user.avatar);
          setUser(response.data.user.username);
        } else {
          toast.error("login to update profile");
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchUser();
  }, [userId, pic, backend_url]);

  useEffect(()=>{
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
  },[])

  const value = {
    username,
    currency,
    addToCart,
    token,
    setToken,
    backend_url,
    setUserId,
    userId,
    setPic,
    pic,
    setUser,
    user,
    searched,
    setSearched,
    getCartCount,
    updateQuantity,
    getCartAmount,
    myCart,
    products,
    setCartItems,
    cartItems,
    loading,
    setLoading
  };

  return (
    <ShopContext.Provider value={value}>{props.children}</ShopContext.Provider>
  );
};

export default ShopContextProvider;
