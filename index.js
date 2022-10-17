import express, { json } from "express";
import cors from "cors";
import dotenv from "dotenv";
import userRouter from "./routers/userRouter.js";
import urlRouter from "./routers/urlRouter.js";

dotenv.config();

const PORT =process.env.PORT||5000;
const app = express();
app.use(cors());
app.use(json());

app.use(userRouter);
app.use(urlRouter);


app.listen(PORT,()=>console.log(`"servidor rodando na porta ${PORT}`));