
var q = require("q");

module.exports = function(mongoose, db){
    var UserSchema = require("./../schema/user.schema.server.js")(mongoose);

    var UserModel = mongoose.model('ProjectUser',UserSchema);

    var api = {
        createUser : createUser,
        findAllUsers : findAllUsers,
        findUserById : findUserById,
        updateUser : updateUser,
        deleteUser : deleteUser,
        findUserByUsername : findUserByUsername,
        findUserByCredentials : findUserByCredentials,
        sortCategory:sortCategory

    };

    return api;

    function sortCategory(category, dir){
        var deferred = q.defer();

        console.log(category);
        console.log(dir);
        if(dir == 'descending'){
            dir = -1;
        }else{
            dir = 1;
        }
        console.log(dir);
        if(category == "name"){
            UserModel.find({}, null, {sort: {name: dir}}, function (err, users) {
                if(err){
                    deferred.reject(err);
                }else{
                    deferred.resolve(users);
                }
            });
        }

        return deferred.promise;


    }


    //accept an instance object, return collection
    function createUser(user){
        var deferred = q.defer();
        UserModel.create({
            email: user.email,
            name:user.name,
            password:user.password,
            phone:user.phone,
            role:user.role,
            username:user.username,
            zipCode:user.zipCode,
            address:user.address,
            categories:user.categories

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
            {$set: {
                username:user.username,
                name:user.name,
                role:user.role,
                email:user.email,
                phone:user.phone,
                address:user.address,
                zipCode:user.zipCode,
                categories:user.categories

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