import { model, Schema } from "mongoose";


const bookSchema = new Schema<Ibook>(
    {
        title: {
            type: String,
            required: [true, "Book Title is required!"],
            trim: true
        },
        author: {
            type: String,
            required: [true, "Author's name is not provided!"],
            trim: true
        },
        genre: {
            type: String,
            enum: {
                values: ['FICTION', 'NON_FICTION', 'SCIENCE', 'HISTORY', 'BIOGRAPHY', 'FANTASY'],
                message: "{VALUE} is not acceptable!"
            },
            required: [true, "Genre is not provided!"],
        },
        isbn: {
            type: String,
            required: [true, "The ISBN of the book is not given!"],
            unique: [true, "The book of this ISBN already exists!"],
            trim: true
        },
        description: { type: String, trim: true },
        copies: {
            type: Number,
            required: [true, "Number of copies available of this book is not mentioned!"],
            min: [0, "Copies must be a positive number"]
        },
        available: {
            type: Boolean,
            default: true,
        }
    },
    {
        versionKey: false,
        timestamps: true
    }
);

export const Book = model<Ibook>("books", bookSchema);