const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
// const fetch = require("node-fetch")

const app = express();
const port = 8000;

const corsOption = {
  origin: "*",
};

app.use(cors());
app.use(bodyParser.json());
// app.use(fetch)

const starFlow = require('./routes/starflowRouteJar86.js')

app.use('/tenants', starFlow)
app.use('/incident', starFlow)
app.use('/todoList', starFlow)
app.use('/health', starFlow)
app.use('/', starFlow)
// app.use('/weather', starFlow)

app.listen(port, () => {
  console.log(`Web service is listening on ${port}`);
});