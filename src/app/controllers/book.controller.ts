import express, { Request, Response } from "express";
import { Book } from "../models/book.model";
import { Ibook } from "../interfaces/book.interface";

export const bookRoutes = express.Router();

// POST API
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


// GET APIs
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
            message: "Books could not be retrieved!",
            error
        })
    }
});


bookRoutes.get("/:bookId", async (req: Request, res: Response) => {
    try {
        const bookId: string = req.params.bookId;
        
        const data = await Book.findById(bookId);

        res.send({
            success: true,
            message: "Book retrieved successfully",
            data
        })
    } catch (error) {
        res.send({
            success: false,
            message: "Book could not be retrieved!",
            error
        })
    }
});


// PUT API
bookRoutes.put("/:bookId", async (req: Request, res: Response) => {
    try {
        const bookId: string = req.params.bookId;
        const body = req.body;

        const data = await Book.findByIdAndUpdate(bookId, body, {new: true, runValidators: true});

        res.send({
            success: true,
            message: "Book updated successfully",
            data
        })
    } catch (error) {
        res.send({
            success: false,
            message: "Book could not be updated!",
            error
        })
    }
})