const Tenant = require("../models/tenant");

exports.getTenantListJar86 = async (req, res) => {
  console.log("Received get request to get profile list");
  const allTenants = await Tenant.find();
  try {
    res.status(200);
    res.send(allTenants);

    res.status(404);
    res.send({ message: "No tenants found!" });
  } catch {
    res.status(500);
    // res.send({ message: "Ups! Nothing here" });
  }
};

exports.getHealthReport = async (req, res) => {
  console.log("Received get request to get health report");
  var today = new Date(date);
  var dateMinusOne = today.getDate() ;
  var dateMinusTwo = date - 2;
  console.log(today)
  console.log(dateMinusOne)
  console.log(dateMinusTwo)
  //get all the incidents where incidentes[] is not empty
  var healthFilter = await Tenant.find(
    // { _id: id, "healthChecks.date": { $eq: date } },
    {"healthChecks.date": { $lte: date }}, {_id: 1, first_name: 1, last_name: 1, birthdate:1, healthChecks: 1, room: 1 } 
  );
  console.log("healthFilter")
  console.log(healthFilter[0].healthChecks[0].night)

  //this will save the information
  var healthReportList = [];
  //for each profile -> incidents -> each object to get the information and formated to use into the state
  for (var i = 0; i < healthFilter.length; i++) {
    var id = healthFilter[i]._id;
      var names;
      var room;
      var birthdate;
      var night;
      var morning;
      var evening;
      var seenCount = 0;
    for (var h = 0; h < healthFilter[i].healthChecks.length; h++) {
      id = healthFilter[i]._id;
      room = healthFilter[i].room;
      names = healthFilter[i].first_name + " " + healthFilter[i].last_name;
      birthdate = healthFilter[i].birthdate
      night = healthFilter[i].healthChecks[h].night;
      morning = healthFilter[i].healthChecks[h].morning;
      evening =  healthFilter[i].healthChecks[h].evening;
      if(night === 'Not seen' && morning === 'Not seen' && evening === 'Not seen'){
        // console.log("dentro del if que evalua not seen")
        seenCount++;
        // console.log(names + " seencount: " + seenCount);
      }
    }
    healthReportList.push({_id: id, names: names, birthdate: birthdate, seenCount: seenCount, room: room})
    // console.log("healthReportList")
    //   console.log(healthReportList)
  }
  const filter = healthReportList.filter(count => count.seenCount == 3)
  try {
    res.status(200);
    res.send(filter);

    res.status(404);
    res.send({ message: "No incidents found!" });
  } catch {
    res.status(500);
    // res.send({ message: "Ups! Nothing here" });
  }
};


exports.getIncidentReport = async (req, res) => {
  console.log("Received get request to get incident list");

  //get all the incidents where incidentes[] is not empty
  const incidentes = await Tenant.find(
    { incidentes: { $not: { $size: 0 } } },
    { incidentes: 1, _id: 0 }
  );
  //this will save the information
  var incidentsModified = [];
  //for each profile -> incidents -> each object to get the information and formated to use into the state
  for (var i = 0; i < incidentes.length; i++) {
    for (var h = 0; h < incidentes[i].incidentes.length; h++) {
      incidentsModified.push({
        VPD_called: incidentes[i].incidentes[h].VPD_called,
        incident_date: incidentes[i].incidentes[h].incident_date,
        incident_time: incidentes[i].incidentes[h].incident_time,
        type_incident: incidentes[i].incidentes[h].type_incident,
        staff_name: incidentes[i].incidentes[h].staff_name,
        room: incidentes[i].incidentes[h].room,
        comments: incidentes[i].incidentes[h].comments,
      });
    }
  }
  try {
    res.status(200);
    res.send(incidentsModified);

    res.status(404);
    res.send({ message: "No incidents found!" });
  } catch {
    res.status(500);
    // res.send({ message: "Ups! Nothing here" });
  }
};

//not working property not functional, talked with Rahim
exports.getTodoList = function (req, res) {
  console.log("Received get request to get todo list");
  res.header("Content-Type: application/json");
  res.send(JSON.stringify(todoList));
};
var date;
//get all the information to fill health and wellness report
exports.getHealtWellness = async (req, res)=>{
  console.log("Received get request to get healt and wellness list");
  //get the date
  date = new Date();
  if (date.getMonth() < 10)
    var formatDate = `${date.getFullYear()}-0${
      date.getMonth() + 1
    }-${date.getDate()}`;
  else
    var formatDate = `${date.getFullYear()}-${
      date.getMonth() + 1
    }-${date.getDate()}`;
  date = formatDate;

  //insert a new object into healthCheck to initialize the day with its checks, so I can use it as state
  var populateDay = await Tenant.updateMany(
    {"healthChecks.date": { $ne: date } }, {$push: { healthChecks: {
      // {$push: { healthChecks: { //*****este para volver a 0
      date: date,
      // date: "2021-04-10",
      night: "Not seen",
      morning: "Not seen",
      evening: "Not seen"
    }}}
  );
  //find basic tenant information and healthchecks that were already fill out with the updateMany befores
  var healthList = await Tenant.find({"healthChecks.date": date }, {_id: 1, first_name: 1, last_name: 1, birthdate:1, healthChecks: 1, room: 1 })
  res.header("Content-Type: application/json");
  res.send(JSON.stringify(healthList));
};

