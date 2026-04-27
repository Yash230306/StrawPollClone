const express = require('express');
const router = express.Router();
const Poll = require('../models/Poll');
const authMiddleware = require('../middleware/auth');

// ── Get MY polls (logged-in user only) ──────────────────────────────
// Returns only polls created by the authenticated user
router.get('/mine', authMiddleware, async (req, res) => {
  try {
    const polls = await Poll.find({ userId: req.user.id }).sort({ createdAt: -1 });
    res.json(polls);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// ── Get all polls (public) ──────────────────────────────────────────
router.get('/', async (req, res) => {
  try {
    const polls = await Poll.find().sort({ createdAt: -1 });
    res.json(polls);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// ── Get poll by ID (public) ─────────────────────────────────────────
router.get('/:id', async (req, res) => {
  try {
    const poll = await Poll.findById(req.params.id);
    if (!poll) return res.status(404).json({ msg: 'Poll not found' });
    res.json(poll);
  } catch (err) {
    if (err.kind === 'ObjectId') return res.status(404).json({ msg: 'Poll not found' });
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// ── Create a new poll ───────────────────────────────────────────────
// If a valid JWT is sent, links the poll to that user.
// If no token, poll is anonymous (userId = null) and won't appear in any dashboard.
router.post('/', async (req, res) => {
  try {
    const { title, description, author, multiple, options } = req.body;

    // Try to extract userId from optional Authorization header
    let userId = null;
    const authHeader = req.headers.authorization;
    if (authHeader && authHeader.startsWith('Bearer ')) {
      try {
        const jwt = require('jsonwebtoken');
        const decoded = jwt.verify(authHeader.replace('Bearer ', ''), process.env.JWT_SECRET);
        userId = decoded.user.id;
      } catch (_) {
        // Invalid token — treat as anonymous
      }
    }

    const mappedOptions = options.map(opt => ({
      label: opt.label || opt,
      votes: 0,
    }));

    const newPoll = new Poll({
      title,
      description: description || '',
      author: author || 'Anonymous',
      multiple: multiple || false,
      options: mappedOptions,
      totalVotes: 0,
      userId, // null for guests, ObjectId for logged-in users
    });

    const poll = await newPoll.save();
    res.json(poll);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// ── Vote on a poll ──────────────────────────────────────────────────
// Uses IP + user-agent as a voter fingerprint to prevent duplicate votes.
router.post('/:id/vote', async (req, res) => {
  try {
    const { optionIds } = req.body;

    // Build a voter fingerprint from IP + user-agent
    const ip = req.headers['x-forwarded-for']?.split(',')[0]?.trim()
      || req.socket?.remoteAddress
      || 'unknown';
    const ua = req.headers['user-agent'] || '';
    const voterId = Buffer.from(`${ip}::${ua}`).toString('base64').slice(0, 40);

    // Load the poll including voterIds
    const poll = await Poll.findById(req.params.id).select('+voterIds');
    if (!poll) return res.status(404).json({ msg: 'Poll not found' });

    // Reject if this voter already voted
    if (poll.voterIds.includes(voterId)) {
      return res.status(400).json({ msg: 'You have already voted on this poll.' });
    }

    // Record votes per option
    optionIds.forEach(id => {
      const option = poll.options.id(id);
      if (option) option.votes += 1;
    });

    // Increment totalVotes by 1 per voter (not per selection)
    poll.totalVotes += 1;
    poll.voterIds.push(voterId);

    await poll.save();

    // Return poll without voterIds
    const { voterIds: _v, ...pollObj } = poll.toObject();
    res.json(pollObj);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// ── Delete a poll (owner only) ──────────────────────────────────────
router.delete('/:id', authMiddleware, async (req, res) => {
  try {
    const poll = await Poll.findById(req.params.id);
    if (!poll) return res.status(404).json({ msg: 'Poll not found' });

    if (!poll.userId || poll.userId.toString() !== req.user.id) {
      return res.status(403).json({ msg: 'Not authorized to delete this poll' });
    }

    await poll.deleteOne();
    res.json({ msg: 'Poll deleted' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
