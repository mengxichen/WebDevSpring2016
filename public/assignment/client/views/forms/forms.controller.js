/**
 * Created by mengxichen on 2/8/16.
 */
(function(){
    angular
        .module("FormBuilderApp")
        .controller("FormController", FormController);


            function FormController($rootScope,
                                    FormService){

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
                        .createFormForUser($rootScope.currentUser._id,form)
                        .then(function (response){
                            console.log(response);
                            vm.newForm=null;
                        });

                    FormService
                        .findAllFormsForUser($rootScope.currentUser._id)
                        .then(function(response){
                            console.log(response);
                            vm.forms= response;
                        });

                }

                function updateForm(form){
                    var formId = form._id;
                    FormService
                        .updateFormById(formId, form)
                        .then(function (response){
                            vm.newForm=null;
                        });


                    FormService
                        .findAllFormsForUser($rootScope.currentUser._id)
                        .then(function(response){
                            console.log("from form controller ")
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

                        });



                    FormService
                        .findAllFormsForUser($rootScope.currentUser._id)
                        .then(function(response) {
                            console.log(response);
                            vm.forms = response;

                        });


                }

                function selectForm(form){
                    vm.newForm = {
                        _id: form._id,
                        title: form.title,
                        userId:form.userId,
                        fields: form.fields,

                    };


                }

        }



} )();