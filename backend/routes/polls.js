const express = require('express');
const router = express.Router();
const Poll = require('../models/Poll');
const authMiddleware = require('../middleware/auth');
const jwt = require('jsonwebtoken');



router.get('/mine', authMiddleware, async (req, res) => {
  try {
    const polls = await Poll.find({ userId: req.user.id }).sort({ createdAt: -1 });
    res.json(polls);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ msg: err.message || 'Server Error' });
  }
});


router.get('/', async (req, res) => {
  try {
    const polls = await Poll.find().sort({ createdAt: -1 });
    res.json(polls);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ msg: err.message || 'Server Error' });
  }
});


router.get('/:id', async (req, res) => {
  try {
    const poll = await Poll.findById(req.params.id);
    if (!poll) return res.status(404).json({ msg: 'Poll not found' });
    res.json(poll);
  } catch (err) {
    if (err.kind === 'ObjectId') return res.status(404).json({ msg: 'Poll not found' });
    console.error(err.message);
    res.status(500).json({ msg: err.message || 'Server Error' });
  }
});




router.post('/', async (req, res) => {
  try {
    const { title, description, author, multiple, options, pollType, requireName } = req.body;


    let userId = null;
    const authHeader = req.headers.authorization;
    if (authHeader && authHeader.startsWith('Bearer ')) {
      try {
        const jwt = require('jsonwebtoken');
        const decoded = jwt.verify(authHeader.replace('Bearer ', ''), process.env.JWT_SECRET);
        userId = decoded.user.id;
      } catch (_) {

      }
    }

    const mappedOptions = options.map((opt) => ({
      label: opt.label || opt,
      imageUrl: opt.imageUrl || '',
      votes: 0
    }));

    const newPoll = new Poll({
      title,
      description: description || '',
      author: author || 'Anonymous',
      multiple: multiple || false,
      requireName: requireName || false,
      pollType: pollType || 'basic',
      options: mappedOptions,
      totalVotes: 0,
      userId
    });

    const poll = await newPoll.save();
    res.json(poll);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ msg: err.message || 'Server Error' });
  }
});



router.post('/:id/vote', async (req, res) => {
  try {
    const { optionIds, voterName } = req.body;


    let voterId = null;
    const authHeader = req.headers.authorization;
    if (authHeader && authHeader.startsWith('Bearer ')) {
      const token = authHeader.split(' ')[1];
      try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        voterId = `user_${decoded.user.id}`;
      } catch (err) {
        // Invalid or expired token, ignore and fallback to IP
      }
    }

    if (!voterId) {
      const ip = req.headers['x-forwarded-for']?.split(',')[0]?.trim() ||
      req.socket?.remoteAddress ||
      'unknown';
      const ua = req.headers['user-agent'] || '';
      voterId = Buffer.from(`${ip}::${ua}`).toString('base64').slice(0, 40);
    }


    const poll = await Poll.findById(req.params.id).select('+voterIds');
    if (!poll) return res.status(404).json({ msg: 'Poll not found' });


    if (poll.voterIds.includes(voterId)) {
      return res.status(400).json({ msg: 'You have already voted on this poll.' });
    }


    if (poll.pollType === 'ranking') {
      const maxPoints = optionIds.length;
      optionIds.forEach((id, index) => {
        const option = poll.options.id(id);
        if (option) {
          option.votes += (maxPoints - index); // Distribute points
          if (voterName && voterName.trim()) {
            option.voters.push(voterName.trim());
          }
        }
      });
    } else {
      optionIds.forEach((id) => {
        const option = poll.options.id(id);
        if (option) {
          option.votes += 1;
          if (voterName && voterName.trim()) {
            option.voters.push(voterName.trim());
          }
        }
      });
    }


    poll.totalVotes += 1;
    poll.voterIds.push(voterId);

    await poll.save();


    const { voterIds: _v, ...pollObj } = poll.toObject();
    res.json(pollObj);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ msg: err.message || 'Server Error' });
  }
});


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
    res.status(500).json({ msg: err.message || 'Server Error' });
  }
});

module.exports = router;