/**
 * Created by mengxichen on 3/10/16.
 */
module.exports = function(app,formModel){
    app.get("/api/assignment/user/:userId/form", findFormsByUserId);
    app.get("/api/assignment/form/:formId", findFormByFormId);
    app.delete("/api/assignment/form/:formId", deleteFormByFormId);
    app.post("/api/assignment/user/:userId/form", createForm);
    app.put("/api/assignment/form/:formId", updateFormByformId);


    function findFormsByUserId(req,res){
        var userId = req.params.userId;
        var forms = formModel.findFormsByUserId(userId);
        res.status(200).json(forms);
    }

    function findFormByFormId(req,res){
        var formId = req.params.formId;
        var form = formModel.findFormByFormid(formId);
        res.status(200).json(form);
    }


    function deleteFormByFormId(req,res){
        var formId = req.params.formId;
        formModel.deleteFormByFormId(formId);
        res.status(200);

    }

    function createForm(req,res){
        var userId = req.params.userId;
        var form = req.body;
        var form = formModel.createForm(userId,form);
        res.status(200).json(form);
    }

    function updateFormByformId(req,res){
        var formId = req.params.formId;
        var form = req.body;
        formModel.updateForm(formId,form);
        res.status(200);
    }

}