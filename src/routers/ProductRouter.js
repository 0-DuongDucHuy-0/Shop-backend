const express = require("express");
const router = express.Router();
const productController = require("../controllers/ProductController");
const { authMiddleWare } = require("../middleware/auth");

router.post("/create", productController.createProduct);
router.put("/update/:id", authMiddleWare, productController.updateProduct);
// router.put("/update/:id", productController.updateProduct);
router.get("/details/:id", productController.getDetailsProduct);
router.delete("/delete/:id", authMiddleWare, productController.deleteProduct);
router.get("/get-all", productController.getAllProduct);
router.get("/get-all-type", productController.getAllType);

module.exports = router;
