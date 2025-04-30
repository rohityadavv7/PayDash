const express = require("express")
const mongoose = require("mongoose")
const app = express()

require("dotenv").config()

const user = require("./routes/userRoutes")
const admin = require("./routes/adminRoutes")
const invoice = require("./routes/invoiceRoutes")

//middlewares
app.use(express.json())

app.use("/api/v1/auth", user)
app.use("/api/v1/admin/clients", admin)
app.use("/api/v1/admin/invoice", invoice)

const PORT = process.env.PORT || 3000

app.get("/", (req,res) => {
    res.send("hi there!")
})

//db connection
console.log(process.env.MONGO_URL)
mongoose.connect(process.env.MONGO_URL).then(() => console.log("Db connection successfull!"))

app.listen(PORT,()=> console.log(`app is running at ${PORT}`))