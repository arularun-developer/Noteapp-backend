import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import { databaseConnection } from './db.js';
import { UserRouter } from './router/userroute.js';
import { NoteRouter } from './router/noteroute.js';
import { isAuth } from './middleware/auth.js';


dotenv.config()

const PORT = process.env.PORT;

const app = express();

//middleware
app.use(express.json());
app.use(cors());

//DB Connection
databaseConnection();

//routes
app.use('/',UserRouter);
app.use('/note',isAuth,NoteRouter);

app.get('/',(req,res)=>{
    res.send("WELCOME TO NOTEAPP ")
})

app.listen(PORT,()=>{console.log("Server is running in port ======>", PORT);});
