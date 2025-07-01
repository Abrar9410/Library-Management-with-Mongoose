import express, { Request, Response } from "express";
import { Borrow } from "../models/borrow.model";


export const borrowRoutes = express.Router();

// POST API
borrowRoutes.post("/", async (req: Request, res: Response) => {
    try {
        const borrow = req.body;
        const data = new Borrow(borrow);
        await data.save();

        res.status(200).send({
            success: true,
            message: "Book borrowed successfully",
            data
        })
    } catch (error: any) {
        res.status(400).send({
            success: false,
            message: "Book could not be borrowed!",
            error
        })        
    }
});


// GET API
borrowRoutes.get("/", async (req: Request, res: Response) => {
    try {
        const limit: number = parseInt(req.query.limit as string) || 10;
        const skip: number = parseInt(req.query.skip as string) || 0;
        const pipelines = [
            {
                $group: { _id: "$book", totalQuantity: { $sum: "$quantity" } }
            },
            {
                $lookup: {
                    from: "books",
                    localField: "_id",
                    foreignField: "_id",
                    as: "book"
                }
            },
            {
                $unwind: "$book"
            },
            {
                $project: {
                    _id: 0,
                    book: { title: "$book.title", isbn: "$book.isbn" },
                    totalQuantity: 1
                }
            }
        ];
        const data = await Borrow.aggregate(pipelines).skip(skip).limit(limit);

        res.status(200).send({
            success: true,
            message: "Borrowed books summary retrieved successfully",
            data
        });
    } catch (error) {
        res.status(404).send({
            success: false,
            message: "Borrowed books summary could not be retrieved!",
            error
        })
    }
});