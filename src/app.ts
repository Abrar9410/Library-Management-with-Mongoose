import express, { Application, Request, Response } from "express";
import cors from "cors";
import { bookRoutes } from "./app/controllers/book.controller";

const app: Application = express();

app.use(express.json());
app.use(cors());

app.use("/api/books", bookRoutes);
// app.use("/api/books", bookRoutes);


app.get("/", async (req: Request, res: Response) => {
    res.send({status: true, message: "Library Management server running!"})
});

export default app;