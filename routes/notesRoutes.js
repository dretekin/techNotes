const express = require("express");
const router = express.Router();
const notesController = require("../controllers/notesController");

router
  .route("/")
  .get(notesController.getAllNotes)
  .post(notesController.createNewNote)
  .patch(notesController.updateUserNote)
  .delete(notesController.deleteUserNote);

module.exports = router;
