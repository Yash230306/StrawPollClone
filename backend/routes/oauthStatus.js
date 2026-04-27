const express = require('express');
const router = express.Router();

// Returns which OAuth providers are properly configured
router.get('/oauth-status', (req, res) => {
  res.json({
    google: !!(
      process.env.GOOGLE_CLIENT_ID &&
      process.env.GOOGLE_CLIENT_SECRET &&
      process.env.GOOGLE_CLIENT_ID !== 'YOUR_GOOGLE_CLIENT_ID'
    ),
    facebook: !!(
      process.env.FACEBOOK_APP_ID &&
      process.env.FACEBOOK_APP_SECRET &&
      process.env.FACEBOOK_APP_ID !== 'YOUR_FACEBOOK_APP_ID'
    ),
  });
});

module.exports = router;
