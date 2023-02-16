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
  'CREATE TABLE posts (id INT AUTO_INCREMENT PRIMARY KEY, title VARCHAR(255), body TEXT, commentID INT, userID INT, creationDate DATETIME DEFAULT CURRENT_TIMESTAMP, FOREIGN KEY (userID) REFERENCES users(id), FOREIGN KEY (commentID) REFERENCES comments(id))',
  (err, result) => {
    if (err) {
      console.error(`Error creating comments table: ${err.stack}`);
      return;
    }
    console.log('Posts table created successfully');
  }
);

exports.getPosts = function(callback) {
  connection.query('SELECT * FROM posts', function (error, results, fields) {
    if (error) throw error;
    callback(results);
  });
};

exports.addPost = function(post, callback) {
    var sql = 'INSERT INTO posts (creationDate, body, picture, title, commentsIDs, userID) VALUES (?,?,?)';
    connection.query(sql, [post.creationDate, post.body, post.picture, post.title, post.commentsIDs, post.userID], 
    function (error, results, fields) {
        if (error) throw error;
        callback(results);
    });
};

exports.updatePost = function(post, callback) {
    var sql = 'UPDATE posts SET creationDate = ?, body = ?, picture = ? WHERE id = ?';
    connection.query(sql, [post.creationDate, post.body, post.picture, post.title, post.commentsIDs, post.userID, post.id], 
    function (error, results, fields) {
        if (error) throw error;
        callback(results);
    });
};

exports.deletePost = function(id, callback) {
    var sql = 'DELETE FROM posts WHERE id = ?';
    connection.query(sql, [id], 
    function (error, results, fields) {
        if (error) throw error;
        callback(results);
    });
};

