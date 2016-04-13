/**
 * Created by mengxichen on 3/2/16.
 */
(function() {
    angular
        .module("HomeServiceApp")
        .factory("FormService", FormService);

    function FormService(){

        var api = {
            createFormForUser:createFormForUser,
            findAllFormsForUser:findAllFormsForUser,
            deleteFormById:deleteFormById,
            updateFormById:updateFormById

        };

        return api;


        function createFormForUser(userId, form){
            var deferred = $q.defer();

            $http
                .post("/api/project/user/" + userId + "/form",form)
                .success(function(forms){
                    deferred.resolve(forms);
                });

            return deferred.promise;

        }
        function findAllFormsForUser(userId){
            var deferred = $q.defer();

            $http
                .get("/api/project/user/" + userId +"/form")
                .success(function(forms){
                    deferred.resolve(forms);
                });

            return deferred.promise;
        }

        function deleteFormById(formId){

            var deferred = $q.defer();

            $http
                .delete("/api/project/form/" + formId)
                .success(function(form){
                    deferred.resolve(form);
                });

            return deferred.promise;
        }

        function updateFormById(formId, newForm){
            var deferred = $q.defer();

            $http
                .put("/api/project/form/" + formId, newForm)
                .success(function(form){
                    deferred.resolve(form);
                });

            return deferred.promise;
        }
    }


})();