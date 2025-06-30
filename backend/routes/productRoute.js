import express from 'express'
import { addProduct,  listProducts, removeProduct, updatelistproduct, updateProduct } from '../controllers/productController.js';
import fs from "fs";
import multer from "multer";


const productRouter = express.Router();

const ensureDir = (dir) => {
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
};


const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    let folder = "uploads/";
    if (file.fieldname === "thumbImg") folder += "thumbImg/";
    if (file.fieldname === "galleryImg") folder += "galleryImg/";
    ensureDir(folder);
    cb(null, folder);
  },
  filename: (req, file, cb) => {
    const uniqueName = Date.now() + "-" + file.originalname.replace(/\s+/g, '_');
    cb(null, uniqueName);
  }
});

const upload = multer({ storage });

productRouter.post('/add', upload.fields([{ name: 'thumbImg', maxCount: 1 }, { name: 'galleryImg', maxCount: 10 }]), addProduct);
productRouter.get('/list', listProducts);
productRouter.get('/:id', updatelistproduct);
productRouter.post('/remove', removeProduct);
productRouter.post('/:id',upload.fields([{ name: 'thumbImg', maxCount: 1 }, { name: 'galleryImg', maxCount: 10 }]), updateProduct);

export default productRouter;
