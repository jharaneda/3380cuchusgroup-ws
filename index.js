const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require('mongoose').set('debug', true);

const MongoClient = require('mongodb').MongoClient;

const CONNECTION_URL = 'mongodb+srv://jharanedac:16801990-4@cluster0.mofs2.mongodb.net/tenants1?retryWrites=true&w=majority';

// const client = new MongoClient(mongooseUrl, { useNewUrlParser: true, useUnifiedTopology: true });
// client.connect(err => {
//   const collection = client.db("test").collection("devices");
//   // perform actions on the collection object
//   client.close();
// });


const app = express();
const port = 8000;
// const mongooseUrl = "mongodb://localhost:27017/tenants1"
// const mongooseUrl = "mongodb://34.207.211.81:27017/tenants1"
// 34.207.211.81

const corsOption = {
  origin: "*",
};

app.use(cors(corsOption));
app.use(bodyParser.json());

const starFlow = require('./routes/starflowRouteJar86.js');
const { mongo } = require("mongoose");

app.use('/tenants', starFlow)
app.use('/tenants/delete', starFlow)
app.use('/incident', starFlow)
app.use('/todoList', starFlow)
app.use('/health', starFlow)
app.use('/health/report', starFlow)
app.use('/', starFlow)

mongoose.connect(CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => app.listen(port, () => console.log(`Server Running on Port: http://localhost:${port}`)))
  .catch((error) => console.log(`${error} did not connect`));



// app.listen(port, () => {
//   console.log(`Web service is listening on ${port}`);
//   console.log(`Connecting to MongoDB on: ${mongooseUrl}`)
//   mongoose.connect(mongooseUrl, {useUnifiedTopology: true, useNewUrlParser: true})
// });


// app.listen(port, () => {
//   console.log(`Web service is listening on ${port}`);
//   console.log(`Connecting to MongoDB on: ${CONNECTION_URL}`)
//   mongoose.connect(CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true })
//   .then(() => app.listen(port, () => console.log(`Server Running on Port: http://localhost:${PORT}`)))
//   .catch((error) => console.log(`${error} did not connect`));
// });