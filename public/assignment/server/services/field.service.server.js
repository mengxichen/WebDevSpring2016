/**
 * Created by mengxichen on 3/10/16.
 */
module.exports = function(app,userModel,formModel) {
    app.get("/api/assignment/form/:formId/field", findFieldsByFormId);
    app.get("/api/assignment/form/:formId/field/:fieldId", findFieldByFieldIdFormId);
    app.delete("/api/assignment/form/:formId/field/:fieldId", deleteFieldByFormIdFieldId);
    app.post("/api/assignment/form/:formId/field", createFieldByFormId);
    app.put("/api/assignment/form/:formId/field/:fieldId", updateFieldByFormIdFieldId);
    app.put("/api/assignment/form/:formId/field", updateOrder);



    function findFieldsByFormId(req , res){
        var formId = req.params.formId;
        var form = formModel.findFormByFormId(formId)
            .then(
                function(doc){
                    res.json(doc.fields);
                },
                function(err){
                    res.status(400).send(err);
                }
            );
    }

    function findFieldByFieldIdFormId (req ,res){
        var formId = req.params.formId;
        var fieldId = req.params.fieldId;
        var fields = formModel.findFieldByFieldIdFormId(formId,fieldId)
            .then(
                function(doc){
                    res.json(doc);
                },
                function(err){
                    res.status(400).send(err);
                }
            );
    }

    function deleteFieldByFormIdFieldId (req , res){
        var formId = req.params.formId;
        var fieldId = req.params.fieldId;
        formModel.deleteFieldByFormIdFieldId(formId,fieldId)
            .then(
                function(doc){
                    res.json(doc.result);
                },
                function(err){
                    res.status(400).send(err);
                }
            );
    }

    function createFieldByFormId (req , res){
        var field = req.body;
        var formId = req.params.formId;
        var fields = formModel.createFieldByFormId(formId,field)
            .then(
                function(doc){
                    res.json(doc);
                },
                function(err){
                    res.status(400).send(err);
                }
            );

    }

    function updateFieldByFormIdFieldId(req ,res){
        var fieldId = req.params.fieldId;
        var formId = req.params.formId;
        var field = req.body;
        var fields = formModel.updateFieldByFormIdFieldId(formId,fieldId,field)
            .then(
                function(doc){
                    console.log(doc);
                    res.json(doc);
                },
                function(err){
                    res.status(400).send(err);
                }
            );
    }


    function updateOrder(req,res){
        var formId = req.params.formId;
        var fields = req.body;
        fields = formModel.updateOrder(formId, fields)
            .then(
                function(doc){
                    res.json(doc);
                },
                function(err){
                    res.status(400).send(err);
                }
            );
    }

}