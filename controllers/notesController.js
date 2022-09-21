const Note = require("../models/Note");
const DeleteNote = require("../models/DeleteNote");
const asyncHanlder = require("express-async-handler");

const getAllNotes = asyncHanlder(async (req, res) => {
  const notes = await Note.find();
  if (!notes?.length) {
    return res.status(400).json({ message: "No notes found" });
  }
  res.json(notes);
});

const createNewNote = asyncHanlder(async (req, res) => {
  const { userId, title, text, completed } = req.body;
  //   confirm data
  if (!userId || !title || !text) {
    return res.json({ message: "All fields are required" });
  }
  //   find user
  const user = await Note.findById(userId).exec();
  console.log(user);

  if (!user) {
    return res.status(400).json({ message: "User not found" });
  }

  const note = await Note.create(req.body);

  if (note) {
    res.status(201).json({ message: "New note created" });
  } else {
    res.status(400).json({ message: "Invalid note data received" });
  }
});

const updateUserNote = asyncHanlder(async (req, res) => {
  const { userID, title, text, completed } = req.body;

  // check for duplicate
  const duplicate = await Note.findOne({ userID }).lean().exec();

  if (duplicate && duplicate)
    if (!userID || !title || !text) {
      return res.status(400).json({ message: "All fields are required" });
    }

  const note = await Note.findById(userID).exec();

  (note.user = userID), (note.title = title), (note.text = text);
  note.completed = completed;

  const updatedUserNote = await note.save();

  res.json({ message: `${updatedUserNote.user} udpated` });
});

const deleteUserNote = asyncHanlder(async (req, res) => {
  const { id } = req.body;

  if (!id) {
    return res.status(400).json({ message: "Usier ID required" });
  }

  const note = await Note.findOne({ user: id });
});

module.exports = {
  getAllNotes,
  createNewNote,
  updateUserNote,
};
