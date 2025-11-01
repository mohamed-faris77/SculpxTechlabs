const fs   = require('fs');
const File = require('../models/File');

exports.upload = async (req, res, next) => {
  try {
    if (!req.file) return res.status(400).json({ message: 'No file uploaded' });
    const fileDoc = new File({
      originalName: req.file.originalname,
      filename:     req.file.filename,
      path:         req.file.path,
      size:         req.file.size,
      owner:        req.user.id,
    });
    await fileDoc.save();
    res.json(fileDoc);
  } catch (err) {
    next(err);
  }
};

exports.list = async (req, res, next) => {
  try {
    const files = await File.find({ owner: req.user.id }).sort({ createdAt: -1 });
    res.json(files);
  } catch (err) {
    next(err);
  }
};

exports.rename = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { newName } = req.body;
    const file = await File.findOne({ _id: id, owner: req.user.id });
    if (!file) return res.status(404).json({ message: 'File not found' });
    file.originalName = newName;
    await file.save();
    res.json(file);
  } catch (err) {
    next(err);
  }
};

exports.delete = async (req, res, next) => {
  try {
    const { id } = req.params;
    const file = await File.findOneAndDelete({ _id: id, owner: req.user.id });
    if (!file) return res.status(404).json({ message: 'File not found' });
    fs.unlink(file.path, (err) => {
      if (err) console.warn('Failed to delete file from disk', err);
    });
    res.json({ message: 'Deleted successfully' });
  } catch (err) {
    next(err);
  }
};
