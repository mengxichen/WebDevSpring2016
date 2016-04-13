 /**
 * Created by mengxichen on 3/10/16.
 */

 var passport         = require('passport');
 var LocalStrategy    = require('passport-local').Strategy;
 var GoogleStrategy   = require('passport-google-oauth').OAuth2Strategy;
 var FacebookStrategy = require('passport-facebook').Strategy;


module.exports = function(app,userModel,formModel){

    var auth = authorized;

    app.get("/api/assignment/user",findUserByUsername);
    app.get("/api/assignment/user",findUserByCredentials);
    app.put("/api/assignment/user/:id",updateUserById);
    app.post("/api/assignment/login",passport.authenticate('local'), login );
    app.get("/api/assignment/loggedin", loggedin);
    app.post("/api/assignment/register",register);
    app.post("/api/assignment/logout", logout);


    app.post("/api/assignment/admin/user",auth, createUserByAdmin);
    app.get("/api/assignment/admin/user",auth, findAllUsersByAdmin);
    app.get("/api/assignment/admin/user/:userId", auth,findUserByIdByAdmin);
    app.delete("/api/assignment/admin/user/:userId", auth,deleteUserByIdByAdmin);
    app.put("/appi/assignment/admin/user/:userId",auth,updateUserByAdmin);

    function authorized (req, res, next) {
        if (!req.isAuthenticated()) {
            res.send(401);
        } else {
            next();
        }
    };

    passport.use(new LocalStrategy(localStrategy));
    passport.serializeUser(serializeUser);
    passport.deserializeUser(deserializeUser);


    function localStrategy(username,password,done){
        userModel
            .findUserByCredentials(username,password)
            .then(
                function(user){
                    if(!user){
                        return done(null,false);
                    }

                    return done(null,user);
                },
                function(err){
                    if(err){
                        return done(err);
                    }
                }


            )
    }


    //send it back to client,serialize the entire user object
    /*Configure serialization and desirialization to set and
    retrieve the user identity from the session cookie.
        The cookie keeps the identity in the client browser
    which provides the cookie in every request. The cookie is encrypted
    to avoid tampering on the client side.*/
    function serializeUser(user,done){
        done(null,user);
    }

    function deserializeUser(user,done){
        userModel
            .findUserById(user._id)
            .then(
                function(user){
                    done(null,user);
                },
                function(err){
                    done(err,null);
                }
            );
    }

    function login(req,res){
        var user = req.user;
        res.json(user);
    }

    function loggedin(req,res){
        res.send(req.isAuthenticated() ? req.user : '0');
    }

    function logout(req,res){
        req.logOut();
        res.send(200);
    }

    function register(req,res){
        var newUser = req.body;
        newUser.roles=['student'];
        userModel
            .findUserByUsername(newUser.username)
            .then(
                function(user){
                    if(user){
                        res.json(null);
                    }else{
                        return userModel.createUser(newUser);
                    }
                },
                function(err){
                    res.status(400).send(err);
                }
            )
            .then(
                function(user){
                    if(user){
                        req.login(user, function(err) {
                            if(err) {
                                res.status(400).send(err);
                            } else {
                                res.json(user);
                            }
                        });
                    }
                },
                function(err){
                    res.status(400).send(err);
                }
            );
    }

    function createUserByAdmin(req,res){

        if(newUser.roles && newUser.roles.length > 1) {
            newUser.roles = newUser.roles.split(",");
        } else {
            newUser.roles = ["student"];
        }

        // first check if a user already exists with the username
        userModel
            .findUserByUsername(newUser.username)
            .then(
                function(user){
                    // if the user does not already exist
                    if(user == null) {
                        // create a new user
                        return userModel.createUser(newUser)
                            .then(
                                // fetch all the users
                                function(){
                                    return userModel.findAllUsers();
                                },
                                function(err){
                                    res.status(400).send(err);
                                }
                            );
                        // if the user already exists, then just fetch all the users
                    } else {
                        return userModel.findAllUsers();
                    }
                },
                function(err){
                    res.status(400).send(err);
                }
            )
            .then(
                function(users){
                    res.json(users);
                },
                function(){
                    res.status(400).send(err);
                }
            )
    }

    function findAllUsersByAdmin(req,res){
        if(isAdmin(req.user)){
            userModel.findAllUsers()
                .then(
                    function(doc){
                        res.json(doc);
                    },
                    function(err){
                        res.status(400).send(err);
                    }
                );
        }else{
            res.status(403);
        }


    }

    function findUserByIdByAdmin(req,res){
        if(isAdmin(req.user)){
            var userId = req.params.id;
            var user= userModel.findUserById(userId)
                .then(
                    function (doc){
                        res.json(doc);
                    },
                    function(err){
                        res.status(400).send(err);
                    }
                );
        }else{
            res.status(403);
        }

    }


    function findUserByUsername(req,res){
        var username = req.query.username;
        userModel.findUserByUsername(username)
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
        userModel.updateUser(userId,user)
            .then(
                function(doc){
                    res.json(doc);
                },

                function(err){
                    res.status(400).send(err);
                }
            );
    }

    function updateUserByAdmin(req,res){
        var userId = req.params.id;
        var user = req.body;

        var newUser = req.body;
        if(!isAdmin(req.user)) {
            delete newUser.roles;
        }
        if(typeof newUser.roles == "string") {
            newUser.roles = newUser.roles.split(",");
        }

       userModel.updateUser(userId,user)
            .then(
                function(doc){
                    res.json(doc);
                },

                function(err){
                    res.status(400).send(err);
                }
            );
    }

    function isAdmin(user) {
        if(user.roles.indexOf("admin") >= 0) {
            return true
        }
        return false;
    }

    function deleteUserByIdByAdmin(req,res){
        if(isAdmin(req.user)){
            var userId =  req.params.id;
            userModel.deleteUser(userId)
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
        }else{
            res.status(403);
        }


    }
}