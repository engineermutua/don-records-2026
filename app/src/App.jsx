import React from 'react'
import {BrowserRouter, Route, Router, Routes} from 'react-router-dom'
import NavbarComponent from './components/NavbarComponent/NavbarComponent'
import FooterComponent from './components/FooterComponent/FooterComponent'
import {Toaster} from 'react-hot-toast'
import HeroComponent from './components/HeroComponent/HeroComponent'
import BeatsComponent from './components/BeatsComponent/BeatsComponent'
import MerchandiseComponent from './components/MerchandiseComponent/MerchandiseComponent'
import FeaturedArtistsComponents from './components/FeaturedArtistsComponents/FeaturedArtistsComponents'
import FeaturedProducersComponents from './components/FeaturedProducersComponents/FeaturedProducersComponents'
import FeaturedBlogsComponent from './components/FeaturedBlogsComponent/FeaturedBlogsComponent'
import AboveFooterComponent from './components/AboveFooterComponent/AboveFooterComponent'
import SingleBeatPage from './pages/SingleBeatPage/SingleBeatPage'
import SingleMerchandisePage from './pages/SingleMerchandisePage/SingleMerchandisePage'
import SingleArtistPage from './pages/SingleArtistPage/SingleArtistPage'
import SingleProducerPage from './pages/SingleProducerPage/SingleProducerPage'
import SingleBlogPage from './pages/SingleBlogPage/SingleBlogPage'
import ContactsPage from './pages/ContactsPage/ContactsPage'
//Map leaflet Configurations-React Leaflet
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';
import AuthPage from './pages/AuthPage/AuthPage'
import PortalPage from './pages/PortalPage/PortalPage'
import SearchedItemPage from './pages/SearchedItemPage/SearchedItemPage'
import ProfilePage from './pages/ProfilePage/ProfilePage'
import CartPage from './pages/CartPage/CartPage'
import CheckoutPage from './pages/CheckoutPage/CheckoutPage'
import OrderPage from './pages/OrderPage/OrderPage'
import NotificationsPage from './pages/NotificationsPage/NotificationsPage'


let DefaultIcon = L.icon({
    iconUrl: icon,
    shadowUrl: iconShadow,
    iconSize: [25, 41],
    iconAnchor: [12, 41]
});
L.Marker.prototype.options.icon = DefaultIcon;

const App = () => {
  return (
    <BrowserRouter>
    <NavbarComponent/>
    <Toaster/>
    <Routes>
      <Route path='/' element={
        <>
        <HeroComponent/>
        <BeatsComponent/>
        <MerchandiseComponent/>
        <FeaturedArtistsComponents/>
        <FeaturedProducersComponents/>
        <FeaturedBlogsComponent/>
        <AboveFooterComponent/>
        </>
      }>
      </Route>
      <Route path='/beat/:id' element={<SingleBeatPage/>}></Route>
      <Route path='/merchandise/:id' element={<SingleMerchandisePage/>}></Route>
      <Route path='/artist/:username' element={<SingleArtistPage/>}></Route>
      <Route path='/producer/:username' element={<SingleProducerPage/>}></Route>
      <Route path='/blog/:id' element={<SingleBlogPage/>} ></Route>
      <Route path='/contactUs' element={<ContactsPage/>}></Route>
      <Route path='/login' element={<AuthPage/>}></Route>
      <Route path='/portal' element={<PortalPage/>}></Route>
      <Route path='/searchResults/:search' element={<SearchedItemPage/>}></Route>
      <Route path='/profile' element={<ProfilePage/>}></Route>
      <Route path='/cart' element={<CartPage/>}></Route>
      <Route path='/checkout' element={<CheckoutPage/>}></Route>
      <Route path='/order' element={<OrderPage/>}></Route>
      <Route path='/notifications' element={<NotificationsPage/>}></Route>
      
    </Routes>
    <FooterComponent/>
    </BrowserRouter>
  )
}

export default App