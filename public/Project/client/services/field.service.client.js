/**
 * Created by mengxichen on 3/15/16.
 */
(function(){
    angular
        .module("HomeServiceApp")
        .factory("FieldService",fieldService);

    function fieldService($http,$q){
        var api = {
            createFieldForForm : createFieldForForm,
            getFieldsForForm : getFieldsForForm,
            getFieldForForm : getFieldForForm,
            deleteFieldFromForm : deleteFieldFromForm,
            updateField : updateField,
            updateOrder:updateOrder

        };

        return api;


        function createFieldForForm(formId,field){

            var deferred = $q.defer();

            $http
                .post("/api/project/form/"+ formId + "/field", field)
                .success(function(field){
                    deferred.resolve(field);
                });

            return deferred.promise;
        }

        function getFieldsForForm(formId){
            var deferred = $q.defer();

            $http
                .get("/api/project/form/"+formId + "/field")
                .success(function(fields){
                    deferred.resolve(fields);
                });

            return deferred.promise;
        }

        function getFieldForForm(formId,fieldId){
            var deferred = $q.defer();

            $http
                .get("/api/project/form/"+ formId+"/field/"+ fieldId)
                .success(function(field){
                    deferred.resolve(field);
                });

            return deferred.promise;
        }

        function deleteFieldFromForm(formId,fieldId){
            var deferred = $q.defer();

            $http
                .delete("/api/project/form/"+ formId+"/field/"+ fieldId)
                .success(function(fields){
                    deferred.resolve(fields);
                });

            return deferred.promise;

        }

        function updateField(formId,fieldId,field){
            var deferred = $q.defer();
            console.log("from client service field");
            console.log(field);
            $http
                .put("/api/project/form/"+formId.toString() + "/field/"+ fieldId,field)
                .success(function(fields){
                    deferred.resolve(fields);
                });

            return deferred.promise;
        }

        function updateOrder(formId, startIndex,endIndex){
            var deferred = $q.defer();
            $http
                .put("/api/project/form/"+formId.toString()+"/field?startIndex="+startIndex+"&endIndex="+endIndex)
                .success(function(fields){
                    deferred.resolve(fields);
                });

            return deferred.promise;
        }
    }
})();