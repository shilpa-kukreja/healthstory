import mongoose from "mongoose";

const userSchema=new mongoose.Schema({
    email:{type:String,required:true,unique:true},
    mobile:{type:String ,required:true},
    name:{type:String},
    avatar:{type:String},
    provider:{type:String,default:'local'},
    cartData:{type:Object,default:{}},
    password:{type:String,default:''},
    resetPasswordToken: String,
    resetPasswordExpire: Date,

})

const userModel =mongoose.models.user || mongoose.model('user',userSchema);
export default userModel;