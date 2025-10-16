import express from "express";
import helmet from "helmet";
import morgan from "morgan";
import cors from "cors";
import dotenv from "dotenv";

import {sql} from './config/db.js';

import productRoutes  from "./routers/productRoutes.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 9000;

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use(cors());
app.use(helmet()); //Helmet.js is a Node.js module that helps in securing HTTP headers. It is implemented in express applications. Therefore, we can say that helmet.js helps in securing express applications.
app.use(morgan("dev"));

// app.get("/",(req,res)=>{
//     res.send("Hello From Backend");
// });

// app.get("/api/products",(req,res)=>{
//     res.send("GET api/products success");
// });

app.use("/api/products",productRoutes);

async function initDB() {
    try{
        const response = await sql`
            CREATE TABLE IF NOT EXISTS products (
                id SERIAL PRIMARY KEY,
                name VARCHAR(255) NOT NULL,
                image VARCHAR(255) NOT NULL,
                price DECIMAL(10,2) NOT NULL,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP 
            );
        `
    }
    catch(error){
        console.log('Error initDB',error);
    }
}

initDB().then(()=>{
    app.listen(PORT,()=>console.log(`Server Started at PORT ${PORT}`));
});