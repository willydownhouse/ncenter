const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;

const config = require('./config');

const googleStrategy = new GoogleStrategy(
  {
    clientID: config.GOOGLE_CLIENT_ID,
    clientSecret: config.GOOGLE_CLIENT_SECRET,
    callbackURL: 'http://localhost:3001/api/auth/google/callback',
  },
  function (accessToken, refreshToken, profile, done) {
    console.log('PROFILE:');
    console.log(profile);

    return done(null, profile);
  }
);

module.exports = googleStrategy;
