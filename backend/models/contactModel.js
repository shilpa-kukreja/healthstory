import mongoose from "mongoose";

const contactSchema=new mongoose.Schema({
     firstname:{type:String,required:true},
     lastname:{type:String,required:true},
     phonenumber:{type:Number,required:true},
     email:{type:String,required:true},
     message:{type:String,required:true},
     submittedAt:{type:Date,default:Date.now}
})

const contactModel=mongoose.models.Contact || mongoose.model("Contact",contactSchema);
export default contactModel;