import multer from "multer";
import { v2 as cloudinary } from "cloudinary";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import path from "path";

import dotenv from 'dotenv';
dotenv.config(); // Ensure env variables are loaded in this file


// 1. Configure Cloudinary (Better to use process.env for these)

// In your upload.js
console.log("Cloudinary Config Check:", {
    name: process.env.CLOUD_NAME ? "Found" : "Missing",
    key: process.env.API_KEY ? "Found" : "Missing",
    secret: process.env.API_SECRET ? "Found" : "Missing"
});

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET,
});

// 2. Setup Storage Engine
const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: async (req, file) => {
        // Define dynamic folder names based on fieldname
        let folderPath = "liteacad/others";
        
        if (file.fieldname === "logo") folderPath = "ump/branding";
        else if (file.fieldname === "government_id") folderPath = "upm/government_id";
        else if (file.fieldname === "proof_of_address") folderPath = "upm/proof_of_address";
        // else if (file.fieldname === "staff_passport") folderPath = "liteacad/staff";

        return {
            folder: folderPath,
            allowed_formats: ["jpg", "jpeg", "png"],
            public_id: `${file.fieldname}_${Date.now()}`, // Unique name
            transformation: [{ width: 1000, height: 1000, crop: "limit" }] // Optional: Resize if too large
        };
    },
});

// 3. File filter (Double security check)
const fileFilter = (req, file, cb) => {
    const ext = path.extname(file.originalname).toLowerCase();
    if (ext !== ".jpg" && ext !== ".jpeg" && ext !== ".png") {
        req.fileValidationError = "Only JPG, JPEG, and PNG are allowed.";
        return cb(null, false);
    }
    cb(null, true);
};

// 4. Export Upload Middleware
const upload = multer({
    storage: storage,
    fileFilter: fileFilter,
    limits: { fileSize: 5 * 1024 * 1024 } // 5MB limit
}).fields([
    { name: "school_logo", maxCount: 1 },
    { name: "admin_signature", maxCount: 1 },
    { name: "passport", maxCount: 1 },
    // { name: "staff_passport", maxCount: 1 }
]);

export default upload;