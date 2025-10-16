import { sql } from "../config/db.js";

export const getAllProducts = async (req,res)=>{
    try{
        const response = await sql`
            SELECT * FROM products;
        `;
        res.json(response)
    }
    catch(error){
        console.log(error);
        res.status(500).send("Error");
    }
};

export const getSpecificProduct = async (req,res)=>{
    try{
        const id = Number(req.params.id);
        const response = await sql`
            SELECT * FROM products
            WHERE id=${id};
        `;
        res.json(response);
    }
    catch(error){
        console.log(error);
        res.status(500).send("Error!!");
    }
};

export const getSomeProducts = async (req,res)=>{
    try{
        const response = await sql`
            SELECT * FROM products 
            WHERE price<=500
            ORDER BY price;
        `;
        res.json(response);
    }
    catch(error){
        console.log(error);
        res.status(500).send("Error");
    }
};

export const createProduct = async (req,res)=>{
    try{
        const name = req.body.name;
        const image = req.body.image;
        const price = Number(req.body.price);
        
        if(!name || !image || !price){
            return res.status(400).send("All fields are required");
        }

        const response = await sql`
            INSERT INTO products(name,image,price)
                VALUES(${name},${image},${price});
        `;
        res.json(response);
    }
    catch(error){
        console.log(error);
        res.status(500).send("Error");
    }
};

export const deleteProduct = async (req,res)=>{
    try{
        const id = Number(req.params.id);

        const response = await sql`
            DELETE FROM products 
                WHERE id==${id};
        `;
        res.json(response);
    }
    catch(error){
        console.log(error);
        res.status(500).send("Error!!");
    }
}

export const patchProduct = async (req,res)=>{
    try{
        const id = Number(req.body.id);
        
    }
    catch(err){
        console.log(err);
        res.status(500).send("Error!!");
    }
}