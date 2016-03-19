/**
 * Created by mengxichen on 2/23/16.
 */
(function(){
    angular
        .module("FormBuilderApp")
        .controller("FieldController", FieldController);

    function FieldController($routeParams,
                             FieldService){
        var userId = $routeParams.userId;
        var formId = $routeParams.formId;
        //$( "#sortable" ).sortable();
        var vm = this;
        console.log("hi from field")
        vm.items=["Single Line Text","Multi Line Text Field","Date Field","Dropdown Field","Checkboxes Field","Radio buttons Field"];
        vm.addField = addField;
        vm.removeField = removeField;
        vm.editDialog = editDialog;



        function init(){

            FieldService.getFieldsForForm(formId)
                .then(function(response){
                    if(response.data){
                        vm.fields = response.data;
                    }
                });

        }

        init();

        $( "#dialog-1" ).dialog({
            autoOpen: false,
        });
        $( "#dialog-2" ).dialog({
            autoOpen: false,
        });

        $( "#dialog-3" ).dialog({
            autoOpen: false,
        });

        $( "#dialog-4" ).dialog({
            autoOpen: false,
        });

        $( "#dialog-5" ).dialog({
            autoOpen: false,
        });

        $( "#dialog-6" ).dialog({
            autoOpen: false,
        });


        function editDialog(fieldType) {
            if (fieldType == "Single Line Text") {
                $("#dialog-1").dialog("open");

            } else if (fieldType == "Multi Line Text Field") {
                $("#dialog-2").dialog("open");

            } else if (fieldType == "Date Field") {
                $("#dialog-3").dialog("open");

            } else if (fieldType == "Dropdown Field") {
                $("#dialog-4").dialog("open");

            } else if (fieldType == "Checkboxes Field") {
                $("#dialog-5").dialog("open");

            } else {
                $("#dialog-6").dialog("open");
            }
        }

        function addField(fieldType){
            var field;
            if(fieldType =="Single Line Text"){
                field = {"_id": null, "label": "New Text Field", "type": "TEXT", "placeholder": "New Field"};

            }else if(fieldType == "Multi Line Text Field"){
                field = {"_id": null, "label": "New Text Field", "type": "TEXTAREA", "placeholder": "New Field"};

            }else if(fieldType == "Date Field"){
                field = {"_id": null, "label": "New Date Field", "type": "DATE"};
            }else if(fieldType == "Dropdown Field"){
                field = {"_id": null, "label": "New Dropdown", "type": "OPTIONS", "options": [
                    {"label": "Option 1", "value": "OPTION_1"},
                    {"label": "Option 2", "value": "OPTION_2"},
                    {"label": "Option 3", "value": "OPTION_3"}
                ]};

            }else if(fieldType == "Checkboxes Field"){
                field = {"_id": null, "label": "New Checkboxes", "type": "CHECKBOXES", "options": [
                    {"label": "Option A", "value": "OPTION_A"},
                    {"label": "Option B", "value": "OPTION_B"},
                    {"label": "Option C", "value": "OPTION_C"}
                ]};

            }else{
                field = {"_id": null, "label": "New Radio Buttons", "type": "RADIOS", "options": [
                    {"label": "Option X", "value": "OPTION_X"},
                    {"label": "Option Y", "value": "OPTION_Y"},
                    {"label": "Option Z", "value": "OPTION_Z"}
                ]};

            }


            FieldService
                .createFieldForForm(formId,field)
                .then(function(response){
                    if(response.data){
                        vm.fields= response.data;
                    }
                })

        }

        function removeField(field){
            var fieldId = field._id;
            FieldService
                .deleteFieldFromForm(formId,fieldId)
                .then(function(response){
                    if(response.data){
                        vm.fields=response.data;
                    }
                })
        }
    }
} )();