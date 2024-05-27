const express = require('express')
const dotenv = require('dotenv').config()
const cors = require("cors");
const {mongoose} = require('mongoose')
const cookieParser = require('cookie-parser')
const app = express();
const authRoutes = require('./routes/authRoutes');
const postRoutes = require('./routes/postRoutes');

mongoose.connect(process.env.MONGO_URL)
.then(() => console.log("Database Connected"))
.catch((err) => console.log ("Database not connected, err"))

app.use(express.json())
app.use(cookieParser())
app.use(express.urlencoded({extended: false}))
app.use(cors({ origin: 'http://localhost:5173', credentials: true}));


app.use("/", authRoutes)
app.use("/post", postRoutes)

const port = process.env.PORT || 8000

app.listen(port, ()=> console.log(`Server is running on port ${port}`))
