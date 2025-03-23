import express from 'express'
import cors from 'cors'
//import mongoose from 'mongoose'



//const express = require('express')

//const mongoose = require('mongoose')

const app =  express()

app.use(cors())
app.use(express.urlencoded({
    extended:true,
}))

app.use(express.json())

//mongo db
// const uri ='mongodb+srv://homestock:@HomeStock123@cluster0.x0qvw.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0'


// const connect =  async () => {
//     try{
//         await mongoose.connect(uri)
//         console.log('Connected to MongoDB')
//     }catch(error){
//         console.log('MongoDB Error: ',error)
//     }
// }
  
// connect();

// 

app.listen(process.env.PORT, ()=>{
    console.log(`Server is running on port ${process.env.PORT} `)
})


