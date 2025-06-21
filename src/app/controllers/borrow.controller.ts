import express, { Request, Response } from "express";
import { Borrow } from "../models/borrow.model";


export const borrowRoutes = express.Router();

// POST API
borrowRoutes.post("/", async (req: Request, res: Response) => {
    try {
        const borrow = req.body;
        const data = new Borrow(borrow);
        await data.save();

        res.send({
            success: true,
            message: "Book borrowed successfully",
            data
        })
    } catch (error: any) {
        res.send({
            success: false,
            message: "Book could not be borrowed!",
            error
        })        
    }
})