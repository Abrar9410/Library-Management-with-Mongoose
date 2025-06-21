import { model, Schema } from "mongoose";
import { Iborrow } from "../interfaces/borrow.interface";
import { Book } from "./book.model";


const borrowSchema = new Schema<Iborrow>(
    {
        book: {
            type: Schema.Types.ObjectId,
            ref: "books",
            required: [true, "Book ID is not provided!"],
        },
        quantity: {
            type: Number,
            required: [true, "Quantity is not mentioned!"],
            min: [1, "At least 1 copy must be borrowed"]
        },
        dueDate: {
            type: Date,
            required: [true, "Due Date of returning the book is not provided!"],
            default: () => {
                const date = new Date();
                date.setMonth(date.getMonth() + 1);
                date.setHours(0, 0, 0, 0);
                return date;
              }
        }
    },
    {
        versionKey: false,
        timestamps: true
    }
);

borrowSchema.pre("save", async function(next) {
    const book = await Book.findById(this.book);
    if (!book || !book.available || book.copies <= 0 || book.copies < this.quantity) {
        return next(new Error(`Not enough copies are available! Only ${book?.copies} left.`));
    };
    next();
});

borrowSchema.post("save", async function(doc, next) {
    const book = await Book.findById(doc.book);
    const availableCopies = book!.copies - doc.quantity;
    const available = Book.checkAvailability(availableCopies);
    const updateBook = {
        copies: availableCopies,
        available
    };

    await Book.findByIdAndUpdate(doc.book, updateBook);
    next();
})

export const Borrow = model<Iborrow>("borrow", borrowSchema);