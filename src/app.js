const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const passport = require('passport');
const request = require('request');

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

// API's
app.get('/api/users', (req, res) => {
  request({
    url: `http://localhost:${PORT}/api/users`,
    method: 'GET',
    headers: {
      'Accept': 'application/json',
      'Accept-Charset': 'utf-8'
    }
  }, function (error, response, body) {
    if (!error && response.statusCode == 200) {
      var users = JSON.parse(body);
      res.send(users);
    }
  });
});

app.get('/api/users/:id', (req, res) => {
  var userId = req.params.id;
  request({
    url: `http://localhost:${PORT}/api/users/${userId}`,
    method: 'GET',
    headers: {
      'Accept': 'application/json',
      'Accept-Charset': 'utf-8'
    }
  }, function (error, response, body) {
    if (!error && response.statusCode == 200) {
      var user = JSON.parse(body);
      res.send(user);
    }
  });
});

app.post('/api/users', (req, res) => {
  var user = req.body;
  request({
    url: `http://localhost:${PORT}/users`,
    method: 'POST',
    json: true,
    headers: {
      'Content-Type': 'application/json'
    },
    body: user
  }, function (error, response, body) {
    if (!error && response.statusCode == 201) {
      res.send(body);
    }
  });
});

app.put('/api/users/:id', (req, res) => {
  var userId = req.params.id;
  var user = req.body;
  request({
    url: `http://localhost:${PORT}/users/${userId}`,
    method: 'PUT',
    json: true,
    headers: {
      'Content-Type': 'application/json'
    },
    body: user
  }, function (error, response, body) {
    if (!error && response.statusCode == 200) {
      res.send(body);
    }
  });
});

app.delete('/api/users/:id', (req, res) => {
  var userId = req.params.id;
  request({
    url: `http://localhost:${PORT}/users/${userId}`,
    method: 'DELETE',
    headers: {
      'Accept': 'application/json',
      'Accept-Charset': 'utf-8'
    }
  }, function (error, response, body) {
    if (!error && response.statusCode == 204) {
      res.status(204).send();
    }
  });
});

app.listen(PORT, () => {
  console.log(`Listening on port http://localhost:${PORT}`);
});
