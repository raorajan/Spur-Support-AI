import express, { Request, Response } from "express";


const app = express();
app.use("/", (req: Request, res: Response) => {
    res.send("Hello World !!")
})


export default app;