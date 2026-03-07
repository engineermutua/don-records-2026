import { createContext, useEffect, useState } from "react";
import {toast} from 'react-hot-toast'


export const ShopContext=createContext();

const ShopContextProvider=(props)=>{
    const username="the_don";
    const currency="kes";

    const [count,setCount]=useState(0);
    

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

    const value={
        username,
        currency,
        addToCart,
        count,
        setCount,
    };

return (
    <ShopContext.Provider value={value}>{props.children}</ShopContext.Provider>
);
};

export default ShopContextProvider;

