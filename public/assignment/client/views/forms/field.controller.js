/**
 * Created by mengxichen on 2/23/16.
 */
(function(){
    angular
        .module("FormBuilderApp")
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
        vm.updateOrder = updateOrder;




        function init(){
            FieldService.getFieldsForForm(formId)
                .then(function(response){
                    if(response){
                        console.log(response);
                        vm.fields = response;
                    }
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
            vm.fieldId = fieldId;
            if (fieldType == "TEXT" || fieldType == "TEXTAREA") {
                $("#dialog-1").modal();

            } else if (fieldType == "OPTIONS" || fieldType == "CHECKBOXE" || fieldType == "RADIO") {
                $("#dialog-4").modal();
            }else {
                $("#dialog-3").modal();
            }
        }

        function updateField(fieldId, field){
            FieldService
                .updateField(formId,fieldId,field)
                .then(function(response){
                    if(response){
                        console.log(response);
                        vm.fields= response;
                    }
                })
        }

        function addField(fieldType){
            var field;
            if(fieldType =="TEXT"){
                field = {"_id": null, "label": "New Text Field", "type": "TEXT", "placeholder": "New Field"};

            }else if(fieldType == "TEXTAREA"){
                field = {"_id": null, "label": "New Text Field", "type": "TEXTAREA", "placeholder": "New Field"};

            }else if(fieldType == "DATE") {
                field = {"_id": null, "label": "New Date Field", "type": "DATE"};
            }else if(fieldType == "EMAIL"){
                field  = {"_id": null, "label": "New Text Field", "type": "EMAIL", "placeholder": "EMAIL"};
            }else if(fieldType == "OPTIONS"){
                field = {"_id": null, "label": "New Dropdown", "type": "OPTIONS", "options": [
                    {"label": "Option 1", "value": "OPTION_1"},
                    {"label": "Option 2", "value": "OPTION_2"},
                    {"label": "Option 3", "value": "OPTION_3"}
                ]};

            }else if(fieldType == "CHECKBOXE"){
                field = {"_id": null, "label": "New Checkboxes", "type": "CHECKBOXE", "options": [
                    {"label": "Option A", "value": "OPTION_A"},
                    {"label": "Option B", "value": "OPTION_B"},
                    {"label": "Option C", "value": "OPTION_C"}
                ]};

            }else{
                field = {"_id": null, "label": "New Radio Buttons", "type": "RADIO", "options": [
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
                        vm.fields= response;
                    }
                })

        }

        function removeField(field){
            console.log(field);
            var fieldId = field._id;
            console.log(fieldId);
            FieldService
                .deleteFieldFromForm(formId,fieldId)
                .then(function(response){
                    if(response){
                        console.log(response);
                        vm.fields=response;
                    }
                })
        }


        function updateOrder(formId,fields){
            FieldService
                .updateOrder(formId, fields)
                .then(function(response){
                    if(response){
                        vm.fields = response;
                    }
                })
        }

    }
} )();