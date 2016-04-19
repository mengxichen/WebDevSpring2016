/**
 * Created by mengxichen on 3/9/16.
 */
//var mock  = require("./user.mock.json");
var q = require("q");

module.exports = function(mongoose, db){
    var UserSchema = require("./user.schema.server.js")(mongoose);

    var UserModel = mongoose.model('User',UserSchema);

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
        var deferred = q.defer();
        UserModel.create({
            email: user.email,
            firstName:user.firstName,
            lastName:user.lastName,
            password:user.password,
            phones:user.phones,
            roles:user.roles,
            username:user.username
        },function(err,doc){

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
        var deferred = q.defer();
        UserModel.update({_id: user._id},
            {$set: {username:user.username,
                    firstName:user.firstName,
                    lastName:user.lastName,
                    roles:user.roles,
                    email:user.email,
                    phones:user.phones

            }},
        function(err,result) {
            if (err) {
                deferred.reject(err);
            } else {
                console.log("from model");
                console.log(result);
                deferred.resolve(result);
            }
        });

        return deferred.promise;
    }

    function deleteUser(userId){
        var deferred = q.defer();
        userId = mongoose.Types.ObjectId(userId);
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
        var deferred = q.defer();
        UserModel.findOne({username:username},
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