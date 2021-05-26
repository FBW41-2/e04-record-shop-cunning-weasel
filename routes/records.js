const express = require("express");
const router = express.Router();
const checkAdminRole = require("../middleware/checkAdminRole");
const checkLogin = require("../middleware/checkLogin");
const multer = require("multer");

// can also create a func to do the above
const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, "public/img");
  },
  filename: (req, file, callback) => {
    callback(null, file.originalname);
  },
});

// can now use multer instance for mW
const upload = multer({storage});

const {
  getRecords,
  getRecord,
  updateRecord,
  deleteRecord,
  addRecord,
} = require("../controllers/recordsController");

router.route("/").get(checkLogin, getRecords).post(checkLogin, addRecord);

router
  .route("/:id")
  .get(checkAdminRole, getRecord)
  .delete(checkAdminRole, deleteRecord)
  .put(checkAdminRole, upload.single("img"), updateRecord);

module.exports = router;
