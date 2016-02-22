/**
 * Created by mengxichen on 2/8/16.
 */
(function(){
    angular
        .module("FormBuilderApp")
        .controller("FormController", FormController);


            function FormController($scope,$rootScope,$location,FormService){
                console.log("here we are from form");
                var forms = FormService.findAllFormsForUser($rootScope.user._id,callback);
                $scope.forms = forms;

                $scope.addForm=addForm;
                $scope.updateForm = updateForm;
                $scope.deleteForm = deleteForm;
                $scope.selectForm = selectForm;



                function addForm(form){
                    FormService.createFormForUser($rootScope.user._id,form,callback);
                }

                function updateForm(newform){
                    FormService.updateFormById($scope.selectedCourseIndex, newform,callback);
                }

                function deleteForm(index){
                    FormService.forms.splice(index, 1);
                }

                function selectForm(index){
                    $scope.selectedFormIndex = index;
                    $scope.newForm = {
                        _id: $scope.forms[index]._id,
                        name: $scope.forms[index].name,
                        userId:$scope.forms[index].userId
                    };
                }
        }



} )();