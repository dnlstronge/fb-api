import express, { Express, Request, Response, } from 'express';
import { router } from "./src/Routes/routes"
import http from "http"
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

const mongoURL = process.env.DATABASE_URL

// server

const server = http.createServer(app)
server.listen(8000, () => {
  console.log(`Listening on http://localhost:8000/`)
})

mongoose.Promise = Promise;
mongoose.connect(mongoURL!)
mongoose.connection.on("error", (error: Error) => {
    console.log(error)
})