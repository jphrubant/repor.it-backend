const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const reportSchema = new Schema({
  role: {type: String, required: true, enum: ['Victim', 'Witness']},
  motivation: {type: String, required: true, enum: ['Sexist', 'Racist', 'Homophobic', 'Transphobic', 'Islamophobic', 'Antisemitic', 'Other']},
  type: {type: String, required: true, enum: ['Verbal', 'Physical']},
  space: {type: String, required: true, enum: ['Outside', 'Inside']},
  description: {type: String},
  time: {type: String, required: true},
  date: {type: String, required: true},
  location: {type: [Number], required: true},
  user: {type: Schema.Types.ObjectId,ref:'User'}
}, {
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  },
});

const Report = mongoose.model('Report', reportSchema);

module.exports = Report;