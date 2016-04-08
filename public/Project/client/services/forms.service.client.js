/**
 * Created by mengxichen on 3/2/16.
 */
(function() {
    angular
        .module("HomeServiceApp")
        .factory("FormService", FormService);

    function FormService(){
        var forms =[
            {"_id":"000", "title":"first appraisal","vendorId":321},
            {"_id":"010", "title":"CarpetCleaning","vendorId":321},
            {"_id":"020", "title":"Carpet Try Cleaning","vendorId":321},
            {"_id":"021", "title":"first estimate","vendorId":421},
            {"_id":"021", "title":"Water heater","vendorId":421},
            {"_id":"022", "title":"fixing a leak","vendorId":421}




        ];


        var api = {
            createFormForUser:createFormForUser,
            findAllFormsForUser:findAllFormsForUser,
            deleteFormById:deleteFormById,
            updateFormById:updateFormById
        };

        return api;

        function createFormForUser(vendorId, form, callback){
            var newForm ={
                "_id" : (new Date).getTime(),
                "title" : form.title,
                "vendorId":vendorId


            }

            forms.push(newForm);
            callback(newForm);
        }
        function findAllFormsForUser(vendorId,callback){
            var foundForms = [];
            for (var i = 0; i< forms.length;i++){
                if(forms[i].vendorId == vendorId){
                    foundForms.push(forms[i]);
                }
            }
            callback(foundForms);
        }

        function deleteFormById(formId,callback){
            for (var k =0; k<forms.length;k++){
                if(forms[k]._id == formId){
                    forms.splice(k,1);
                }
            }
            callback(forms);
        }

        function updateFormById(formId, newForm,callback){
            for (var i =0; i<forms.length;i++){
                if(forms[i]._id == formId){
                    forms[i].title=newForm.title;
                    callback(forms[i]);
                }
            }
        }
    }

})();