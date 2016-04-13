/**
 * Created by mengxichen on 3/10/16.
 */
module.exports = function(app,userModel,formModel){
    app.get("/api/project/user/:userId/form", findFormsByUserId);
    app.get("/api/project/form/:formId", findFormByFormId);
    app.delete("/api/project/form/:formId", deleteFormByFormId);
    app.post("/api/project/user/:userId/form", createForm);
    app.put("/api/project/form/:formId", updateFormByformId);


    function findFormsByUserId(req,res){
        var userId = req.params.userId;
        var forms = formModel.findFormsByUserId(userId)
            .then(
                function(doc){
                    res.json(doc);
                },
                function(err){
                    res.status(400).send(err);
                }
            );
    }

    function findFormByFormId(req,res){
        var formId = req.params.formId;
        var form = formModel.findFormByFormId(formId)
            .then(
                function(doc){
                    res.json(doc);
                },
                function(err){
                    res.status(400).send(err);
                }
            );
    }


    function deleteFormByFormId(req,res){
        var formId = req.params.formId;
        var forms = formModel.deleteFormByFormId(formId)
            .then(
                function(doc){
                    res.send(doc);
                },

                function(err) {
                    res.status(400).send(err);
                }
            );

    }

    function createForm(req,res){
        var userId = req.params.userId;
        var form = req.body;
        var form = formModel.createForm(userId,form)
            .then(
                function(doc){
                    res.json(doc);
                },
                function (err){
                    res.status(400).send(err);
                }
            );
    }

    function updateFormByformId(req,res){
        var formId = req.params.formId;
        var form = req.body;
        var form = formModel.updateForm(formId,form)
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