 /**
 * Created by mengxichen on 3/10/16.
 */
module.exports = function(app,userModel){
    app.get("/api/project/user",findUserByUsername);
    app.get("/api/project/user",findUserByCredentials);
    app.post("/api/project/user", createUser);
    app.get("/api/project/userAll", findAllUsers);
    app.get("/api/project/user/:id", findUserById);
    app.put("/api/project/user/:id", updateUserById);
    app.delete("/api/project/user/:id", deleteUserById);


    function createUser(req,res){
        var user = req.body;
/*        user = userModel.createUser(user);
        res.status(200).json(user);*/

        user=userModel.createUser(user)
            .then(
                function(doc){
                    res.json(doc);
                },
                function (err){
                    res.status(400).send(err);
                }
            );
    }

    function findAllUsers(req,res){
        var users = userModel.findAllUsers()
            .then(
                function(doc){
                    res.json(doc);
                },
                function(err){
                    res.status(400).send(err);
                }
            );

    }

    function findUserById(req,res){
        var userId = req.params.id;
/*        var user = userModel.findUserById(userId);
        res.status(200).json(user);*/
        var user= userModel.findUserById(userId)
            .then(
                function (doc){
                    res.json(doc);
                },
                function(err){
                    res.status(400).send(err);
                }
            )
    }


    function findUserByUsername(req,res){
        var username = req.query.username;
        var user = userModel.findUserByUsername(username)
            .then(
                function (doc){
                    res.json(doc);
                },
                function(err){
                    res.status(400).send(err);
                });

    }

    function findUserByCredentials(req,res){
        var username = req.query.username;
        var password = req.query.password;
/*        var user = userModel.findUserByCredentials(username,password);
        res.status(200).json(user);*/
        var user= userModel.findUserByCredentials(username,password)
            .then(
                function(doc){
                    res.json(doc);
                },

                function(err){
                    res.status(400).send(err);
                }
            )

    }

    function updateUserById(req,res){
        var userId = req.params.id;
        var user = req.body;
        user = userModel.updateUser(userId,user)
            .then(
                function(doc){
                    res.json(doc);
                },

                function(err){
                    res.status(400).send(err);
                }
            );
    }

    function deleteUserById(req,res){
        var userId =  req.params.id;
        var users = userModel.deleteUser(userId)
            .then(
                function(doc){
                    return userModel.findAllUsers();
                },
                function(err){
                    res.status(400).send(err);
                }
            )
            .then(
                function(users){
                    res.json(users);
                },
                function(err){
                    res.status(400).send(err);
                }
            )

    }
};