/**
 * Created by mengxichen on 3/1/16.
 */
(function() {
    angular
        .module("HomeServiceApp")
        .factory("UserService", UserService);


    function UserService($http,$rootScope,$q){
        var api ={
            findUserByUsername:findUserByUsername,
            findUserByCredentials:findUserByCredentials ,
            findAllUsers:findAllUsers,
            createUser:createUser,
            deleteUserById:deleteUserById,
            updateUser:updateUser,
            setCurrentUser:setCurrentUser
        };

        return api;


        function findUserByUsername(username){
            var deferred = $q.defer();

            $http
                .get("/api/project/user?username="+ username)
                .success(function(user){
                    deferred.resolve(user);
                });

            return deferred.promise;
        }

        function findUserByCredentials(credentials){
            var deferred = $q.defer();
            var username = credentials.username;
            var password = credentials.password;
            $http
                .get("/api/project/user?username=" + username + "&password=" +password)
                .success(function(user){
                    deferred.resolve(user);
                });
            return deferred.promise;

        }

        function findAllUsers(){

            var deferred = $q.defer();

            $http
                .get("/api/project/userAll")
                .success(function(users){
                    deferred.resolve(users);
                });

            return deferred.promise;
        }

        function createUser(user){

            var deferred = $q.defer();

            $http
                .post("/api/project/user", user)
                .success(function(user){
                    deferred.resolve(user);
                });

            return deferred.promise;
        }

        function deleteUserById(userId){

            var deferred = $q.defer();

            $http
                .delete("/api/project/user/" + userId)
                .success(function(users){
                    deferred.resolve(users);
                });

            return deferred.promise;
        }

        function updateUser(userId,user){

            var deferred = $q.defer();

            $http
                .put("/api/project/user/" +userId, user)
                .success(function(user){
                    deferred.resolve(user);
                });

            return deferred.promise;
        }

        function setCurrentUser(user) {
            $rootScope.currentUser = user;

        }


    }


})();