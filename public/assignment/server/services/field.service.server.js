/**
 * Created by mengxichen on 3/10/16.
 */
module.exports = function(app,userModel,formModel) {
    app.get("/api/assignment/form/:formId/field", findFieldsByFormId);
    app.get("/api/assignment/form/:formId/field/:fieldId", findFieldByFieldIdFormId);
    app.delete("/api/assignment/form/:formId/field/:fieldId", deleteFieldByFormIdFieldId);
    app.post("/api/assignment/form/:formId/field", createFieldByFormId);
    app.put("/api/assignment/form/:formId/field/:fieldId", updateFieldByFormIdFieldId);
    app .put("/api/assignment/form/:formId/field", updateOrder);



    function findFieldsByFormId(req , res){
        var formId = req.params.formId;
        var form = formModel.findFormByFormid(formId);
        res.status(200).json(form.fields);

    }

    function findFieldByFieldIdFormId (req ,res){
        var formId = req.params.formId;
        var fieldId = req.params.fieldId;
        var fields = formModel.findFieldByFieldIdFormId(formId,fieldId);
        res.status(200).json(fields);

    }

    function deleteFieldByFormIdFieldId (req , res){
        var formId = req.params.formId;
        var fieldId = req.params.fieldId;
        var fields = formModel.deleteFieldByFormIdFieldId(formId,fieldId);
        res.status(200).json(fields);
    }

    function createFieldByFormId (req , res){
        var field = req.body;
        var formId = req.params.formId;
        var fields = formModel.createFieldByFormId(formId,field);
        res.status(200).json(fields);

    }

    function updateFieldByFormIdFieldId(req ,res){
        var fieldId = req.params.fieldId;
        var formId = req.params.formId;
        var field = req.body;
        var fields = formModel.updateFieldByFormIdFieldId(formId,fieldId,field);
        res.status(200).json(fields);
    }


    function updateOrder(req,res){
        var formId = req.params.formId;
        var fields = req.body;
        fields = formModel.updateOrder(formId, fields);
        res.status(200).json(fields);

    }

}