//************POST REQUESTS (add functions)************
//add the incident into mongoDB
exports.addIncidentReport = async (req, res) => {
  console.log("Received post request to add an incident report");
  //updateOne where room = room added so it will push the information into the array incidentes
  const incident = await Tenant.updateOne(
    { room: req.body.room },
    {
      $push: {
        incidentes: {
          incident_date: req.body.incident_date,
          incident_time: req.body.incident_time,
          type_incident: req.body.type_incident,
          staff_name: req.body.staff_name,
          VPD_called: req.body.VPD_called,
          room: req.body.room,
          comments: req.body.comments,
        },
      },
    }
  );
  const allTenants = await Tenant.find();
  try {
    res.status(200);
    res.send(allTenants);

    res.status(404);
    res.send({ message: "No tenants found!" });
  } catch {
    res.status(500);
    res.send({ message: "Ups! Nothing here" });
  }
};
//functionaly not activated
exports.addTodo = function (req, res) {
  console.log("Received post request to add a todo");
  let newTodo = {
    expiration_date: req.body.expiration_date,
    room_number: req.body.room_number,
    priority: req.body.priority,
    comments: req.body.comments,
  };
  console.log(newTodo);
  todoList.push(newTodo);
  res.header("Content-Type: application/json");
  res.send(JSON.stringify(todoList));
};

//************POST REQUEST UPDATE************
//update the tenant profile
exports.updateProfile = async (req, res) => {
  console.log("Received update profile");
  //updateOne where the ID clicked and set each attribute
  const oneTenant = await Tenant.updateOne(
    { _id: req.body._id },
    {
      $set: {
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        room: req.body.room,
        floor: req.body.floor,
        phone: req.body.phone,
        meds_taken: req.body.meds_taken,
        comments: req.body.comments,
        physical_description: req.body.physical_description,
        birthdate: req.body.birthdate,
      },
    }
  );
  const allTenants = await Tenant.find();
  try {
    res.status(200);
    res.send(allTenants);

    res.status(404);
    res.send({ message: "No tenants found!" });
  } catch {
    res.status(500);
    res.send({ message: "Ups! Nothing here" });
  }
};

//It is called when the user change one select from health and wellness/ This method is a mess I tried several hours, it is not the best I will change it in the future
exports.addHealth = async (req, res) => {
  console.log("Received post request to check a tenant");

  var date = req.body.date;
  var id = req.body._id;
  var night, morning, evening;
  console.log("night:" + req.body.night);
  console.log("morning:" + req.body.morning);
  console.log("evening:" + req.body.evening);
  if (req.body.night != null) {
    var night = req.body.night;
  } else {
    var night = "";
  }

  if (req.body.morning != null) {
    var morning = req.body.morning;
  } else {
    var morning = "";
  }

  if (req.body.evening != null) {
    var evening = req.body.evening;
  } else {
    var evening = "";
  }
  console.log("night:" + night + " morning:" + morning + " evening:" + evening);

  //find the tenant and if the tenant already has an incident created
  var check1 = await Tenant.find(
    { _id: id, "healthChecks.date": { $eq: date } },
    { healthChecks: 1 }
  );
  var checkExists = false;
  //Get all the information from the DB to compare with that is coming from react
  var nightDB, morningDB, eveningDB, dateDB;
  if (check1.length > 0) {
    for (var i = 0; i < check1.length; i++) {
      for (var h = 0; h < check1[i].healthChecks.length; h++) {
        if (check1[i].healthChecks[h].date == date) {
          (dateDB = check1[i].healthChecks[h].date),
            (nightDB = check1[i].healthChecks[h].night),
            (morningDB = check1[i].healthChecks[h].morning),
            (eveningDB = check1[i].healthChecks[h].evening),
            (checkExists = true);
        }
      }
    }
  }
  
  var nightToUpdate;
  var morningToUpdate;
  var eveningToUpdate;
  //this compare if info from mongo or state are different, choose the most updated
  if (checkExists == true) {
    if (night == "") {
      nightToUpdate = nightDB;
    } else {
      nightToUpdate = night;
    }
    if (morning == "") {
      morningToUpdate = morningDB;
    } else {
      morningToUpdate = morning;
    }
    if (evening == "") {
      eveningToUpdate = eveningDB;
    } else {
      eveningToUpdate = evening;
    }
    //update the healthcheck of the same date
    var check = await Tenant.updateOne(
      { _id: id, "healthChecks.date": { $eq: date } },
      {
        $set: {
          healthChecks: {
            date: date,
            night: nightToUpdate,
            morning: morningToUpdate,
            evening: eveningToUpdate,
          },
        },
      }
    );
    //if dont exists create a new one
  } else {
    var check = await Tenant.updateOne(
      { _id: id },
      {
        $push: {
          healthChecks: {
            date: date,
            night: night,
            morning: morning,
            evening: evening,
          },
        },
      }
    );
  }
  const allTenants = await Tenant.find();
  try {
    res.status(200);
    res.send(allTenants);

    res.status(404);
    res.send({ message: "No tenants found!" });
  } catch {
    res.status(500);
    // res.send({ message: "Ups! Nothing here" });
  }
};


let todoList = [
  {
    expiration_date: "",
    room_number: "",
    priority: "",
    comments: "",
  },
];