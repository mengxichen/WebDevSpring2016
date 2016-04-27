/**
 * Created by mengxichen on 3/1/16.
 */
(function() {
    angular
        .module("HomeServiceApp")
        .factory("AppointmentService", AppointmentService);


    function AppointmentService($http,$q) {



        var api = {
            createAppointment:createAppointment,
            deleteAppointmentByAppId:deleteAppointmentByAppId,
            updateAppointmentByAppId:updateAppointmentByAppId,
            findAppointmentByAppId:findAppointmentByAppId,
            getAllAppointmentsByUsername:getAllAppointmentsByUsername,
            getAllAppointmentsByVendorUsername:getAllAppointmentsByVendorUsername,
            findAllAppointments:findAllAppointments

        }

        return api;

        function findAllAppointments(){
            var deferred = $q.defer();

            $http
                .get("/api/project/appointmentAll")
                .success(function(apps){
                    deferred.resolve(apps);
                });

            return deferred.promise;
        }

        function createAppointment(app){
            var deferred = $q.defer();

            $http
                .post("/api/project/appointment",app)
                .success(function(apps){
                    deferred.resolve(apps);
                });

            return deferred.promise;
        }

        function deleteAppointmentByAppId(appId){
            var deferred = $q.defer();

            $http
                .delete("/api/project/appointment" + appId)
                .success(function(app){
                    deferred.resolve(app);
                });

            return deferred.promise;
        }

        function updateAppointmentByAppId(appId, app){
            var deferred = $q.defer();

            $http
                .put("/api/project/appointment/" + appId, app)
                .success(function(app){
                    deferred.resolve(app);
                });

            return deferred.promise;
        }

        function getAllAppointmentsByUsername(username){
            var deferred = $q.defer();

            $http
                .get("/api/project/appointment/" + username)
                .success(function(apps){
                    deferred.resolve(apps);
                });

            return deferred.promise;
        }
        function findAppointmentByAppId(appId){
            var deferred = $q.defer();

            $http
                .get("/api/project/appointment/" + appId)
                .success(function(app){
                    deferred.resolve(app);
                });

            return deferred.promise;
        }

        function getAllAppointmentsByVendorUsername(vendorUsername){
            var deferred = $q.defer();

            $http
                .get("/api/project/appointment/vendor/" + vendorUsername)
                .success(function(apps){
                    deferred.resolve(apps);
                });

            return deferred.promise;
        }

    }


})();