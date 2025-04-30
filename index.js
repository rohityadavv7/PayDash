const express = require("express")
const app = express()

require("dotenv").config()

//middlewares
app.use(express.json())

const PORT = process.env.PORT || 3000

app.get("/", (req,res) => {
    res.send("hi there!")
})

app.listen(PORT,()=> console.log(`app is running at ${PORT}`))