/**
 * Created by mengxichen on 3/9/16.
 */
var mock  = require("./user.mock.json");
module.exports = function(){
    var api = {
        createUser : createUser,
        findAllUsers : findAllUsers,
        findUserById : findUserById,
        updateUser : updateUser,
        deleteUser : deleteUser,
        findUserByUsername : findUserByUsername,
        findUserByCredentials : findUserByCredentials


    }

    return api;


    //accept an instance object, return collection
    function createUser(user){
        user._id = "ID_" + (new Date()).getTime();
        mock.push(user);
        return user;
    }

    //return collection
    function findAllUsers(){
        return mock;
    }

    //return a user
    function findUserById(userId){
        for(var u in mock) {
            if( mock[u]._id === userId ) {
                return mock[u];
            }
        }
        return null;
    }


    //update the instance
    function updateUser(userId,user){
        for(var u in mock){
            if(mock[u]._id == userId) {
                mock[u].firstName = user.firstName;
                mock[u].lastName = user.lastName;
                mock[u].username = user.username;
                mock[u].password = user.password;
                mock[u].email = user.email;
                return mock[u];

            }
        }
        return null;
    }

    function deleteUser(userId){
        for(var u in mock){
            if(mock[u]._id === userId){
                mock.splice(u,1);
            }
        }
    }


    function findUserByUsername(username){
        for(var u in mock){
            if(mock[u].username === username){
                return mock[u];
            }
        }
        return null;
    }

    function findUserByCredentials(username,password){
        for(var u in mock){
            if(mock[u].username === username &&
                mock[u].password === password){
                return mock[u];
            }

        }
        return null;
    }




}