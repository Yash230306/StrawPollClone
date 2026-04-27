const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const authMiddleware = require('../middleware/auth');


function makeToken(user, res) {
  const payload = {
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
      isPremium: user.isPremium || false
    }
  };
  jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '5 days' }, (err, token) => {
    if (err) throw err;
    res.json({ token, user: payload.user });
  });
}


router.get('/me', authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    if (!user) return res.status(404).json({ msg: 'User not found' });
    res.json({ user: { id: user.id, name: user.name, email: user.email, isPremium: user.isPremium } });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});


router.post('/upgrade', authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) return res.status(404).json({ msg: 'User not found' });

    user.isPremium = true;
    await user.save();


    makeToken(user, res);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});


router.post('/register', async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password)
    return res.status(400).json({ msg: 'All fields are required' });
    if (password.length < 6)
    return res.status(400).json({ msg: 'Password must be at least 6 characters' });

    let user = await User.findOne({ email });
    if (user)
    return res.status(400).json({ msg: 'An account with this email already exists' });

    user = new User({ name, email, password });
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);
    await user.save();

    makeToken(user, res);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});


router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password)
    return res.status(400).json({ msg: 'Email and password are required' });

    const user = await User.findOne({ email });
    if (!user)
    return res.status(400).json({ msg: 'Invalid email or password' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
    return res.status(400).json({ msg: 'Invalid email or password' });

    makeToken(user, res);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

module.exports = router;