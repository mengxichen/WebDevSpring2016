/**
 * Created by mengxichen on 2/23/16.
 */
(function(){
    angular
        .module("HomeServiceApp")
        .controller("FieldController", FieldController);

    function FieldController($rootScope,
                             $routeParams,
                             FieldService){
        var userId = $rootScope.currentUser._id;
        var formId = $routeParams.formId;
        console.log(userId);
        console.log(formId);
        //$( "#formSortable" ).sortable();
        var vm = this;
        console.log("hi from field")
        vm.items=["Single Line Text","Email","Multi Line Text Field","Date Field","Dropdown Field","Checkboxes Field","Radio buttons Field"];
        vm.addField = addField;
        vm.removeField = removeField;
        vm.addNewField = addNewField;
        vm.editDialog = editDialog;
        vm.updateField = updateField;
        vm.sortField = sortField;




        function init(){

            FieldService.getFieldsForForm(formId)
                .then(function(response){
                    console.log("from field controller")
                    console.log(response);
                    vm.fields = response;

                });

        }

        init();


        function addNewField(){
            var e = document.getElementById("newField").value;
            console.log(e);
            addField(e);
        }




        function editDialog(field) {
            var fieldId = field._id;
            var fieldType = field.type;
            vm.fieldType = fieldType;
            vm.fieldId = fieldId;//object
            if (fieldType == "TEXT" || fieldType == "TEXTAREA") {
                $("#dialog-1").modal();

            } else if (fieldType == "OPTIONS" || fieldType == "CHECKBOX" || fieldType == "RADIO") {
                $("#dialog-4").modal();
            }else {
                $("#dialog-3").modal();
            }
        }

        function updateField(fieldId, field,fieldType){
            field.type = fieldType;
            fieldId = fieldId.toString();
            FieldService
                .updateField(formId,fieldId,field)
                .then(function(response){
                    if(response){
                        console.log(response);
                        vm.fields = response.fields;

                    }
                });

        }

        function addField(fieldType){
            var field;
            if(fieldType =="TEXT"){
                field = {"label": "New Text Field", "type": "TEXT", "placeholder": "New Field"};

            }else if(fieldType == "TEXTAREA"){
                field = {"label": "New Text Field", "type": "TEXTAREA", "placeholder": "New Field"};

            }else if(fieldType == "DATE") {
                field = {"label": "New Date Field", "type": "DATE"};
            }else if(fieldType == "EMAIL"){
                field  = {"label": "New Text Field", "type": "EMAIL", "placeholder": "EMAIL"};
            }else if(fieldType == "OPTIONS"){
                field = {"label": "New Dropdown", "type": "OPTIONS", "options": [
                    {"label": "Option 1", "value": "OPTION_1"},
                    {"label": "Option 2", "value": "OPTION_2"},
                    {"label": "Option 3", "value": "OPTION_3"}
                ]};

            }else if(fieldType == "CHECKBOX"){
                field = {"label": "New Checkboxes", "type": "CHECKBOX", "options": [
                    {"label": "Option A", "value": "OPTION_A"},
                    {"label": "Option B", "value": "OPTION_B"},
                    {"label": "Option C", "value": "OPTION_C"}
                ]};

            }else{
                field = {"label": "New Radio Buttons", "type": "RADIO", "options": [
                    {"label": "Option X", "value": "OPTION_X"},
                    {"label": "Option Y", "value": "OPTION_Y"},
                    {"label": "Option Z", "value": "OPTION_Z"}
                ]};

            }


            FieldService
                .createFieldForForm(formId,field)
                .then(function(response){
                    if(response){
                        console.log(response);
                        FieldService.getFieldsForForm(formId)
                            .then(function(result){
                                console.log("from field controller")
                                console.log(result);
                                vm.fields = result;

                            });

                    }
                })




        }

        function removeField(field){
            console.log(field);
            var fieldId = field._id.toString();
            console.log(fieldId);
            FieldService
                .deleteFieldFromForm(formId,fieldId)
                .then(function(response){
                    if(response){
                        console.log(response);
                        FieldService.getFieldsForForm(formId)
                            .then(function(fields) {
                                vm.fields = fields;

                        });
                    }
                });
        }


        function sortField(start, end){
            FieldService
                .updateOrder(formId, start,end)
                .then(
                    function(response){
                        console.log(response)
                    },
                    function(err){
                        console.log(err);
                    }
                );


        }

    }
} )();