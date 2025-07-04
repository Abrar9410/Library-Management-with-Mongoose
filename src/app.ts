import express, { Application, Request, Response } from "express";
import cors from "cors";
import { bookRoutes } from "./app/controllers/book.controller";
import { borrowRoutes } from "./app/controllers/borrow.controller";

const app: Application = express();

app.use(express.json());
app.use(cors({
    origin: ['http://localhost:5173', 'https://bookcrate-library-management.netlify.app'],
    credentials: true
}));

app.use("/api/books", bookRoutes);
app.use("/api/borrow", borrowRoutes);


app.get("/", async (req: Request, res: Response) => {
    res.send({status: true, message: "Library Management server running!"})
});

export default app;