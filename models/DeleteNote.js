const mongoose = require("mongoose");

const deleteNoteSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },
  completed: {
    type: Boolean,
    default: false,
  },
});

module.exports = mongoose.model("DeleteNote", deleteNoteSchema);
