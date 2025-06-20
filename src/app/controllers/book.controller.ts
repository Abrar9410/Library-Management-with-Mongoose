import express, { Request, Response } from "express";
import { Book } from "../models/book.model";
import { Ibook } from "../interfaces/book.interface";

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


bookRoutes.get("/", async (req: Request, res: Response) => {
    try {
        const filterBy: string = req.query.filter as string;
        const sortBy: keyof Ibook | "createdAt" | "updatedAt" = req.query.sortBy as keyof Ibook | "createdAt" | "updatedAt"
        const sort: "asc" | "desc" = req.query.sort as "asc" | "desc" || "asc";
        const limit: number = parseInt(req.query.limit as string) || 10;

        let filter: object = {};

        if (filterBy) {
            filter = {genre: filterBy};
        };

        const data = await Book.find(filter).sort([[`${sortBy || "_id"}`, `${sort}`]]).limit(limit);

        res.send({
            success: true,
            message: "Books retrieved successfully",
            data
        });
    } catch (error) {
        res.send({
            success: false,
            message: "Validation failed",
            error
        })
    }
});