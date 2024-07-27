import multer from "multer";
import path from 'path'

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads/'); // Directory to save files
    },
    filename: function (req, file, cb) {
      cb(null, Date.now() + path.extname(file.originalname)); // Unique file name
    },
  });
  
const upload = multer({ storage: storage });

export default upload;