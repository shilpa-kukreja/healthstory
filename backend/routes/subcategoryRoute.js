import express from 'express'
import { addSubcategory, listSubcategory, removeSubcategory, updateSubcategory } from '../controllers/subcategoryController.js';



const subcategoryRouter=express.Router()

subcategoryRouter.post('/add',addSubcategory);
subcategoryRouter.get('/get',listSubcategory);
subcategoryRouter.post('/remove',removeSubcategory);
subcategoryRouter.put('/:id',updateSubcategory)


export default subcategoryRouter;