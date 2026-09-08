import express from "express"
import cors from "cors"
import {connectDB}from "./config/db.js"
import foodRouter from "./routes/foodRoute.js"


// app config
const app = express()
const port = 4000

// middleware
app.use(express.json())
app.use(cors())
// db connecion
connectDB();

//api endpoints
app.use("/api/food", foodRouter)

app.get("/", (req, res) => {
    res.send("API Working")
})
app.listen(port, () => {
    console.log(`Server Started on http://localhost:${port}`)
})
//mongodb+srv://artiambre23_db_user:<JJ7mue4cHb2A3cFx>@cluster0.ho79weo.mongodb.net/?