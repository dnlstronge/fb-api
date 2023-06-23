import express, { Express, Request, Response } from 'express';
import { router } from "./App/Routes/routes"
import cors from "cors"

import dotenv from 'dotenv';
import mongoose from 'mongoose';
import compression from 'compression';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';

dotenv.config();
const app = express()
app.use(cors({credentials: true}))

app.use(compression())
app.use(cookieParser())
app.use(bodyParser.json())


// listens
app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});