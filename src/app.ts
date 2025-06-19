import express, { Application, Request, Response } from "express";
import cors from "cors";

const app: Application = express();

app.use(express.json());
app.use(cors());


app.get("/", async (req: Request, res: Response) => {
    res.send({status: true, message: "Library Management server running!"})
});

export default app;