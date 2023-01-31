const mysql = require('mysql2');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'root',
  database: 'proyectoNodeDB'
});

connection.connect((err) => {
    if (err) {
    console.error(`Error connecting to the database: ${err.stack}`);
    return;
    }
    console.log(`Connected to the database as id ${connection.threadId}`);
});

connection.query(
    'CREATE DATABASE proyectoNodeDB',
    (err, result) => {
        if (err) {
            console.error(`Error connecting to the database: ${err.stack}`);
            return;
        }
        console.log('Database created successfully');
    }
);
    
