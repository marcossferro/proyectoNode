const mysql = require('mysql2');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'root',
  database: 'proyectoNodeDB'
});

connection.connect(function(err) {
  if (err) throw err;
  console.log('Connected to the database');
});

connection.query(
  'CREATE TABLE users (id INT AUTO_INCREMENT PRIMARY KEY, name VARCHAR(255), email VARCHAR(255), picture VARCHAR(500))',
  (err, result) => {
    if (err) {
      console.error(`Error creating users table: ${err.stack}`);
      return;
    }
    console.log(`Users table created successfully`);
  }
);

exports.getUsers = function(callback) {
  connection.query('SELECT * FROM users', function (error, results, fields) {
    if (error) throw error;
    callback(results);
  });
};

exports.addUser = function(user, callback) {
    var sql = 'INSERT INTO users (name, email, picture) VALUES (?,?,?)';
    connection.query(sql, [user.name, user.email, user.picture], 
    function (error, results, fields) {
        if (error) throw error;
        callback(results);
    });
};

exports.updateUser = function(user, callback) {
    var sql = 'UPDATE users SET name = ?, email = ?, picture = ? WHERE id = ?';
    connection.query(sql, [user.name, user.email, user.picture, user.id], 
    function (error, results, fields) {
        if (error) throw error;
        callback(results);
    });
};

exports.deleteUser = function(id, callback) {
    var sql = 'DELETE FROM users WHERE id = ?';
    connection.query(sql, [id], 
    function (error, results, fields) {
        if (error) throw error;
        callback(results);
    });
};

