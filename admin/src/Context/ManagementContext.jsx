import { createContext, useEffect, useState } from "react";


export const ManagementContext=createContext();

const ManagementContextProvider=(props)=>{
    const username="the_don";
    const [token, setToken]=useState("");

    const frontend_url=import.meta.env.VITE_FRONTEND_URL;
    const backend_url=import.meta.env.VITE_BACKEND_URL;

    useEffect(()=>{
        setToken(localStorage.getItem("token"));
    },[token])
    

    const value={
        username,
        setToken,
        token,
        frontend_url,
        backend_url
    };

return (
    <ManagementContext.Provider value={value}>{props.children}</ManagementContext.Provider>
);
};

export default ManagementContextProvider;

