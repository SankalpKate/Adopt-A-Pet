const router = require('./Routes/router')


//1) import dotenv
require('dotenv').config()

//2) import express
const express = require("express")

//import connection.js
require('./DB/connections')

//3) import cors
const cors = require('cors')

//4) create server
const petServer = express();

//5) make use of cors middleware from express by server
petServer.use(cors())

//6) use a middleware, to convert json to javascript object
petServer.use(express.json());
// petServer.use(appMiddleware)
petServer.use(router)

//petserver expose the path uploads
petServer.use('/uploads',express.static('./uploads'))


//7) define port
const PORT = 4000;

//8) run the server
petServer.listen(PORT,()=>{
    console.log(`Server is running successfully at port : ${PORT}`);
})

petServer.get('/',(req,res)=>{
    res.send("Pet Server is running successfully")
})

