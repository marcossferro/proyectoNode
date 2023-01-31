const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth2').Strategy;

const GOOGLE_CLIENT_ID = '1061659552696-aq8pt3gp5ajuprao1egblkuct6hhu1q8.apps.googleusercontent.com'
const GOOGLE_CLIENT_SECRET = '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'

passport.use(new GoogleStrategy({
    clientID: GOOGLE_CLIENT_ID,
    clientSecret: GOOGLE_CLIENT_SECRET,
    callbackURL: "http://localhost:5000/auth/google/callback",
    passReqToCallback: true,
  },
  function(request, accessToken, refreshToken, profile, done) {
    return done(null, profile);
  }));
  
  passport.serializeUser(function(user, done) {
    done(null, user);
  });
  
  passport.deserializeUser(function(user, done) {
    done(null, user);
  });
  