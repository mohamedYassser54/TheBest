const express = require('express');
const mysql = require('mysql');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const bodyParser= require('body-parser');
require('dotenv').config();


const app = express();
app.use(cors());

app.options('*', cors());


const port = 8083 || process.env.PORT;

app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// const db = mysql.createPool({
//     host:process.env.DB_HOST,
//     user:process.env.DB_USERNAME,
//     password:process.env.DB_PASSWORD,
//     database:process.env.DB_DBNAME,
//     waitForConnections:true,
//     connectionLimit:10,
//     queueLimit:0
// })

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'thebest',
});



app.get('/',(re,res)=> {
    return res.json("From BAckend Side");
});








app.get('/vote',(req,res)=>{
  const sql = "SELECT *  FROM `candidates`";
  db.query(sql,(err,data)=>{
      if(err) return res.json(err);
      return res.json(data);
  })
})




app.post('/vote', (req, res) => {
  const { id, name, description, img, votes } = req.body;

  const query = `
    INSERT INTO candidates (id, name, description, img, votes)
    VALUES (?, ?, ?, ?, ?)
    ON DUPLICATE KEY UPDATE votes = votes + 1;
  `;

  db.query(query, [id, name, description, img, votes], (err, result) => {
    if (err) {
      console.error(err);
      res.status(500).send('Error saving vote');
    } else {
      res.status(200).send('Vote saved successfully');
    }
  });
});



app.listen(port,()=>{
    console.log("Server is running on port 8083");
})
