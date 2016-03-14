/**
 * Created by mengxichen on 3/10/16.
 */
module.exports = function(app,userModel,formModel) {
    app.get("/api/assignment/form/:formId/form", findFieldsByFormId);
    app.get("/api/assignment/form/:formId/form/field/:fieldId", findFieldByFieldIdFormId);
    app.delete("/api/assignment/form/:formId/field/:fieldId", deleteFieldByFormIdFieldId);
    app.post("/api/assignment/form/:formId/field", createFieldByFormId);
    app.put("/api/assignment/form/:formId/form/field/:fieldId", updateFieldByFormIdFieldId);



    function findFieldsByFormId(req , res){
        var formId = req.params.formId;
        var form = formModel.findFormByFormid(formId);
        if(form){
            res.json(form.fields);
        }

        res.send(404);
    }

    function findFieldByFieldIdFormId (req ,res){
        var formId = req.params.formId;
        var fieldId = req.params.fieldId;
        var fields = formModel.findFieldByFieldIdFormId(formId,fieldId);
        res.json(fields);

    }

    function deleteFieldByFormIdFieldId (req , res){
        var formId = req.params.formId;
        var fieldId = req.params.fieldId;
        formModel.deleteFieldByFormIdFieldId(formId,fieldId);
        res.send(200)
    }

    function createFieldByFormId (req , res){
        var field = req.body;
        var formId = req.params.formId;
        var fields = formModel.createFieldByFormId(fordId,field);
        res.json(fields);

    }

    function updateFieldByFormIdFieldId(req ,res){
        var fieldId = req.params.fieldId;
        var formId = req.params.formId;
        var field = req.body;
        var fields = formModel.updateFieldByFormIdFieldId(formId,fieldId,field);
        res.json(fields);
    }




}