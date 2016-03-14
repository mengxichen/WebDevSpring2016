/**
 * Created by mengxichen on 3/9/16.
 */
var mock = require("./form.mock.json");
module.exports = function(){
    var api = {
        createForm : createForm,
        findAllForms : findAllForms,
        findFormByFormid : findFormByFormid,
        updateForm : updateForm,
        deleteFormByFormId : deleteFormByFormId,
        findFormByTitle : findFormByTitle

    }

    return api;

    function createForm(form){
        form._id = "ID_" + (new Date()).getTime();
        mock.push(form);
        return form;
    }

    function findAllForms(){
        return mock;
    }

    function findFormByFormid(formId){
        for(var f in mock){
            if(mock[f]._id === formId){
                return mock[f];
            }
        }

        return null;
    }

    function updateForm(formId, form){
        for(var f in mock){
            if(mock[f]._id === formId){
                mock[f].title = form.title;
                mock[f].fields = form.fields;
                break;
            }
        }
    }

    function deleteFormByFormId(formId){
        for(var f in mock){
            if(mock[f]._id === formId){
                mock.splice(f,1);
            }
        }
    }

    function findFormByTitle(title){
        for(var f in mock){
            if(mock[f].title === title){
                return mock[f];
            }
        }

        return null;
    }

    function findFormsByUserid(userId){
        forms = [];
        for(var f in mock){
            if(mock[f].userId === userId){
                forms.push(mock[f]);
            }
        }

        return forms;
    }


    function findFieldByFieldIdFormId(formId, fieldId){

        for(var f in mock){
            if(mock[f]._id === formId){
                var fields = mock[f].fields;
                for(var i = 0; i < fields.length; i++){
                    if(fields[i]._id === fieldId){
                        return fields[i];
                    }
                }
            }
        }
        return null;
    }

    function deleteFieldByFormIdFieldId(formId,fieldId) {
        for (var f in mock) {
            if (mock[f]._id === formId) {
                for (var i in mock[f].fields) {
                    if (mock[f].fields[i]._id === fieldId) {
                        mock[f].fields.splice(i, 1);

                    }
                }
            }
        }


    }

    function createFieldByFormId(formId,field){
        for (var f in mock) {
            if(mock[f]._id === formId){
                field._id ="ID_" + (new Date()).getTime();
                mock[f].fields.push(field);
                return mock[f].fields;
            }
        }
    }

    function updateFieldByFormIdFieldId(formId,fieldId,field){
        for (var f in mock) {
            if (mock[f]._id === formId) {
                for (var i in mock[f].fields) {
                    if (mock[f].fields[i]._id === fieldId) {
                        mock[f].fields[i] = field;
                        return mock[f].fields;

                    }
                }
            }
        }

    }

}





