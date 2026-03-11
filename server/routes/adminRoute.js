import express from 'express'
import { addBeat, addBlog, addMerchandise, adminLogin, deleteMerchandise, updateMerchandise } from '../controllers/adminController.js';
import upload from '../middleware/multer.js';

const adminRouter=express.Router();

adminRouter.post('/addMerchandise',upload.fields([{name:"image1",maxCount:1},{name:"image2",maxCount:2}]),addMerchandise);
adminRouter.post('/addBeat',upload.fields([{name:"thumbnail",maxCount:1},{name:"audio",maxCount:2}]),addBeat);
adminRouter.post('/addBlog',upload.fields([{name:"image",maxCount:1}]),addBlog);
adminRouter.post('/login',adminLogin);
adminRouter.post('/deleteMerchandise/:merchandiseId',deleteMerchandise);
adminRouter.post('/updateMerchandise/:merchandiseId',updateMerchandise)


export default adminRouter;