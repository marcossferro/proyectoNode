const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const passport = require('passport');

require('./auth');
const PORT = process.env.PORT || 5000;

const app = express();

app.use(bodyParser.json());

function isLoggedIn(req, res, next) {
  req.user ? next() : res.sendStatus(401);
}

app.use(session({ secret: 'cats', resave: false, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());

app.get('/', (req, res) => {
  res.send('<a href="/auth/google">Authenticate with Google</a>');
});

app.get('/auth/google',
  passport.authenticate('google', { scope: [ 'email', 'profile' ] }
));

app.get('/auth/google/callback',
  passport.authenticate( 'google', {
    successRedirect: '/protected',
    failureRedirect: '/auth/google/failure'
  })
);

app.get('/protected', isLoggedIn, (req, res) => {
  res.send(`
  <p>Hello ${req.user.displayName}</p>
  <a href="/logout">Logout</a>
  `);
});

app.get('/logout', (req, res) => {
  req.logout();
  req.session.destroy();
  res.send('Goodbye!');
});

app.get('/auth/google/failure', (req, res) => {
  res.send('Failed to authenticate..');
});

app.get('/api/users', (req, res) => {
    
})

app.get('/api/users/:id', (req, res) => {
    
})

app.post('/api/users', (req, res) => {
    
})

app.put('/api/users/:id', (req, res) => {
    
})

app.delete('/api/users/:id', (req, res) => {
    
})

app.listen(PORT, () => {
  console.log(`Listening on port http://localhost:${PORT}`);
});
