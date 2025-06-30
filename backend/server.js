import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import connectDB from './config/db.js';
import authRouter from './routes/authRoute.js';
import productRouter from './routes/productRoute.js';
import subcategoryRouter from './routes/subcategoryRoute.js';
import path from 'path';
import { fileURLToPath } from 'url';
import couponRouter from './routes/couponRoute.js';
import orderRouter from './routes/orderRoute.js';
import blogRouter from './routes/blogRoute.js';
import contactRouter from './routes/contactRoute.js';
import adminRouter from './routes/adminRoute.js';
import router from './routes/subscribeRoute.js';




const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


app.use(cors());
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));



connectDB();



app.use('/api/auth',authRouter)
app.use('/api/product',productRouter)
app.use('/api/subcategory',subcategoryRouter)
app.use('/api/coupon',couponRouter)
app.use('/api/order',orderRouter)
app.use('/api/blog',blogRouter);
app.use('/api/contact',contactRouter)
app.use('/api/admin',adminRouter);
app.use('/api',router)

const PORT = process.env.PORT || 2000;

app.get('/', (req, res) => {
  res.send('Hello World!');
});


app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});