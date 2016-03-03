/**
 * Created by mengxichen on 2/8/16.
 */
(function(){
    angular
        .module("HomeServiceApp")
        .controller("FormController", FormController);


            function FormController($scope,$rootScope,$location,FormService){
                console.log("here we are from form");
                FormService.findAllFormsForUser($rootScope.user._id,
                    function(response){
                        console.log(response);
                        $scope.forms= response;
                });



                $scope.addForm=addForm;
                $scope.updateForm = updateForm;
                $scope.deleteForm = deleteForm;
                $scope.selectForm = selectForm;



                function addForm(form){
                    FormService.createFormForUser($rootScope.user._id,form,callback);

                    function callback(response){
                        console.log(response);
                        $scope.newForm={}
                    }
                    FormService.findAllFormsForUser($rootScope.user._id,
                        function(response){
                            console.log(response);
                            $scope.forms= response;
                        });

                }

                function updateForm(newform){
                    var formId = newform._id;
                    FormService.updateFormById(formId, newform, callback);

                    function callback(response){
                        console.log(response);
                        $scope.newForm={}
                    }
                    FormService.findAllFormsForUser($rootScope.user._id,
                        function(response){
                            console.log(response);
                            $scope.forms= response;
                        });
                }

                function deleteForm(form){
                    var formId = form._id;
                    FormService.deleteFormById(formId,callback);

                    function callback(response){
                        console.log(response);

                    }

                    FormService.findAllFormsForUser($rootScope.user._id,
                        function(response){
                            console.log(response);
                            $scope.forms= response;
                        });


                }

                function selectForm(form){

                    $scope.newForm = {
                        _id: form._id,
                        title: form.title,
                        userId:form.userId
                    };
                }
        }



} )();