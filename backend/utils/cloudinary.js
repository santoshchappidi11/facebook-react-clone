import { v2 as cloudinary } from "cloudinary";

export const cloudConfig = () => {
  cloudinary.config({
    cloud_name: process?.env?.CLOUDINARY_CLOUD_NAME,
    api_key: process?.env?.CLOUDINARY_API_KEY,
    api_secret: process?.env?.CLOUDINARY_API_SECRET_KEY,
  });
};

export const cloudDestroy = (imageId, postType) => {
  cloudinary.uploader.destroy(
    imageId,
    { resource_type: postType === "video" ? "video" : "image" },
    (error, result) => {
      if (error) {
        console.log(error);
      } else {
        // console.log(result, "image deleted");
        if (result.result === "not found") {
          console.log("image not found.");
        } else {
          console.log("image deleted successfully.");
        }
      }
    }
  );
};
