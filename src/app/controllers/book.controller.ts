import express, { Request, Response } from "express";
import { Book } from "../models/book.model";

export const bookRoutes = express.Router();

bookRoutes.post("/", async (req: Request, res: Response) => {
    try {
        const book = req.body;

        const available = Book.checkAvailability(book.copies);
        book.available = available;

        const data = await Book.create(book);

        res.status(201).send({
            success: true,
            message: "Book created successfully",
            data
        })
    } catch (error) {
        res.send({
            success: false,
            message: "Validation failed",
            error
        })
    }
});


// bookRoutes.get("/", async (req: Request, res: Response) => {
//     try {
        
//     } catch (error) {
//         res.send({
//             success: false,
//             message: "Validation failed",
//             error
//         })
//     }
// });