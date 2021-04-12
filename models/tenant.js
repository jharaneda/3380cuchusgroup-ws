const mongoose = require("mongoose");

// (tenants[tenantIndex].first_name = req.body.first_name),
//     (tenants[tenantIndex].last_name = req.body.last_name),
//     (tenants[tenantIndex].room = req.body.room),
//     (tenants[tenantIndex].floor = req.body.floor),
//     (tenants[tenantIndex].phone = req.body.phone),
//     (tenants[tenantIndex].meds_taken = req.body.meds_taken),
//     (tenants[tenantIndex].comments = req.body.comments),
//     (tenants[tenantIndex].phsycal_description = req.body.phsycal_description),
//     (tenants[tenantIndex].birthdate = req.body.birthdate),

const tenantSchema = mongoose.Schema(
  {
    first_name: String,
    last_name: String,
    room: Number,
    floor: String,
    phone: String,
    meds_taken: String,
    comments: String,
    description: String,
    birthdate: String,
    incidentes: Array,
    healthChecks: Array
  },
  {
    versionKey: false, //Turn off versioning
  }
);

module.exports = mongoose.model("tenants1", tenantSchema);
