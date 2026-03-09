import { createContext, useState } from "react";


export const ManagementContext=createContext();

const ManagementContextProvider=(props)=>{
    const username="the_don";
    const [token, setToken]=useState(true)

    const frontend_url=import.meta.env.VITE_FRONTEND_URL;
    

    const value={
        username,
        setToken,
        token,
        frontend_url
    };

return (
    <ManagementContext.Provider value={value}>{props.children}</ManagementContext.Provider>
);
};

export default ManagementContextProvider;

