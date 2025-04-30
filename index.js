const express = require("express")
const mongoose = require("mongoose")
const app = express()

require("dotenv").config()

//middlewares
app.use(express.json())

const PORT = process.env.PORT || 3000

app.get("/", (req,res) => {
    res.send("hi there!")
})

//db connection
console.log(process.env.MONGO_URL)
mongoose.connect(process.env.MONGO_URL).then(() => console.log("Db connection successfull!"))

app.listen(PORT,()=> console.log(`app is running at ${PORT}`))