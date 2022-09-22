const Note = require("../models/Note");
const User = require("../models/User");
const asyncHanlder = require("express-async-handler");

const getAllNotes = asyncHanlder(async (req, res) => {
  const notes = await Note.find();
  if (!notes?.length) {
    return res.status(400).json({ message: "No notes found" });
  }
  res.json(notes);
});

const createNewNote = asyncHanlder(async (req, res) => {
  const { userId, title, text } = req.body;
  //   confirm data
  if (!userId || !title || !text) {
    return res.json({ message: "All fields are required" });
  }

  //   find user
  const user = await User.findById(userId).exec();

  if (!user) {
    return res.status(400).json({ message: "User not found" });
  }

  // check for duplicate notes for a user
  const duplicateNote = await Note.findOne({ userId });

  if (duplicateNote) {
    return res.json({ message: "Duplicate note!" });
  }

  const note = await Note.create(req.body);

  if (note) {
    res.status(201).json({ message: "New note created" });
  } else {
    res.status(400).json({ message: "Invalid note data received" });
  }
});

const updateUserNote = asyncHanlder(async (req, res) => {
  const { userId, title, text, completed } = req.body;

  if (!userId && (!title || !text || typeof completed !== "boolean")) {
    return res.status(400).json({ message: "All fields are required" });
  }

  // find note
  const note = await Note.findOne({ userId }).lean().exec();

  if (!note) {
    return res.json({ message: "Note not found" });
  }

  const updatedNote = await Note.updateOne({ userId, title, text, completed });

  if (updatedNote) {
    return res.json({ message: "Note updated!" });
  }
});

const deleteUserNote = asyncHanlder(async (req, res) => {
  const { userId, completed } = req.body;

  if (!userId) {
    return res.status(400).json({ message: "User ID required" });
  } else if (typeof completed !== "boolean") {
    return res.status(400).json({ message: "Note completion required" });
  } else if (!completed) {
    return res
      .status(400)
      .json({ message: "Can't delete note. Note is note completed!" });
  }

  const deletedNote = await Note.deleteOne({ userId });

  if (deletedNote.deletedCount) {
    return res.json({ message: "Note deleted" });
  } else {
    return res.json({ message: "Note not found!" });
  }
});

module.exports = {
  getAllNotes,
  createNewNote,
  updateUserNote,
  deleteUserNote,
};
