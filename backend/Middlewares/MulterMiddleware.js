import multer from "multer";
// import path from "path";
// import { fileURLToPath } from "url";
// import { dirname } from "path";

// // Get the current file URL--->
// const currentFileURL = import.meta.url;

// // Convert the file URL to a file path.--->
// const currentFilePath = fileURLToPath(currentFileURL);

// // Get the directory name of the current file--->
// const currentDirName = dirname(currentFilePath);

// Set up Multer storage------>
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); // Set the destination folder for uploaded files
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`); // Set the filename to the original filename
    // cb(null, `${file.originalname}`); // Set the filename to the original filename
  },
});

export const multerUpload = multer({
  storage: storage,
  // limits: { fileSize: 5 * 1024 * 1024 }, // Set the file size limit (5MB in this example)--->
});

// app.use("/uploads", express.static(path.join(currentDirName, "uploads"))); //---->
