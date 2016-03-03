/**
 * Created by mengxichen on 3/1/16.
 */
(function() {
    angular
        .module("HomeServiceApp")
        .factory("AppointmentService", AppointmentService);


    function AppointmentService() {
            var appointments =[
                {"_id":"000", "vendorId":321, "CompanyName":"Carpet Cleaning LLC","userId":123, "Date": "2015-03-25T12:00:00","price":120},
                {"_id":"010","vendorId":421, "CompanyName":"Plumbing LLC","userId":123, "Date": "2015-06-15T12:00:00","price":230},
                {"_id":"020", "vendorId":421, "CompanyName":"Plumbing LLC","userId":234, "Date": "2015-09-15T12:00:00","price":130},

            ];


        var api = {
            geAllAppointmentsByUserId:geAllAppointmentsByUserId,
            getAllAppointmentsByVendorId:getAllAppointmentsByVendorId,

        }

        return api;

        function geAllAppointmentsByUserId(userId,callback){
            var apps = [];
            for (var i; i < appointments.length; i++){
                if(userId == appointments[i].userId){
                    apps.push(appointments[i]);
                }
            }

            callback(apps);
        }

        function getAllAppointmentsByVendorId(vendorId, callback){
            var apps = [];
            for (var i; i < appointments.length; i++){
                if(vendorId == appointments[i].vendorId){
                    apps.push(appointments[i]);
                }
            }

            callback(apps);
        }

    }


})();