import { v2 as cloudinary } from 'cloudinary';

// ✅ Configure Cloudinary with your credentials
cloudinary.config({
  cloud_name: 'dadn2q1xq', // Replace with your Cloudinary cloud name
  api_key: '444438167196879',       // Replace with your Cloudinary API key
  api_secret: '6OK0g-VW6FNd_YeIc08aTPwQNTI'  // Replace with your Cloudinary API secret
});

export default cloudinary;



// npm install cloudinary multer-storage-cloudinary