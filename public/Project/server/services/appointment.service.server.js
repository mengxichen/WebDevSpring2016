module.exports = function(app,AppointmentModel){
    app.get("/api/project/appointment/:username",findAllAppByUsername);
    app.get("/api/project/appointment/vendor/:vendorUsername",findAppByVendorUsername);
    app.post("/api/project/appointment", createAppointment);
    app.get("/api/project/appointmentAll", findAllAppointments);
    app.get("/api/project/appointment/:id", findAppointmentById);
    app.put("/api/project/appointment/:id", updateAppointmentById);
    app.delete("/api/project/appointment/:id", deleteAppointmentById);


    function createAppointment(req,res){
        var appointment = req.body;

        AppointmentModel.createAppointment(appointment)
            .then(
                function(doc){
                    res.json(doc);
                },
                function (err){
                    res.status(400).send(err);
                }
            );
    }

    function findAllAppointments(req,res){
        AppointmentModel.findAllAppointments()
            .then(
                function(doc){
                    res.json(doc);
                },
                function(err){
                    res.status(400).send(err);
                }
            );

    }

    function findAllAppByUsername(req,res){
        var username = req.params.username;
        /*        var user = userModel.findUserById(userId);
         res.status(200).json(user);*/
        var apps= AppointmentModel.findAllAppByUsername(username)
            .then(
                function (doc){
                    res.json(doc);
                },
                function(err){
                    res.status(400).send(err);
                }
            )
    }


    function findAppByVendorUsername(req,res){
        var vendorUsername = req.params.vendorUsername;
        var apps = AppointmentModel.findAppByVendorUsername(vendorUsername)
            .then(
                function (doc){
                    res.json(doc);
                },
                function(err){
                    res.status(400).send(err);
                });

    }

    function findAppointmentById(req,res){
        var appId = req.params.id;

        var app= AppointmentModel.findAppointmentById(appId)
            .then(
                function(doc){
                    res.json(doc);
                },

                function(err){
                    res.status(400).send(err);
                }
            )

    }

    function updateAppointmentById(req,res){
        var appId = req.params.id;
        var app = req.body;
        app = AppointmentModel.updateAppointmentById(appId,app)
            .then(
                function(doc){
                    res.json(doc);
                },

                function(err){
                    res.status(400).send(err);
                }
            );
    }

    function deleteAppointmentById(req,res){
        var appId =  req.params.id;
        var apps = AppointmentModel.deleteAppointmentById(appId)
            .then(
                function(doc){
                    return AppointmentModel.findAllAppointments();
                },
                function(err){
                    res.status(400).send(err);
                }
            )
            .then(
                function(apps){
                    res.json(apps);
                },
                function(err){
                    res.status(400).send(err);
                }
            )

    }
};