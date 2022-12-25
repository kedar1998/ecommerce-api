const express = require('express')
const app = express()
require("dotenv").config()
require('express-async-errors')

// Rest of package
const morgan = require('morgan')
const cookiePraser = require('cookie-parser')

// DATABASE CONNECTION
const connect = require('./db/connect')

// ROUTERS
const authRouter = require('./routes/auth')
const userRouter = require('./routes/userRoute')


// MIDDLEWARE
const notFoundMiddleware = require('./middleware/not-found')
const errorHandlerMiddleware = require('./middleware/error-handler')

app.use(morgan('tiny'))
app.use(express.json())
app.use(cookiePraser(process.env.JWT_SECRET))


app.get("/", (req,res) =>{
    console.log(req.signedCookies);
    res.send("HOME")
})

app.use("/api/v1/auth", authRouter)
app.use("/api/v1/users", userRouter)

app.use(notFoundMiddleware)
app.use(errorHandlerMiddleware)



const PORT = process.env.PORT || 5000;
const start = async () =>{
    try{
        connect(process.env.DATABASE)
        app.listen(PORT, () =>{
            console.log(`Running on Port ${PORT}`);
        })

    } catch (err){
        console.log(err);
    }
    
}

start()