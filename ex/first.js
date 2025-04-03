const mysql = require('mysql2');
const http = require('http')
// MySQL Connection Setup
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'Nhoj#1019',
  database: 'hosteledge'
});
connection.connect(err => {
  if (err) {
    console.error('Error connecting to MySQL:', err);
    return;
  }
  console.log('Connected to MySQL!');
});
// Connect to MySQL
http.createServer((req,res)=>{
  res.writeHead(200, { 'Content-Type': 'application/json' });
    // Sample Query Execution
    connection.query('SELECT * FROM users', (err, results) => {
      if (err) {
        console.error('Error executing query:', err);
        return;
      }
      res.write(JSON.stringify(results));
      
      // Close Connection
      connection.end();
      res.end();
    });
}).listen(8080);

