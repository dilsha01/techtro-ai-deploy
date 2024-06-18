import fs from "fs";

const uploadMiddleware = (req, res, next) => {
  // Check if file and body are defined
  if (typeof req.file === "undefined" || typeof req.body === "undefined") {
    return res.status(400).json({ msg: "Issue with uploading this image." });
  }

  // Get the path of the uploaded file
  let image = req.file.path;

  // Check file type
  if (
    !req.file.mimetype.includes("jpeg") &&
    !req.file.mimetype.includes("jpg") &&
    !req.file.mimetype.includes("png")
  ) {
    // Remove file if not supported
    fs.unlinkSync(image);
    return res.status(400).json({ msg: "This file is not supported." });
  }

  // Check file size
  if (req.file.size > 1024 * 1024) {
    // Remove file if too large
    fs.unlinkSync(image);
    return res.status(400).json({ msg: "This file is too large (Max: 1MB)" });
  }

  // Call next middleware if all checks pass
  next();
};

export default uploadMiddleware;
