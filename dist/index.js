"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const routes_1 = require("./App/Routes/routes");
const dotenv_1 = __importDefault(require("dotenv"));
const mongoose_1 = __importDefault(require("mongoose"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const port = process.env.PORT || 8000;
const mongoString = process.env.DATABASE_URL;
mongoose_1.default.connect(mongoString);
const db = mongoose_1.default.connection;
db.on('error', (error) => {
    console.log(error);
});
db.once('connected', () => {
    console.log('Database Connected');
});
/* routes */
//Post Method
routes_1.router.post('/post', (req, res) => {
    res.send('Post API');
});
//Get all Method
routes_1.router.get('/getAll', (req, res) => {
    res.send('Get All API');
});
//Get by ID Method
routes_1.router.get('/getOne/:id', (req, res) => {
    res.send('Get by ID API');
});
//Update by ID Method
routes_1.router.patch('/update/:id', (req, res) => {
    res.send('Update by ID API');
});
//Delete by ID Method
routes_1.router.delete('/delete/:id', (req, res) => {
    res.send('Delete by ID API');
});
app.use("/api");
// listens
app.listen(port, () => {
    console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});
