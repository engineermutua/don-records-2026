import React, { useContext } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import NavbarComponent from "./components/NavbarComponent/NavbarComponent";
import LoginPage from "./pages/LoginPage/LoginPage";
import FooterComponent from "./components/FooterComponent/FooterComponent";
import {Toaster} from 'react-hot-toast'
import DashboardPage from "./pages/DashboardPage/DashboardPage";
import ProfilePage from "./pages/ProfilePage/ProfilePage";
import MerchandisePage from "./pages/MerchandisePage/MerchandisePage";
import BeatsPage from "./pages/BeatsPage/BeatsPage";
import UsersPage from "./pages/UsersPage/UsersPage";
import OrdersPage from "./pages/OrdersPage/OrdersPage";
import RevenuePage from "./pages/RevenuePage/RevenuePage";
import {ManagementContext} from './Context/ManagementContext.jsx'
import BlogsPage from "./pages/BlogsPage/BlogsPage.jsx";

const App = () => {
  const {token}=useContext(ManagementContext)
  return(
  <>
  {
    token
    ?
    <BrowserRouter>
    <Toaster/>
    <NavbarComponent />
    <Routes>
      <Route path="/" element={<DashboardPage/>}></Route>
      <Route path="/profile" element={<ProfilePage/>}></Route>
      <Route path="/merchandise" element={<MerchandisePage/>}></Route>
      <Route path="/beats" element={<BeatsPage/>}></Route>
      <Route path="/blogs" element={<BlogsPage/>}></Route>
      <Route path="/users" element={<UsersPage/>}></Route>
      <Route path="/orders" element={<OrdersPage/>}></Route>
      <Route path="/revenue" element={<RevenuePage/>}></Route>
    </Routes>
   
  </BrowserRouter>
    :
    <>
    <LoginPage/>
    </>
  }
  </>
  );
};

export default App;
