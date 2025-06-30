import contactModel from "../models/contactModel.js"


const addContact=async(req,res)=>{
      try {
        const contact=new contactModel(req.body);
        await contact.save();
        res.status(201).json({message:"Contact added successfully"});
      } catch (error) {
         console.log(error);
         res.status(500).json({message:"Error adding contact"});
      }
}


const listContact=async(req,res)=>{
    try {
        const contacts=await contactModel.find({}).sort({submittedAt:-1});
        res.status(200).json(contacts);
    } catch (error) {
        console.log(error);
        res.status(500).json({success:false,message:"Failed to fetch data"})
    }
}


const removeContact=async(req,res)=>{
    try {
        await contactModel.findByIdAndDelete(req.body.id);
        res.status(200).json({success:true,message:"Contact Removed"})
     } catch (error) {
         console.log(error)
        res.status(500).json({success:false,message:error.message})
    }
}

export {addContact,listContact,removeContact}