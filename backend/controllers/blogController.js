import blogModel from "../models/blogModel.js";
import fs from 'fs';
import path from 'path';




const addblog=async(req,res)=>{
    try {
    const {blogName,blogDetail,blogDate,slug}=req.body;
    const imageFile=req.file;
    if (!imageFile) {
        return res.status(400).json({success:false,message:"Image File is Required"})
    }

    const blogData={
          blogName,
          blogDetail,
          blogDate,
          slug,
          blogImg: {
          url: `/uploads/${imageFile.filename}`,
          originalname: imageFile.originalname,
      },
    }

  const blog=new blogModel(blogData)
  await blog.save();
  res.status(201).json({success:true,message:"Blog Added Successfully"})
  } catch (error) {
        console.log(error);
        res.json({success:false,message:error.message})
    }

}



const listblog=async(req,res)=>{
     try {
    const blogs=await blogModel.find({});
    res.json({success:true,blogs});
    } catch (error) {
        console.log(error);
        res.json({success:false,message:error.message});
    }
}


const updatelistblog=async(req,res)=>{
     try {
    
    const blog = await blogModel.findById(req.params.id);
    if (!blog) return res.status(404).json({ success: false, message: "Not found" });

    res.json({ success: true, blog });
  } catch (err) {
    res.status(500).json({ success: false, message: "Server error" });
  }
}

const removeblog=async(req,res)=>{
     try {
   const blog = await blogModel.findById(req.body.id);
    if (!blog) {
      return res.status(404).json({ success: false, message: "Blog not found" });
    }

    // Delete image file from server
    if (blog.blogImg?.url) {
      const filePath = path.join('uploads', path.basename(blog.blogImg.url));
      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
      }
    }
        await blogModel.findByIdAndDelete(req.body.id);
        res.json({success:true,message:"Blog Removed"})
    } catch (error) {
        console.log(error);
        res.json({success:false,message:error.message});
    }
}


const updateblog=async(req,res)=>{
     try {
        const { blogName, blogDetail, blogDate ,slug} = req.body;

        const blogData = {
            blogName,
            blogDetail,
            blogDate,
            slug,
        };

        if (req.file) {
            const imageUpload = await cloudinary.uploader.upload(req.file.path, { resource_type: "image" });
            blogData.blogImg = imageUpload.secure_url;
        }

        const blogUpdate = await blogModel.findByIdAndUpdate(req.params.id, blogData, { new: true });

        if (!blogUpdate) return res.status(404).json({ success: false, message: "Blog not found" });

        res.json({ success: true, message: "Blog updated", blog: blogUpdate });

    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: error.message });
    }
}

export {addblog,listblog,updateblog,removeblog,updatelistblog};