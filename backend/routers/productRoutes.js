import express from "express";
import {getAllProducts, getSpecificProduct, getSomeProducts, createProduct, deleteProduct, patchProduct} from "../controllers/productControllers.js";

// localhost:port/api/products
const router = express.Router();

router.get("/",getAllProducts);

router.get("/:id",getSpecificProduct);

router.get("/filter",getSomeProducts);

router.post("/",createProduct);

router.patch(":/id",patchProduct);

router.delete(":/id",deleteProduct);

export default router;