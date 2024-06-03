const express = require('express');
const dotenv = require('dotenv');
const cors = require("cors");
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const authRoutes = require('./routes/authRoutes');
const postRoutes = require('./routes/postRoutes');
const userDescriptionRoutes = require('./routes/userDescriptionRoutes');
const cloudinary = require("cloudinary").v2;
const multer = require('multer');
const fs = require('fs');
const path = require('path');

const app = express();
const port = process.env.PORT || 8000;

// Load dotenv manually
const envFilePath = path.resolve(__dirname, '.env');
if (fs.existsSync(envFilePath)) {
  dotenv.config({ path: envFilePath });
} else {
  console.error('.env file not found');
  process.exit(1);
}

if (!process.env.CLOUDINARY_CLOUD_NAME || !process.env.CLOUDINARY_API_KEY || !process.env.CLOUDINARY_API_SECRET) {
  console.error('Cloudinary environment variables not set.');
  process.exit(1);
}


// Database connection
mongoose.connect(process.env.MONGO_URL)
  .then(() => console.log("Database connected successfully"))
  .catch((err) => {
    console.error("Database connection failed:", err);
    process.exit(1);
  });

// Cloudinary configuration
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(bodyParser.json({ limit: '100mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

// CORS configuration
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

// Multer configuration
const upload = multer({ dest: 'uploads/' });

// Upload route
app.post('/upload', upload.single('file'), (req, res) => {
  const file = req.file;

  if (!file) {
    return res.status(400).send('No file uploaded.');
  }

  cloudinary.uploader.upload(file.path, (error, result) => {
    // Remove the file from the server after uploading
    fs.unlinkSync(file.path);

    if (error) {
      return res.status(500).send(error);
    }
    res.status(200).send(result);
  });
});

// Routes
app.use("/", authRoutes);
app.use("/post", postRoutes);
app.use("/api", userDescriptionRoutes);
app.use('/api', authRoutes);

// Start server
app.listen(port, () => console.log(`Server is running on port ${port}`));
