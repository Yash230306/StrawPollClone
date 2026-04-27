const express = require('express');
const router = express.Router();
const passport = require('../config/passport');
const jwt = require('jsonwebtoken');

/** Helper: generate JWT and redirect to frontend with token */
function redirectWithToken(res, user) {
  const payload = { user: { id: user.id, name: user.name, email: user.email } };
  jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '5 days' }, (err, token) => {
    if (err) {
      return res.redirect(`${process.env.CLIENT_URL}/login?error=token_failed`);
    }
    // Redirect to frontend with token in query param — frontend stores it in localStorage
    res.redirect(`${process.env.CLIENT_URL}/oauth-callback?token=${token}&name=${encodeURIComponent(user.name)}&email=${encodeURIComponent(user.email)}`);
  });
}

/* ── Google ─────────────────────────────────────────────── */
router.get('/google',
  passport.authenticate('google', { scope: ['profile', 'email'], session: false })
);

router.get('/google/callback',
  passport.authenticate('google', { failureRedirect: `${process.env.CLIENT_URL}/login?error=google_failed`, session: false }),
  (req, res) => redirectWithToken(res, req.user)
);

/* ── Facebook ───────────────────────────────────────────── */
router.get('/facebook',
  passport.authenticate('facebook', { scope: ['email'], session: false })
);

router.get('/facebook/callback',
  passport.authenticate('facebook', { failureRedirect: `${process.env.CLIENT_URL}/login?error=facebook_failed`, session: false }),
  (req, res) => redirectWithToken(res, req.user)
);

module.exports = router;
