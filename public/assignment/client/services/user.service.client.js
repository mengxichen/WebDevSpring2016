/**
 * Created by mengxichen on 2/16/16.
 */
(function(){
    angular
        .module("FormBuilderApp")
        .factory("UserService",UserService);

    function UserService($http,$rootScope,$q){
        var api ={
            findUserByUsername:findUserByUsername,
            findUserByCredentials:findUserByCredentials ,
            findAllUsers:findAllUsers,
            register:register,
            deleteUserById:deleteUserById,
            updateUser:updateUser,
            setCurrentUser:setCurrentUser,
            createUser:createUser
        };

        return api;


        function findUserByUsername(username){
            var deferred = $q.defer();

            $http
                .get("/api/assignment/user?username="+ username)
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
                .get("/api/assignment/user?username=" + username + "&password=" +password)
                .success(function(user){
                    deferred.resolve(user);
                });
            return deferred.promise;

        }

        function findAllUsers(){

            var deferred = $q.defer();

            $http
                .get("/api/assignment/userAll")
                .success(function(users){
                    deferred.resolve(users);
                });

            return deferred.promise;
        }

        function register(user){

            var deferred = $q.defer();

            $http
                .post("/api/assignment/register", user)
                .success(function(user){
                    deferred.resolve(user);
                });

            return deferred.promise;
        }

        function createUser(user){
            var deferred = $q.defer();

            $http
                .post("/api/assignment/admin/user", user)
                .success(function(user){
                    deferred.resolve(user);
                });

            return deferred.promise;
        }

        function deleteUserById(userId){

            var deferred = $q.defer();

            $http
                .delete("/api/assignment/user/" + userId)
                .success(function(users){
                    deferred.resolve(users);
                });

            return deferred.promise;
        }

        function updateUser(userId,user){

            var deferred = $q.defer();

            $http
                .put("/api/assignment/user/" +userId, user)
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