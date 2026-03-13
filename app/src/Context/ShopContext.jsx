import { createContext, useEffect, useState } from "react";
import {toast} from 'react-hot-toast'
import axios from 'axios'


export const ShopContext=createContext();

const ShopContextProvider=(props)=>{
    const username="the_don";
    const currency="kes";

    const [token, setToken]=useState(false);

    const [userId,setUserId]=useState("");

    const [pic,setPic]=useState(false);

    const [user,setUser]=useState(false);



    const [count,setCount]=useState(0);

    const backend_url=import.meta.env.VITE_BACKEND_URL;
    

    const addToCart=async(productId)=>{
        try {
            if(productId){
                setCount(count+1);
            }else{
                toast.error('Failed to add Product')
            }
        } catch (error) {
            toast.error(error);
        }
    }

    useEffect(()=>{
        const fetchToken=async()=>{
            try {
                const resp=await localStorage.getItem("token");
                if(resp){
                    setToken(resp);
                }else{
                    toast.error('Login to update profile.')
                }
            } catch (error) {
                toast.error(error)
            }
        }
        fetchToken();
    },[token]);

    useEffect(()=>{
        const fetchUser=async()=>{
            try {
                const resp=await localStorage.getItem("user");
                if(resp){
                    setUserId(resp)
                    const response=await axios.post(`${backend_url}/api/user/user/${resp}`);
                    setPic(response.data.user.avatar);                    
                    setUser(response.data.user.username);
                }else{
                    toast.error("login to update profile")
                }
                
            } catch (error) {
                toast.error(error)
            }
        }
        fetchUser();
    },[userId,pic,backend_url])

    const value={
        username,
        currency,
        addToCart,
        count,
        setCount,
        token,
        setToken,
        backend_url,
        setUserId,
        userId,
        setPic,
        pic,
        setUser,
        user
    };

    

return (
    <ShopContext.Provider value={value}>{props.children}</ShopContext.Provider>
);
};

export default ShopContextProvider;

