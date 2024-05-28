import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import userRoutes from './routes/userRoutes.js';
import db from './config/db.js';

//create application
const app = express()

app.use(morgan('tiny'))
app.use(cors());
app.use(express.json())
app.use(express.urlencoded({extended:true}))

//Enable CookieParser
app.use(cookieParser())

//Database connection
try{
    await db.authenticate()
    console.log('Correct connection to the database')
}catch(e){
    console.log(e)
}
app.use('/auth', userRoutes)

const port = 3000;

app.listen(port, ()=>{
    console.log(`The server is running on the port ${port}`)
});