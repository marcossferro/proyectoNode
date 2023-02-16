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
  'CREATE TABLE posts (id INT AUTO_INCREMENT PRIMARY KEY, title VARCHAR(255), body TEXT, userID INT, creationDate DATETIME DEFAULT CURRENT_TIMESTAMP, FOREIGN KEY (userID) REFERENCES users(id))',
  (err, result) => {
    if (err) {
      console.error(`Error creating comments table: ${err.stack}`);
      return;
    }
    console.log('Posts table created successfully');
  }
);


exports.getComments = function(callback) {
  connection.query('SELECT * FROM comments', function (error, results, fields) {
    if (error) throw error;
    callback(results);
  });
};

exports.addComment = function(comment, callback) {
    var sql = 'INSERT INTO comments (creationDate, body, title, userID) VALUES (?,?,?)';
    connection.query(sql, [comment.creationDate, comment.body, comment.title, comment.userID], 
    function (error, results, fields) {
        if (error) throw error;
        callback(results);
    });
};

exports.updateComment = function(comment, callback) {
    var sql = 'UPDATE comments SET creationDate = ?, body = ?, title = ? WHERE id = ?';
    connection.query(sql, [comment.creationDate, comment.body, comment.title, comment.id], 
    function (error, results, fields) {
        if (error) throw error;
        callback(results);
    });
};

exports.deleteComment = function(id, callback) {
    var sql = 'DELETE FROM comments WHERE id = ?';
    connection.query(sql, [id], 
    function (error, results, fields) {
        if (error) throw error;
        callback(results);
    });
};

