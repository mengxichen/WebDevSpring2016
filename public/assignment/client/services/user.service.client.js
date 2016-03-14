/**
 * Created by mengxichen on 2/16/16.
 */
(function(){
    angular
        .module("FormBuilderApp")
        .factory("UserService",UserService);

    function UserService(){
        var api ={
            findUserByUsername:findUserByUsername,
            findUserByCredentials:findUserByCredentials ,
            findAllUsers:findAllUsers,
            createUser:createUser,
            deleteUserById:deleteUserById,
            updateUser:updateUser
        };

        return api;


        function findUserByUsername(username){
            return $http.get("api/assignment/user?username="+ username);
        }

        function findUserByCredentials(username,password){
            return $http.get("api/assignment/user?username=" + username + "&&password=" +password);

        }

        function findAllUsers(){
            return $http.get("api/assignment/user");
        }

        function createUser(user){
           return $http.post("api/assignment/user", user);
        }

        function deleteUserById(userId){
            return $http.delete("api/assignment/user/:id" + userId);
        }

        function updateUser(userId,user){
            return $http.put("api/assignment/user/:id" +userId, user);
        }


    }

})();