import express from 'express'
import upload from '../middleware/multer.js';
import { fetchArtists, fetchBeats, fetchBlogs, fetchMerchandise, fetchProducers, fetchUsers, loginUser, registerUser, subscribe } from '../controllers/userController.js';

const userRouter=express.Router();


userRouter.post('/register',upload.fields([{name:'avatar',maxCount:1}]),registerUser);
userRouter.post('/login',loginUser);
userRouter.get('/merchandise',fetchMerchandise);
userRouter.get('/beats',fetchBeats);
userRouter.get('/blogs',fetchBlogs);
userRouter.get('/artists',fetchArtists);
userRouter.get('/producers',fetchProducers);
userRouter.get('/users',fetchUsers);
userRouter.post('/subscribe',subscribe)


export default userRouter;