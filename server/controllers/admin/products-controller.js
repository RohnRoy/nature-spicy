const { ImageUploadUtil } = require("../../helpers/cloudinary");
const Product = require("../../models/Product");

const handleImageUpload = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ success: false, message: "No file uploaded" });
    }
    const b64 = Buffer.from(req.file.buffer).toString("base64");
    const url = "data:" + req.file.mimetype + ";base64," + b64;
    const result = await ImageUploadUtil(url);

    res.json({
      success: true,
      result,
    });
  } catch (error) {
    console.error("Error in handleImageUpload:", error);
    res.json({
      success: false,
      message: "Error occurred",
    });
  }
};

const addProduct = async (req, res) => {
  try {
    const { image, title, description, category, brand, price, salePrice, totalStock } = req.body;

    if (!title || !price) {
      return res.status(400).json({ success: false, message: "Title and Price are required" });
    }

    const newlyCreatedProduct = new Product({
      image,
      title,
      description,
      category,
      brand,
      price,
      salePrice,
      totalStock,
    });
    await newlyCreatedProduct.save();
    res.status(200).json({
      success: true,
      data: newlyCreatedProduct,
    });
  } catch (e) {
    console.error("Error in addProduct:", e);
    res.status(500).json({
      success: false,
      message: "Error occurred",
    });
  }
};

const fetchAllProducts = async (req, res) => {
  try {
    const listOfProducts = await Product.find({});
    res.status(200).json({
      success: true,
      data: listOfProducts,
    });
  } catch (e) {
    console.error("Error in fetchAllProducts:", e);
    res.status(500).json({
      success: false,
      message: "Error occurred",
    });
  }
};

const editProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const { image, title, description, category, brand, price, salePrice, totalStock } = req.body;

    const findProduct = await Product.findById(id);
    if (!findProduct) {
      return res.status(404).json({
        success: false,
        message: "Product not Found",
      });
    }

    findProduct.title = title || findProduct.title;
    findProduct.description = description || findProduct.description;
    findProduct.category = category || findProduct.category;
    findProduct.brand = brand || findProduct.brand;
    findProduct.price = price || findProduct.price;
    findProduct.salePrice = salePrice || findProduct.salePrice;
    findProduct.totalStock = totalStock || findProduct.totalStock;
    findProduct.image = image || findProduct.image;

    await findProduct.save();
    res.status(200).json({
      success: true,
      data: findProduct,
    });
  } catch (e) {
    console.error("Error in editProduct:", e);
    res.status(500).json({
      success: false,
      message: "Error occurred",
    });
  }
};

const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findByIdAndDelete(id);
    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not Found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Product deleted successfully",
    });
  } catch (e) {
    console.error("Error in deleteProduct:", e);
    res.status(500).json({
      success: false,
      message: "Error occurred",
    });
  }
};

module.exports = {
  handleImageUpload,
  addProduct,
  fetchAllProducts,
  editProduct,
  deleteProduct,
};
