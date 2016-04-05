/**
 * Created by mengxichen on 3/9/16.
 */
var mock = require("./form.mock.json");

var q = require("q");
module.exports = function(mongoose, db){
    var FormSchema = require("./form.schema.server.js")(mongoose);
    var FieldSchema = require("./field.schema.server.js")(mongoose);

    var FormModel = mongoose.model("Form",FormSchema);
    var FieldModel  = mongoose.model("Field", FieldSchema);

    var api = {
        createForm : createForm,
        findAllForms : findAllForms,
        findFormByFormid : findFormByFormid,
        updateForm : updateForm,
        deleteFormByFormId : deleteFormByFormId,
        findFormByTitle : findFormByTitle,
        findFormsByUserId:findFormsByUserId,
        findFieldByFieldIdFormId:findFieldByFieldIdFormId,
        deleteFieldByFormIdFieldId:deleteFieldByFormIdFieldId,
        createFieldByFormId:createFieldByFormId,
        updateFieldByFormIdFieldId:updateFieldByFormIdFieldId,
        updateOrder:updateOrder

    }

    return api;

    function createForm(userId,form){
        var form = new FormModel({
            userId:userId,
            title:form.title,
            fields:form.fields,
            created:new Date(),
            update:new Date()
        });

        var deferred = q.defer();
        form.save(function (err,doc){
            if(err){
                deferred.reject(err)
            }else{
                deferred.resolve(doc);
            }

        });
        return deferred.promise;
    }

    function findAllForms(){
        //return mock;
        var deferred = q.defer();
        FormModel.find(function(err,doc){
            if(err){
                deferred.reject(err)
            }else{
                deferred.resolve(doc);
            }
        });
        return deferred.promise;

    }

    function findFormByFormid(formId){
        /*for(var f in mock){
            if(mock[f]._id === formId){
                return mock[f];
            }
        }

        return null;*/

        var deferred = q.defer();
        FormModel.find({_id : formId},function(err,doc){
            if(err){
                deferred.reject(err)
            }else{
                deferred.resolve(doc);
            }
        });

        return deferred.promise;

    }

    function updateForm(formId, form){
      /*  for(var f in mock){
            if(mock[f]._id === formId){
                mock[f].title = form.title;
                mock[f].fields = form.fields;
                return mock[f];
            }
        }
        return null;*/

        var deferred = q.defer();
        FormModel.findById(formId,function(err,doc){
            doc.title = user.title;
            doc.fields = user.fields;
            doc.save(function(err,doc){
                if(err){
                    deferred.reject(err);
                }else{
                    deferred.resolve(doc);
                }

            })
        });
        return deferred.promise;

    }

    function deleteFormByFormId(formId){
        /*for(var f in mock){
            if(mock[f]._id === formId){
                mock.splice(f,1);
            }
        }*/

        var deferred = q.defer();
        FormModel.remove({_id:formId},
            function(err,result){
                if(err){
                    deferred.reject(err);
                }else{
                    deferred.resolve(result);
                }
            });


        return deferred.promise;
    }

    function findFormByTitle(title){
        /*for(var f in mock){
            if(mock[f].title === title){
                return mock[f];
            }
        }

        return null;*/

        var deferred = q.defer();
        FormModel.find({title:title},function(err,doc){
            if(err){
                deferred.reject(err);
            }else{
                deferred.resolve(result);
            }
        });

        return deferred.promise;


    }

    function findFormsByUserId(userId){
        /*console.log(userId);
        console.log("here here here");
        forms = [];

        for(var f in mock){
            if(mock[f].userId == userId){
                forms.push(mock[f]);

            }
        }
        console.log(forms);
        return forms;*/

        var deferred = q.defer();
        FormModel.find({userId:{$in:userId}},function(err,forms){
            if(err){
                deferred.reject(err);
            }else{
                deferred.resolve(forms);
            }
        })

        return deferred.promise;
    }


    function findFieldByFieldIdFormId(formId, fieldId){

        /*for(var f in mock){
            if(mock[f]._id === formId){
                var fields = mock[f].fields;
                for(var i = 0; i < fields.length; i++){
                    if(fields[i]._id === fieldId){
                        return fields[i];
                    }
                }
            }
        }
        return null;*/

        var deferred = q.defer();
        FormModel.findOne({_id:formId},
            function(err,doc){
                if(err){
                    deferred.reject(err);
                }

                if(doc){
                    doc.fields.findOne({_id:fieldId},
                        function(err,doc){
                            if(err){
                                deferred.reject(err);
                            }else{
                                deferred.resolve(doc);
                            }
                        })
                }
            });
        return deferred.promise;
    }

    function deleteFieldByFormIdFieldId(formId,fieldId) {
     /*   for (var f in mock) {
            if (mock[f]._id == formId) {
                for (var i in mock[f].fields) {
                    console.log(mock[f].fields);
                    if (mock[f].fields[i]._id == fieldId) {
                        mock[f].fields.splice(i, 1);
                        console.log(mock[f].fields)
                        return mock[f].fields;

                    }
                }
            }
        }
        return null;
*/

        var deferred= q.defer();
        FormModel.findOne({_id:formId},function(err,doc){
            if(err){
                deferred.reject(err);
            }

            if(doc){
                doc.fields.remove({_id:fieldId},function(err,doc){
                    if(err){
                        deferred.reject(err);
                    }else{
                        deferred.resolve(doc);
                    }

                });
            }
        });
    }

    function createFieldByFormId(formId,field){
       /* for (var f in mock) {
            if(mock[f]._id === formId){
                field._id ="ID_" + (new Date()).getTime();
                mock[f].fields.push(field);
                return mock[f].fields;
            }
        }

        return null;*/

        var deferred = q.defer();
        FormModel.findOne({_id:formId},function(err,doc){
            if(err){
                deferred.reject(err);
            }else{
                FieldModel.create(field,function(err,newfield){
                    if(err){
                        deferred.reject(err);
                    }else{
                        doc.fields.push(newfield);
                        doc.save(function(err2,doc2){
                            if(err2){
                                deferred.reject(err2);
                            }else{
                                deferred.resolve(doc2);
                            }
                        })
                    }
                })
            }
        })

        return deferred.promise;
    }

    function updateFieldByFormIdFieldId(formId,fieldId,field){
        for (var f in mock) {
            if (mock[f]._id === formId) {
                for (var i in mock[f].fields) {
                    if (mock[f].fields[i]._id === fieldId) {
                        var type = mock[f].fields[i].type;
                        if( type == "TEXT" || type =="TEXTAREA"){
                            mock[f].fields[i] =
                            {
                                "_id": mock[f].fields[i]._id,
                                "label": field.label,
                                "type": type,
                                "placeholder": field.placeholder
                            };
                        }else if(type == "OPTIONS" || type == "CHECKBOXE" || type == "RADIO"){
                            console.log(field.options);
                            mock[f].fields[i] =
                            {
                                "_id": mock[f].fields[i]._id,
                                "label": field.label,
                                "type": type,
                                "options": processOptions(field.options)
                            };
                        }else{
                            mock[f].fields[i] =
                            {
                                "_id": mock[f].fields[i]._id,
                                "label": field.label,
                                "type": type
                            };
                        }





                        console.log("from update fields");
                        console.log(mock[f].fields);
                        return mock[f].fields;

                    }
                }
            }
        }
        return null;

    }

    function processOptions(s){
        //'washington:wa\nSeattle:SEATAC'
        var arr = s.split("\n");
        var options = [];
        for ( i = 0; i < arr.length; i++){
            var pairArr = arr[i].split(":");
            options.push({"label": pairArr[0], "value": pairArr[1]});
        }

        return options;
    }

    function updateOrder(formId,fields){
        for (var f in mock) {
            if(mock[f]._id === formId){
                mock[f].fields = fields;
                return mock[f].fields;
            }
        }

        return null;
    }

}





