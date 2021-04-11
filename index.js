const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require('mongoose').set('debug', true);


const app = express();
const port = 8000;
const mongooseUrl = "mongodb://localhost:27017/tenants1"

const corsOption = {
  origin: "*",
};

app.use(cors(corsOption));
app.use(bodyParser.json());

const starFlow = require('./routes/starflowRouteJar86.js')

app.use('/tenants', starFlow)
app.use('/incident', starFlow)
app.use('/todoList', starFlow)
app.use('/health', starFlow)
app.use('/', starFlow)

app.listen(port, () => {
  console.log(`Web service is listening on ${port}`);
  console.log(`Connecting to MongoDB on: ${mongooseUrl}`)
  mongoose.connect(mongooseUrl, {useUnifiedTopology: true, useNewUrlParser: true})
});