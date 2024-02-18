import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export const multerUnlink = (deleteImagePath) => {
  const imagePath = path.join(__dirname, "..", "uploads", deleteImagePath);
  fs.unlink(imagePath, (err) => {
    if (err) {
      console.log(err, "error deleting post image!");
      return res
        .status(500)
        .json({ success: false, message: "Something went wrong!" });
    }
  });
};
