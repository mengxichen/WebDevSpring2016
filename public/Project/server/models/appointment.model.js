/**
 * Created by mengxichen on 4/8/16.
 */
var q = require("q");

module.exports = function(mongoose, db) {
    var AppointmentSchema = require("./../schema/appointment.schema.server.js")(mongoose);

    var AppointmentModel = mongoose.model('Appointment', AppointmentSchema);

    var api = {

        createAppointment:createAppointment,
        findAllAppointments:findAllAppointments,
        findAllAppByUsername:findAllAppByUsername,
        findAppByVendorUsername:findAppByVendorUsername,
        findAppointmentById:findAppointmentById,
        updateAppointmentById:updateAppointmentById,
        deleteAppointmentById:deleteAppointmentById

    };

    return api;

    function createAppointment(app){

        var deferred = q.defer();
        AppointmentModel.create({
            vendorUsername: app.vendorUsername,
            username: app.username,
            startTime: app.startTime,
            endTime: app.endTime,
            price: 30,
            payment:app.payment,
            status:"pending"

        },function(err,doc){

            if(err){
                deferred.reject(err);
            }else{
                deferred.resolve(doc);
            }
        });

        return deferred.promise;
    }

    function findAllAppointments(){
        var deferred = q.defer();
        AppointmentModel.find(function(err,doc){
            console.log(doc);
            if(err){
                deferred.reject(err);
            }else{
                deferred.resolve(doc);
            }
        });

        return deferred.promise;
    }

    function findAllAppByUsername(username){
        var deferred = q.defer();
        AppointmentModel.find({username:username},function(err,doc){
            if(err){
                deferred.reject(err);

            }else{
                deferred.resolve(doc);
            }
        });

        return deferred.promise;


    }

    function findAppByVendorUsername(vendorUsername){
        var deferred = q.defer();
        AppointmentModel.find({vendorUsername:vendorUsername},function(err,doc){
            if(err){
                deferred.reject(err);

            }else{
                deferred.resolve(doc);
            }
        });

        return deferred.promise;


    }

    function findAppointmentById(appId){
        var deferred = q.defer();
        AppointmentModel.findById(appId,function(err,doc){
            if(err){
                deferred.reject(err);

            }else{
                deferred.resolve(doc);
            }
        });

        return deferred.promise;


    }

    function updateAppointmentById(appId,app){
        var deferred = q.defer();
        AppointmentModel.findById(appId,function(err,doc){
                doc.startTime =  app.startTime;
                doc.endTime = app.endTime;
                doc.price = app.price;
                doc.payment_Method = app.payment_Method;
                doc.discount = app.discount;
                doc.status = app.status;
            doc.save(function(err,doc){
                if(err){
                    deferred.reject(err);
                }else{
                    deferred.resolve(doc);
                }

            })
        });
        return deferred.promise;
    }

    function deleteAppointmentById(appId){

        var deferred = q.defer();
        AppointmentModel.remove({_id:appId},
            function(err,result){
                if(err){
                    deferred.reject(err);
                }else{
                    deferred.resolve(result);
                }
            });


        return deferred.promise;
    }


}