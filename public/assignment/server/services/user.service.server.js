/**
 * Created by mengxichen on 3/10/16.
 */
module.exports = function(app,userModel,formModel){
    app.get("/api/assignment/user?username=username",findUserByUsername);
    //app.get("/api/assignment/user?username=username&password=password",findUserByCredentials);
    app.get("/api/assignment/user",findUserByCredentials);
    app.post("/api/assignment/user", createUser);
    app.get("/api/assignment/userAll", findAllUsers);
    app.get("/api/assignment/user/:id", findUserById);
    app.put("/api/assignment/user/:id", updateUserById);
    app.delete("/api/assignment/user/:id", deleteUserById);


    function createUser(req,res){
        var user = req.body;
        var newUser = userModel.createUser(user);
        res.status(200).json(newUser);
    }

    function findAllUsers(req,res){
        var users = userModel.findAllUsers();
        res.status(200).json(users);
    }

    function findUserById(req,res){
        var userId = req.params.id;
        var user = userModel.findUserById(userId);
        res.status(200).json(user);
    }


    function findUserByUsername(req,res){
        var username = req.query.username;
        var user = userModel.findUserByUsername(username);
        res.status(200).json(user);
    }

    function findUserByCredentials(req,res){
        var username = req.query.username;
        var password = req.query.password;
        var user = userModel.findUserByCredentials(username,password)
        res.json(user);
    }

    function updateUserById(req,res){
        var userId = req.params.id;
        var user = req.body;
        user = userModel.updateUser(userId,user);

        res.status(200).json(user);
    }

    function deleteUserById(req,res){
        var userId =  req.params.id;
        userModel.deleteUser(userId);
        var users = userModel.findAllUsers();
        res.status(200).json(users);
    }
}