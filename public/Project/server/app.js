/**
 * Created by mengxichen on 3/9/16.
 */
module.exports = function(app,mongoose,db){
    var userModel = require("./models/user.model.js")(mongoose, db);
    var formModel = require("./models/form.model.js")(mongoose, db);
    var appointmentModel = require("./models/appointment.model.js")(mongoose,db);
    var reviewModel = require("./models/review.model.js")(mongoose,db);


    var userService = require("./services/user.service.server.js")(app, userModel,formModel);
    var formService = require("./services/form.service.server.js")(app, userModel,formModel);
    var fieldService = require("./services/field.service.server.js")(app, userModel,formModel);



}