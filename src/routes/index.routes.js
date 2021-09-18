const express = require("express");
const controller = require("../controller/index");
const router = express.Router();
const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, "../public/img"));
  },
  filename: function (req, file, cb) {
    const uniqueSuffix =
      Date.now() + "-" + Math.round(Math.random() * 1e9) + file.originalname;
    cb(null, file.fieldname + "-" + uniqueSuffix);
  },
});

const upload = multer({ storage: storage });
router.get("/", controller.getList);
router.get("/cargarPokemon", controller.getRegister);
router.post("/cargarPokemon", upload.single("Imagen"), controller.insertPoke);
router.get("/detail/:id", controller.getDetail);
module.exports = router;
