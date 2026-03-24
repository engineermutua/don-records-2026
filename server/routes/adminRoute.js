import express from 'express'
import { addBeat, addBlog, addMerchandise, adminLogin, deleteBeat, deleteBlog, deleteMerchandise, deleteUser, featureUser, fetchOrders, getBeats, getBlogs, getMerchandise, getProduct, updateMerchandise, updateOrderStatus, validateUser } from '../controllers/adminController.js';
import upload from '../middleware/multer.js';
import adminAuth from '../middleware/adminAuth.js';
import { deleteOrder } from '../controllers/userController.js';

const adminRouter=express.Router();

adminRouter.post('/addMerchandise',upload.fields([{name:"image1",maxCount:1},{name:"image2",maxCount:2}]),addMerchandise);
adminRouter.post('/addBeat',upload.fields([{name:"thumbnail",maxCount:1},{name:"audio",maxCount:2}]),addBeat);
adminRouter.post('/addBlog',upload.fields([{name:"image",maxCount:1}]),addBlog);
adminRouter.post('/login',adminLogin);
adminRouter.post('/deleteMerchandise/:merchandiseId',deleteMerchandise);
adminRouter.post('/updateMerchandise/:merchandiseId',adminAuth,updateMerchandise)
adminRouter.post('/deleteBeat/:beatId',deleteBeat);
adminRouter.post('/deleteBlog/:blogId',deleteBlog);
adminRouter.post('/deleteUser/:userId',deleteUser);
adminRouter.post('/validateUser/:userId',validateUser);
adminRouter.post('/feature/:userId',featureUser);
adminRouter.get('/orders',fetchOrders);
adminRouter.post('/updateStatus/:orderId',updateOrderStatus);
adminRouter.post('/deleteOrder/:orderId',deleteOrder);
adminRouter.post('/product/:productId',getProduct);
adminRouter.get('/beats',getBeats);
adminRouter.get('/blogs',getBlogs);
adminRouter.get('/merchandise',getMerchandise);


export default adminRouter;