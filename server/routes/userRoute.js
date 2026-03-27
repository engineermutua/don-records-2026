import express from 'express'
import upload from '../middleware/multer.js';
import { addToCart, artist, beat, blog, clearCart, contact, fetchArtists, fetchBeats, fetchBlogs, fetchMerchandise, fetchProducers, fetchProducts, fetchUsers, getCart, loginUser, merchandise, myOrders, placeOrder, producer, registerUser, searchBeat, subscribe, updateCart, updateProfile, user } from '../controllers/userController.js';
import authUser from '../middleware/auth.js';
import generateToken from '../middleware/mpesa.js';
import {handleSTKPush,callbackMpesa} from '../controllers/mpesaController.js';
import { paypalPayment, cancelPayment, handlePayment } from '../controllers/paypalController.js';

const userRouter=express.Router();


userRouter.post('/register',upload.fields([{name:'avatar',maxCount:1}]),registerUser);
userRouter.post('/login',loginUser);
userRouter.post('/update/:userId',upload.fields([{name:"avatar",maxCount:1}]),updateProfile);
userRouter.get('/merchandise',fetchMerchandise);
userRouter.post('/merchandise/:merchandiseId',merchandise);
userRouter.get('/beats',fetchBeats);
userRouter.post('/beat/:beatId',beat);
userRouter.get('/blogs',fetchBlogs);
userRouter.post('/blog/:blogId',blog);
userRouter.get('/artists',fetchArtists);
userRouter.post('/artist/:artistId',artist);
userRouter.get('/producers',fetchProducers);
userRouter.post('/producer/:producerId',producer);
userRouter.get('/users',fetchUsers);
userRouter.post('/user/:userId',user);
userRouter.post('/subscribe',subscribe);
userRouter.post('/search',searchBeat);
userRouter.post('/contact',contact);
userRouter.get('/products',fetchProducts);
//Cart
userRouter.post('/addToCart',authUser,addToCart);
userRouter.post('/updatecart',authUser,updateCart);
userRouter.post('/cart',authUser,getCart);
userRouter.post('/clear',authUser,clearCart);
//Orders
userRouter.post('/order',authUser,placeOrder);
userRouter.post('/orders',authUser,myOrders);
//mpesa
userRouter.post('/lipa',authUser,generateToken,handleSTKPush)
userRouter.post('/callback-mpesa',callbackMpesa)

//paypal
userRouter.post('/paypal',authUser,paypalPayment);
userRouter.get('/paypalSuccess',handlePayment);
userRouter.get('/paypalCancel',cancelPayment);


export default userRouter;