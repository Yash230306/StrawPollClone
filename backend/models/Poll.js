const mongoose = require('mongoose');

const OptionSchema = new mongoose.Schema({
  label: { type: String, required: true },
  imageUrl: { type: String, default: '' },
  votes: { type: Number, default: 0 },
  voters: [{ type: String }]
});

const PollSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    default: ''
  },
  author: {
    type: String,
    required: true
  },

  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    default: null
  },
  multiple: {
    type: Boolean,
    default: false
  },
  requireName: {
    type: Boolean,
    default: false
  },
  pollType: {
    type: String,
    enum: ['basic', 'image', 'ranking', 'meeting'],
    default: 'basic'
  },
  requireName: {
    type: Boolean,
    default: false
  },
  options: [OptionSchema],

  totalVotes: {
    type: Number,
    default: 0
  },


  voterIds: {
    type: [String],
    default: [],
    select: false
  }
}, { timestamps: true });

module.exports = mongoose.model('Poll', PollSchema);