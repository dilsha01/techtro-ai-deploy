import multer from "multer";
import uploadController from "../controllers/uploadController";
// set storage
const storage = multer.diskStorage({
  // desitnation
  destination: function (req, res, cb) {
    cb(null, "./uploads/");
  },
  // filename
  filename: function (req, file, cb) {
    cb(null, file.fieldname + "-" + Date.now() + file.originalname);
  },
});

const filerFilter = (req, file, cb) => {
  cb(null, true);
};

let upload = multer({
  storage: storage,
  fileFilter: filerFilter,
});

export default uploadController.single("avatar");