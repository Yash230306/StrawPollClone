const mongoose = require('mongoose');

const OptionSchema = new mongoose.Schema({
  label:    { type: String, required: true },
  imageUrl: { type: String, default: '' },
  votes:    { type: Number, default: 0 },
  voters:   [{ type: String }],
});

const PollSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    default: '',
  },
  author: {
    type: String,
    required: true,
  },
  // Null for anonymous/guest polls — they never show in any dashboard
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    default: null,
  },
  multiple: {
    type: Boolean,
    default: false,
  },
  requireName: {
    type: Boolean,
    default: false,
  },
  pollType: {
    type: String,
    enum: ['basic', 'image', 'ranking', 'meeting'],
    default: 'basic',
  },
  options: [OptionSchema],
  // Count of unique voters (not total selections)
  totalVotes: {
    type: Number,
    default: 0,
  },
  // Store voter fingerprints to prevent duplicate votes
  // Each entry: IP address or browser fingerprint
  voterIds: {
    type: [String],
    default: [],
    select: false, // don't return this field by default
  },
}, { timestamps: true });

module.exports = mongoose.model('Poll', PollSchema);
