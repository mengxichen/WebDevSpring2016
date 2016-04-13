/**
 * Created by mengxichen on 4/8/16.
 */
var q = require("q");

module.exports = function(mongoose, db) {
    var AppointmentSchema = require("./appointment.schema.server.js")(mongoose);

    var AppointmentModel = mongoose.model('Appointment', AppointmentSchema);

    var api = {

        createAppointment:createAppointment,
        findAllAppointments:findAllAppointments,
        findAppByUserId:findAppByUserId,
        findAppByVendorId:findAppByVendorId,
        findAppointmentById:findAppointmentById,
        updateAppointmentById:updateAppointmentById,
        deleteAppointmentById:deleteAppointmentById

    };

    return api;

    function createAppointment(app){

        var deferred = q.defer();
        AppointmentModel.create(app,function(err,doc){

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

    function findAppByUserId(userId){
        var deferred = q.defer();
        AppointmentModel.findById(userId,function(err,doc){
            if(err){
                deferred.reject(err);

            }else{
                deferred.resolve(doc);
            }
        });

        return deferred.promise;


    }

    function findAppByVendorId(vendoId){
        var deferred = q.defer();
        AppointmentModel.findById(vendorId,function(err,doc){
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