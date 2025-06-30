
import fs from 'fs';
import productModel from '../models/productModel.js';
import path from "path";
import mongoose from "mongoose";

// Add a product
const addProduct = async (req, res) => {
  try {
    const {
      name,
      slug,
      shortDescription,
      description,
      subcategory,
      sku,
      section,
      stock,
      productType,
      price,
      discountPrice,
      variant,
    } = req.body;

    const thumbImg = req.files['thumbImg']?.[0]?.filename;
    const galleryImg = req.files['galleryImg']?.map(file => file.filename);

    const newProduct = new productModel({
      name,
      slug,
      shortDescription,
      description,
      subcategory: typeof subcategory === 'string' ? JSON.parse(subcategory) : subcategory,
      sku,
      section,
      stock,
      productType,
      price,
      discountPrice,
      variant: typeof variant === 'string' ? JSON.parse(variant) : variant,
      thumbImg,
      galleryImg
    });

    await newProduct.save();
    res.status(201).json({ success: true, message: 'Product added successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Error adding product' });
  }
};

// List all products
const listProducts = async (req, res) => {
  try {
    const products = await productModel.find({});
    res.json({ success: true, products });
  } catch (error) {
    console.error(error);
    res.json({ success: false, message: 'Error fetching products' });
  }
};

// Remove a product
const removeProduct = async (req, res) => {
  try {
     const product = await productModel.findById(req.body.id);
    if (!product) return res.status(404).json({ error: "Product not found" });

    // Delete local image files
    const imagePaths = [product.thumbImg, ...product.galleryImg];
    imagePaths.forEach(img => {
      const filePath = path.join('uploads', img);
      if (fs.existsSync(filePath)) fs.unlinkSync(filePath);
    });
    await productModel.findByIdAndDelete(req.body.id);
    res.json({ success: true, message: 'Product removed successfully' });
  } catch (error) {
    console.error(error);
    res.json({ success: false, message: 'Error deleting product' });
  }
};

// Get a product by ID (for update form pre-fill)
const updatelistproduct = async (req, res) => {
  try {
    const product = await productModel.findById(req.params.id);
    if (!product) return res.status(404).json({ success: false, message: "Product not found" });

    res.json({ success: true, product });
  } catch (err) {
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// Update a product
const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ success: false, message: "Invalid product ID." });
    }

    const {
      name,
      slug,
      shortDescription,
      description,
      subcategory,
      sku,
      section,
      stock,
      productType,
      price,
      discountPrice,
      variant,
    } = req.body;

    const updateData = {
      name,
      slug,
      shortDescription,
      description,
      subcategory: typeof subcategory === 'string' ? JSON.parse(subcategory) : subcategory,
      sku,
      section,
      stock,
      productType,
      price,
      discountPrice,
      variant: typeof variant === 'string' ? JSON.parse(variant) : variant,
    };

    if (req.files['thumbImg']) {
      updateData.thumbImg = req.files['thumbImg'][0].filename;
    }

    if (req.files['galleryImg']) {
      updateData.galleryImg = req.files['galleryImg'].map(file => file.filename);
    }

    const updated = await productModel.findByIdAndUpdate(id, updateData, { new: true });
    if (!updated) {
      return res.status(404).json({ success: false, message: 'Product not found' });
    }

    res.json({ success: true, message: 'Product updated', product: updated });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Error updating product' });
  }
};

export { addProduct, listProducts, removeProduct, updateProduct, updatelistproduct };
