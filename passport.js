const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth2').Strategy;

passport.serializeUser((user , done) => {
	done(null , user);
})
passport.deserializeUser(function(user, done) {
	done(null, user);
});

passport.use(new GoogleStrategy({
	clientID:"1061659552696-kf7lurf8kg294i7eng2dhtuked840oqf.apps.googleusercontent.com", // Your Credentials here.
	clientSecret:"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", // Your Credentials here.
	callbackURL:"http://localhost:4000/auth/callback",
	passReqToCallback:true
},
function(request, accessToken, refreshToken, profile, done) {
	return done(null, profile);
}
));
