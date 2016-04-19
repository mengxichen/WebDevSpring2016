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
        findFormByFormId : findFormByFormId,
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
            fields:[],
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
                deferred.reject(err);
            }else{
                deferred.resolve(doc);
            }
        });
        return deferred.promise;

    }

    function findFormByFormId(formId){
        /*for(var f in mock){
            if(mock[f]._id === formId){
                return mock[f];
            }
        }

        return null;*/

        var deferred = q.defer();
        FormModel.findById(formId,function(err,doc){
            if(err){
                deferred.reject(err);
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
            doc.title = form.title;
            doc.fields = form.fields;
            doc.update = new date();
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
                deferred.resolve(doc);
            }
        });

        return deferred.promise;


    }

    function findFormsByUserId(userId){
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

        var deferred = q.defer();
        FormModel.findOne({_id:formId},
            function(err,doc){
                if(err){
                    deferred.reject(err);
                }

                if(doc){
                    FieldModel.findOne({_id:fieldId},
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
        var deferred= q.defer();
        FormModel.findOne({_id:formId},function(err,doc) {
            if (err) {
                deferred.reject(err);
            }

            if (doc) {

                for(var i = 0; i < doc.fields.length;i++){
                    if(doc.fields[i]._id.toString() == fieldId){
                        doc.fields.splice(i,1);
                        break;
                    }
                }
                doc.save(function(err1,doc1){
                    if(err1){
                        deferred.reject(err1);
                    }else{

                        deferred.resolve(doc1);
                    }
                });

                FieldModel.remove({_id: fieldId}, function (err, doc) {
                    if (err) {
                        deferred.reject(err);
                    }
                    if (doc) {
                        deferred.resolve(doc);
                    }
                });


            }
        });

        return deferred.promise;
    }

    function createFieldByFormId(formId,field){

        var deferred = q.defer();
        FormModel.findOne({_id:formId},function(err,doc){
            if(err){
                deferred.reject(err);
            }else{
                var newfield = new FieldModel({
                    label:field.label,
                    type:field.type,
                    placeholder:field.placeholder,
                    options:field.options
                });

                newfield.save(function(err1,doc1){
                    if(err1){
                        deferred.reject(err1);
                    }else{

                        deferred.resolve(doc1);
                    }
                });

                doc.fields.push(newfield);
                doc.save(function(err2,doc2){
                    if(err){
                        deferred,reject(err2);
                    }else{
                        deferred.resolve(doc2);
                    }
                })


            }
        });



        return deferred.promise;
    }

    function updateFieldByFormIdFieldId(formId,fieldId,field){
        console.log(fieldId);
        var deferred = q.defer();

        var type = field.type;
        var updatedField;
        var ObjectId = mongoose.Types.ObjectId;
        if (type == "TEXT" || type == "TEXTAREA") {
            updatedField = {
                label: field.label,
                type: field.type,
                placeholder: field.placeholder,
                options:[]
            };
        } else if (type == "OPTIONS" || type == "CHECKBOX" || type == "RADIO") {
            updatedField = {
                label: field.label,
                type: field.type,
                options: processOptions(field.options)
            };
        } else {
            updatedField = {
                label: field.label,
                type: field.type,
                options:[]

            };
        }

        updatedField = new FieldModel(updatedField);
        FormModel.findOneAndUpdate(

            {_id: new ObjectId(formId), 'fields._id': new ObjectId(fieldId)},
            {$set: {'fields.$': updatedField}},
            {new: true},
            function(err, doc) {
                if (!err) {

                    deferred.resolve(doc)
                } else {
                    deferred.reject(err);
                }
            }
        );

        return deferred.promise;

    }

    function processOptions(s){
        //'washington:wa\nSeattle:SEATAC'
        var arr = s.split("\n");
        var options = [];
        for (var i = 0; i < arr.length; i++){
            var pairArr = arr[i].split(":");
            options.push({label: pairArr[0], value: pairArr[1]});
        }
        console.log("print options");
        console.log(options);
        return options;
    }

    function updateOrder(formId,startIndex, endIndex){
        return FormModel
            .findById(formId)
            .then(
                function(form) {
                    form.fields.splice(endIndex, 0, form.fields.splice(startIndex, 1)[0]);

                    form.save();
                }
            );
    }

}





