// src/models/Task.js
const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
  title: {type: String, required: true},
  description: {type: String, required: true},
  status: {type: String, enum: ['pending','in-progress','done'], default: 'pending'},
  assignedTo: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
  createdAt: {type: Date, default: Date.now},
  dueDate: Date,
  
  isArchived: { type: Boolean, default: false }
});
 
module.exports = mongoose.model('Task', taskSchema);