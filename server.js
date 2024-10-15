const express = require('express');
const app = express();
const mysql = require('mysql2');
const dotenv = require('dotenv');

app.use(express.json());
dotenv.config();

const db = mysql.createConnection({
    user: process.env.DB_USERNAME,
    host: process.env.DB_HOST,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME

});

// Check if db connection works
db.connect((err) => {
    
    if (err) return console.log("Error connecting to the mysql");
   
    console.log("Connected to mysql successfully")

// Question 1 goes here

    app.get('/patients', (req, res) => {
        db.query('SELECT patient_id, first_name, last_name, date_of_birth FROM patients', (err, results) => {
            if (err){
                console.log('err');
                return res.status(500).json({ error: 'Error retrieving patients' });

            }else{
                res.json(results);
            }
        });

    });
    

// Question 2 goes here
    app.get('/providers', (req, res) => {
        db.query('SELECT first_name, last_name, provider_specialty FROM providers', (err, results) => {
            if(err){
                console.log(err);
                return res.status(500).json({ error: 'Error retrieving providers'});
            }else{
                res.send(results);
            }
        })
    })


// Question 3 goes here
    app.get('/filter', (req, res) => {
        const { first_name } = req.query;
        
        db.query('SELECT * FROM patients WHERE first_name = ?', [first_name], (err, results) => {
            if(err){
                console.log(err);
                return res.status(500).json({error: 'Error filtering patients'});
            }else{
                res.json(results);
            }
        })
    })


// Question 4 goes here
    app.get('/specialty', (req, res) => {
        const { provider_specialty } = req.query;

        db.query('SELECT * FROM providers WHERE provider_specialty = ?', [provider_specialty], (err, results) => {
            if(err){
                console.log(err);
                return res.status(500).json({error: 'Error retrieving provider specialty'});
            }else{
                res.json(results);
            }
        })
    })


// listen to the server
const PORT = 3000
app.listen(PORT, () => {
  console.log(`server is runnig on http://localhost:${PORT}`)

 })

});