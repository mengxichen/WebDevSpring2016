module.exports = function(app,AppointmentModel){
    app.get("/api/project/appointment",findAppByUserId);
    app.get("/api/project/appointment/vendor",findAppByVendorId);
    app.post("/api/project/appointment", createAppointment);
    app.get("/api/project/appointmentAll", findAllAppointments);
    app.get("/api/project/appointment/:id", findAppointmentById);
    app.put("/api/project/appointment/:id", updateAppointmentById);
    app.delete("/api/project/appointment/:id", deleteAppointmentById);


    function createAppointment(req,res){
        var appointment = req.body;

        appointment=AppointmentModel.createAppointment(appointment)
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
        var apps = AppointmentModel.findAllAppointments()
            .then(
                function(doc){
                    res.json(doc);
                },
                function(err){
                    res.status(400).send(err);
                }
            );

    }

    function findAppByUserId(req,res){
        var userId = req.params.id;
        /*        var user = userModel.findUserById(userId);
         res.status(200).json(user);*/
        var apps= AppointmentModel.findAppByUserId(userId)
            .then(
                function (doc){
                    res.json(doc);
                },
                function(err){
                    res.status(400).send(err);
                }
            )
    }


    function findAppByVendorId(req,res){
        var vendorId = req.query.vendorId;
        var apps = AppointmentModel.findAppByVendorId(vendorId)
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