/**
 * Created by mengxichen on 3/10/16.
 */
module.exports = function(app,userModel,formModel){
    app.post("api/assignment/user", createUser);
    app.get("api/assignment/user", findAllUsers);
    app.get("api/assignment/user/:id", findUserById);
    app.get("api/assignment/user?username=username",findUserByUsername);
    app.get("api/assignment/user?username=alice&&password=wonderland",findUserByCredentials);
    app.put("api/assignment/user/:id", updateUserById);
    app.delete("api/assignment/user/:id", deleteUserById);


    function createUser(req,res){
        var user = req.body;
        user = userModel.createUser(user);
        req.session.currentUser = user;
        var users = userModel.findAll();
        res.json(users);
    }

    function findAllUsers(req,res){
        var users = userModel.findAll();
        res.json(users);
    }

    function findUserById(req,res){
        var userId = req.params.id;
        var user = userModel.findUserById(userId);
        res.json(user);
    }


    function findUserByUsername(req,res){
        var username = req.params.username;
        var user = userModel.findUserByUsername(username);
        res.json(user);
    }

    function findUserByCredentials(req,res){
        var username = req.params.username;
        var password = req.params.password;
        var user = userModel.findUserByCredentials(username,password);
        res.json(user);
    }

    function updateUserById(req,res){
        var userId = req.params.id;
        var user = req.body;
        userModel.updateUser(userId,user);
        var users = userModel.findAllUsers();
        res.json(users);
    }

    function deleteUserById(req,res){
        var userId =  req.params.id;
        userModel.deleteUser(userId);
        var users = userModel.findAllUsers();
        res.json(users);
    }
}