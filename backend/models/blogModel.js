import mongoose from 'mongoose';

const blogSchema=new mongoose.Schema({
    blogImg: {
                url: String,
                originalname: String,
        },
    blogName:{type:String,required:true},
    blogDetail:{type:String,required:true},
    slug:{type:String,required:true},
    blogDate:{type:Date,default:Date.now},
})

const blogModel=mongoose.models.blog || mongoose.model('blog',blogSchema);
export default blogModel;


