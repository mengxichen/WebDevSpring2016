/**
 * Created by mengxichen on 2/8/16.
 */
(function(){
    angular
        .module("FormBuilderApp")
        .controller("FormController", FormController);


            function FormController($rootScope,
                                    $location,
                                    FormService,
                                    UserService){

                var vm = this;

                vm.addForm=addForm;
                vm.updateForm = updateForm;
                vm.deleteForm = deleteForm;
                vm.selectForm = selectForm;


                function init(){
                    console.log("here we are from form");
                    FormService
                        .findAllFormsForUser($rootScope.currentUser._id)
                        .then(function(response){
                            console.log(response);
                            vm.forms= response;
                        });


                }
                init();



                function addForm(form){
                    FormService
                        .createFormForUser($rootScope.user._id,form)
                        .then(function (response){
                            console.log(response);
                            vm.newForm={}
                        });

                    FormService
                        .findAllFormsForUser($rootScope.user._id)
                        .then(function(response){
                            console.log(response);
                            vm.forms= response;
                        });

                }

                function updateForm(newform){
                    var formId = newform._id;
                    FormService
                        .updateFormById(formId, newform)
                        .then(function (response){
                            console.log(response);
                            vm.newForm={}
                        });


                    FormService
                        .findAllFormsForUser($rootScope.user._id)
                        .then(function(response){
                            console.log(response);
                            vm.forms= response;
                        });
                }

                function deleteForm(form){
                    var formId = form._id;
                    FormService
                        .deleteFormById(formId)
                        .then(function (response){
                            console.log(response);

                        })



                    FormService
                        .findAllFormsForUser($rootScope.user._id)
                        .then(function(response) {
                            console.log(response);
                            vm.forms = response;

                        });


                }

                function selectForm(form){
                    vm.newForm = {
                        _id: form._id,
                        title: form.title,
                        userId:form.userId
                    };
                }
        }



} )();