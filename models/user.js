const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  email: {type: String, required: true, unique: true},
  password: {type: String, required: true},
  dateOfBirth: {type: Date},
  sex: {type: String, enum: ['male', 'female', 'trans', 'intersex', 'other']},
  sexualOrientation: {type: String, enum: ['Heterosexual', 'homosexual', 'bisexual', 'asexual', 'other']},
  ethnicity: {type: String, enum: ['White', 'Black', 'Asian', 'Hispanic', 'Latinx', 'Middle Easter', 'Mixed', 'Other']},
  nationality: {type: String},
  reports: [{type: Schema.Types.ObjectId, red:'Report'}]
}, {
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  },
});

const User = mongoose.model('User', userSchema);

module.exports = User;