const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  email: {type: String, required: true, unique: true},
  password: {type: String, required: true},
  dateOfBirth: {type: String},
  sex: {type: String, enum: ['', 'Male', 'Female', 'Trans', 'Intersex', 'Other']},
  sexualOrientation: {type: String, enum: ['', 'Heterosexual', 'Homosexual', 'Bisexual', 'Asexual', 'Other']},
  ethnicity: {type: String, enum: ['', 'White', 'Black', 'Asian', 'Hispanic', 'Latinx', 'Middle Eastern', 'Mixed', 'Other']},
  nationality: {type: String},
  reports: [{type: Schema.Types.ObjectId, ref:'Report'}]
}, {
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  },
});

const User = mongoose.model('User', userSchema);

module.exports = User;