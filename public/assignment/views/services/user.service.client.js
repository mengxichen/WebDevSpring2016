/**
 * Created by mengxichen on 2/16/16.
 */
(function(){
    angular
        .module("FormBuilderApp")
        .factory("UserService",UserService);

    function UserService(){
        var users =
            [
            {"_id":123, "firstName":"Alice","lastName":"Wonderland","username":"alice","password":"alice","roles": ["student"],"email":"123@gmail.com"},
            {"_id":234, "firstName":"Bob","lastName":"Hope","username":"bob","password":"bob","roles": ["admin"],"email":"123@gmail.com"},
            {"_id":345, "firstName":"Charlie","lastName":"Brown","username":"charlie","password":"charlie", "roles": ["faculty"],"email":"123@gmail.com"},
            {"_id":456, "firstName":"Dan","lastName":"Craig","username":"dan","password":"dan","roles": ["faculty", "admin"],"email":"123@gmail.com"},
            {"_id":567, "firstName":"Edward","lastName":"Norton","username":"ed","password":"ed","roles": ["student"],"email":"123@gmail.com"}
        ];

        var api ={
            findUserByUsernameAndPassword:findUserByUsernameAndPassword ,
            findAllUsers:findAllUsers,
            createUser:createUser,
            deleteUserById:deleteUserById,
            updateUser:updateUser
        };

        return api;


        function findUserByUsernameAndPassword(username,password,callback){
            for(var i = 0; i <users.length;i++){
                var user = users[i];
                if(user["username"] == username && user["password"] == password){
                    callback(user);
                }
            }

        }

        function findAllUsers(callback){
            callback(users);
        }

        function createUser(user,callback){
            var newUser ={"_id":(new Date).getTime(),
                            "firstName": user.firstName,
                            "lastName":user.lastName,
                            "username":user.username,
                            "password":user.password,
                            "roles":user.roles
            }

            users.push(newUser);
            callback(users);
        }

        function deleteUserById(userId,callback){
            for(var j = 0; j<users.length; j++){
                if(users[j]._id == userId){
                    users.splice(j,1);
                }
            }
            callback(users);
        }

        function updateUser(userId,user,callback){
            for(var k = 0; k<users.length;k++){
                if(users[k]._id == userId){
                    users[k].firstName = user.firstName;
                    users[k].lastName = user.lastName;
                    users[k].password = user.password;
                    users[k].roles = user.roles;
                    users[k].username = user.username;
                    callback(users[k]);
                }
            }

        }


    }

})();