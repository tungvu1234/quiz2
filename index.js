const mongoose = require('mongoose');

const express = require('express')
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// require('dotenv').config();

const port = process.env.PORT || 3000;

// Create a Schema object

// Create a Model object


app.get('/', (req, res) => {
  res.sendFile(__dirname + "/form.html")
});

app.post('/', async (req, res) => {
  // get the data from the form
  const uri = req.body.myuri;
  mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
      console.log('Connected to MongoDB');

      const studentSchema = new mongoose.Schema({
        myName: String,
        mySID: String
      });

      const Student = mongoose.model('s24student', studentSchema);

      const studentData = new Student({
        myName: 'Tung VU', 
        mySID: '300386998' 
      });

      studentData.save()
        .then(() => {
          console.log('Data saved to s24students collection');
          res.send('Connected to MongoDB and data saved to s24students collection');
        })
        .catch(err => {
          console.error('Error saving data:', err);
          res.status(500).send('Error saving data');
        });
    })
    .catch(err => {
      console.error('Error connecting to MongoDB:', err);
      res.status(500).send('Error connecting to MongoDB');
    });
  // connect to the database and log the connection

  // add the data to the database

  // send a response to the user
  res.send(`<h1>Document  Added</h1>`);
});

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
