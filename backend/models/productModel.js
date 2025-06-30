import mongoose from "mongoose";

const productSchema=new mongoose.Schema({
      name:{type:String,required:true},
      slug:{type:String,required:true},
      shortDescription:{type:String,required:true},
      description:{type:String,required:true},
      thumbImg:{type:String,required:true},
      galleryImg:{type:Array,required:true},
      subcategory:{type:Array,required:true},
      sku:{type:String,required:true},
      section:{type:String,required:true},
      stock:{type:Number,required:true},
      productType:{type:String,required:true},
      price: { type: Number ,required:true},
      discountPrice: { type: Number,required:true },
      variant: [
        {
          size: { type: String },
          price: { type: Number },
          discountPrice: { type: Number },
        },
      ],
})

const productModel=mongoose.models.product || mongoose.model('product',productSchema)
export default productModel;
