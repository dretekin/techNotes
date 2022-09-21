const express = require("express");
const router = express.Router();
const notesController = require("../controllers/notesController");

router
  .route("/")
  .get(notesController.getAllNotes)
  .post(notesController.createNewNote)
  .patch()
  .delete();

module.exports = router;
