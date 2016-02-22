/**
 * Created by mengxichen on 2/20/16.
 */
(function() {
    angular
        .module("FormBuilderApp")
        .factory("FormService", FormService);

    function FormService(){
        var forms =[
            {"_id":"000", "title":"Contacts","userId":123},
            {"_id":"010", "title":"ToDo","userId":123},
            {"_id":"020", "title":"CDs","userId":234}

        ];


        var api = {
            createFormForUser:createFormForUser,
            findAllFormsForUser:findAllFormsForUser,
            deleteFormById:deleteFormById,
            updateFormById:updateFormById
        };

        return api;

        function createFormForUser(userId, form, callback){
            var newForm ={
                "_id" : (new Date).getTime(),
                "title" : form.title,
                "userId":userId


            }

            forms.push(newForm);
            newForm.success(callback);
        }
         function findAllFormsForUser(userId,callback){
             var foundForms = [];
             for (var i = 0; i< forms.length;i++){
                 if(forms[i].userId == userId){
                     foundForms.push(forms[i]);
                 }
             }
             foundForms.success(callback);
         }

        function deleteFormById(formId,callback){
            for (var k =0; k<forms.length;k++){
                if(forms[k]._id == formId){
                    forms.splice(k,1);
                }
            }
            forms.success(callback);
        }

        function updateFormById(formId, newForm,callback){
            for (var i =0; i<forms.length;i++){
                if(forms[i]._id == formId){
                    forms[i].title=newForm.title;
                    fors[i].success(callback);
                }
            }
        }
    }

})();