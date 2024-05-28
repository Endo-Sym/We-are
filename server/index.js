const express = require('express')
const dotenv = require('dotenv').config()
const cors = require("cors");
const {mongoose} = require('mongoose')
const cookieParser = require('cookie-parser')
const app = express();
const authRoutes = require('./routes/authRoutes');
const postRoutes = require('./routes/postRoutes');
const cloudinary = require("cloudinary").v2;

mongoose.connect(process.env.MONGO_URL)
.then(() => console.log("Database Connected"))
.catch((err) => console.log ("Database not connected, err"))

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

app.use(express.json())
app.use(cors({ origin: 'http://localhost:5173', credentials: true }));
app.use(cookieParser())
app.use(express.urlencoded({extended: false}))

app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true,
}));

app.use((req, res, next) => {  
    res.header('Access-Control-Allow-Origin', req.headers.origin);
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header('Access-Control-Allow-Credentials', 'true');
    next();
});  


app.use("/", authRoutes)
app.use("/post", postRoutes)
const bodyParser = require('body-parser');

app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));



const port = process.env.PORT || 8000

app.listen(port, ()=> console.log(`Server is running on port ${port}`))