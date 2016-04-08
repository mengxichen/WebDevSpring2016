/**
 * Created by mengxichen on 4/8/16.
 */
var q = require("q");

module.exports = function(mongoose, db) {
    var AppointmentSchema = require("./appointment.schema.server.js")(mongoose);

    var AppointmentModel = mongoose.model('Appointment', AppointmentSchema);

    var api = {



    };

    return api;


}