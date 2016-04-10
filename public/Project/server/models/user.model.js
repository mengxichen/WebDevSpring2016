/**
 * Created by mengxichen on 3/9/16.
 */
//var mock  = require("./user.mock.json");
var q = require("q");

module.exports = function(mongoose, db){
    var UserSchema = require("./user.schema.server.js")(mongoose);

    var UserModel = mongoose.model('Customer',UserSchema);

    var api = {
        createUser : createUser,
        findAllUsers : findAllUsers,
        findUserById : findUserById,
        updateUser : updateUser,
        deleteUser : deleteUser,
        findUserByUsername : findUserByUsername,
        findUserByCredentials : findUserByCredentials


    };

    return api;


    //accept an instance object, return collection
    function createUser(user){
       /* user._id = "ID_" + (new Date()).getTime();
        mock.push(user);
        return user;*/

        var deferred = q.defer();
        UserModel.create(user,function(err,doc){

            if(err){
                deferred.reject(err);
            }else{
                deferred.resolve(doc);
            }
        });

        return deferred.promise;
    }

    //return collection
    function findAllUsers(){
        //return mock;
        var deferred = q.defer();
        UserModel.find(function(err,doc){
            console.log(doc);
            if(err){
                deferred.reject(err);
            }else{
                deferred.resolve(doc);
            }
        });

        return deferred.promise;
    }

    //return a user
    function findUserById(userId){
       /* for(var u in mock) {
            if( mock[u]._id === userId ) {
                return mock[u];
            }
        }
        return null;
*/
        var deferred = q.defer();
        UserModel.findById(userId,function(err,doc){
            if(err){
                deferred.reject(err);

            }else{
                deferred.resolve(doc);
            }
        });

        return deferred.promise;


    }


    //update the instance
    function updateUser(userId,user){
       /* for(var u in mock){
            if(mock[u]._id == userId) {
                mock[u].firstName = user.firstName;
                mock[u].lastName = user.lastName;
                mock[u].username = user.username;
                mock[u].password = user.password;
                mock[u].email = user.email;
                mock[u].roles = user.roles;
                return mock[u];

            }
        }
        return null;*/
        var deferred = q.defer();
        UserModel.findById(userId,function(err,doc){
            doc.firstName = user.firstName;
            doc.lastName = user.lastName;
            doc.username = user.username;
            doc.password = user.password;
            doc.email = user.email;
            doc.roles = user.roles;
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

    function deleteUser(userId){
        /*for(var u in mock){
            if(mock[u]._id == userId){
                mock.splice(u,1);

            }
        }

        return mock;*/
        var deferred = q.defer();
        UserModel.remove({_id:userId},
        function(err,result){
            if(err){
                deferred.reject(err);
            }else{
                deferred.resolve(result);
            }
        });


        return deferred.promise;

    }


    function findUserByUsername(username){
        /*for(var u in mock){
            if(mock[u].username === username){
                return mock[u];
            }
        }
        return null;*/
        var deferred = q.defer();

        UserModel.find({username:username},
            function(err,doc){
                if(err){
                    deferred.reject(err);
                }else{
                    deferred.resolve(doc);
                }
            });

        return deferred.promise;
    }

    function findUserByCredentials(username,password){
       /*for(var u in mock){
            if(mock[u].username === username &&
                mock[u].password === password){
                return mock[u];
            }

        }
        return null;*/

        var deferred = q.defer();

        UserModel.findOne(
            {username: username,
                password: password},

            function(err,doc){
                if(err){
                    deferred.reject(err);
                }else{
                    deferred.resolve(doc);
                }
            });

        return deferred.promise;
    }




}