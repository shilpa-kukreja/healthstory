import mongoose from "mongoose";

const subcategorySchema=new mongoose.Schema({
    name:{type:String,required:true},
    slug:{type:String,required:true},
    category:{type:String,required:true}
})

const subcategoryModel=mongoose.models.subcategory || mongoose.model('subcategory',subcategorySchema);
export default subcategoryModel;