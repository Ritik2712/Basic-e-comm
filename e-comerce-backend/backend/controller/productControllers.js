const Product = require("../models/Product");

const getProducts = async (req, res) => {
  try {
    const products = await Product.find({});
    res.json(products);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};

const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    res.json(product);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};

const addProduct = async (req, res) => {
  const { name, description, price, countInStock, imageUrl } = req.body;
  try {
    await Product.create({
      ...req.body,
      price: parseInt(price),
      countInStock: parseInt(countInStock),
    });
    res.status(201).send("Product Added");
    return;
  } catch (err) {
    console.log("Error : ", err);
    res.status(500).json({ message: "Server Error" });
    return;
  }
};

module.exports = {
  getProducts,
  getProductById,
  addProduct,
};
