import { sql } from "../config/db.js";

export const getAllProducts = async (req,res)=>{
    try{
        const response = await sql`
            SELECT * FROM products
            RETURNING *
        `;
        res.status(200).json({
            success: true,
            data : response[0]
        })
    }
    catch(error){
        console.log(error);
        res.status(500).json({success: false, message: "Internal Server Error"});
    }
};

export const getSpecificProduct = async (req,res)=>{
    try{
        const id = Number(req.params.id);
        const response = await sql`
            SELECT * FROM products
            WHERE id=${id}
            RETURNING *
        `;
        res.status(200).json({status: true, data: response[0]});
    }
    catch(error){
        console.log(error);
        res.status(500).json({success: false, message: "Internal Server Error"});
    }
};

export const getSomeProducts = async (req,res)=>{
    try{
        const response = await sql`
            SELECT * FROM products 
            WHERE price<=500
            ORDER BY price
            RETURNING *
        `;
        res.status(200).json({status: true,data: response[0]});
    }
    catch(error){
        console.log(error);
        res.status(500).json({success: false, message: "Internal Server Error"});
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
                VALUES(${name},${image},${price})
                RETURNING *
        `;
        return res.status(201).json({status: true,data: response[0]});
    }
    catch(error){
        console.log(error);
        return res.status(500).json({success: false, message: "Internal Server Error"});
    }
};

export const deleteProduct = async (req,res)=>{
    try{
        const id = Number(req.params.id);
        const response = await sql`
            DELETE FROM products 
                WHERE id=${id}
                RETURNING *
        `;
        if(response.length === 0){
            return res.status(404).json({success: false, message: "Product Not Found"});
        }
        return res.status(200).json({status: true,data: response[0]});
    }
    catch(error){
        console.log(error);
        res.status(500).json({success: false, message: "Internal Server Error"});
    }
}

export const patchProduct = async (req,res)=>{
    try{
        const id = Number(req.params.id);
        
        const {name, image, price} = req.body;

        if(!name && !image && !price){
            return res.status(400).json({success: false,message: "Bad Request"});
        }

        const updateString = "";
        if(name) updateString += `name=${name}`;
        if(image) updateString += `, image=${image}`;
        if(price) updateString += `, price=${price}`;

        const response = await sql`
            UPDATE products
            SET ${updateString}
            WHERE id=${id}
            RETURNING *
        `;

        if(response.length===0){
            return res.status(404).json({success: false, message: "Product Not Found"});
        }
        return res.status(200).json({status: true,data: response[0]});
    }
    catch(err){
        console.log(err);
        res.status(500).json({success: false, message: "Internal Server Error"});
    }
}