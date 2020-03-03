const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const reportSchema = new Schema({
  motivation: {type: String, required: true, enum: ['sexist', 'racist', 'homophobic', 'transphobic', 'islamophobic', 'antisemitic', 'other']},
  type: {type: String, required: true, enum: ['verbal', 'physical']},
  space: {type: String, required: true, enum: ['public', 'private']},
  description: {type: String},
  time: {type: Date, required: true},
  date: {type: Date, required: true},
  location: {type: String, coordinates:[], required: true},
  user: {type: Schema.Types.ObjectId,ref:'User'}
}, {
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  },
});

const Report = mongoose.model('Report', reportSchema);

module.exports = Report;