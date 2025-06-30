import express from 'express'
import { addblog, listblog, removeblog, updateblog, updatelistblog } from '../controllers/blogController.js';
import upload from '../middleware/multer.js';


const blogRouter=express.Router();

blogRouter.post('/addblog',upload.single("blogImg"),addblog);
blogRouter.get('/bloglist',listblog);
blogRouter.get('/:id',updatelistblog);
blogRouter.post('/removeblog',removeblog);
blogRouter.post('/:id',upload.single("blogImg"),updateblog)

export default blogRouter;