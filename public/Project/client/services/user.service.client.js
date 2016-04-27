/**
 * Created by mengxichen on 2/16/16.
 */
(function(){
    angular
        .module("HomeServiceApp")
        .factory("UserService",UserService);

    function UserService($http,$rootScope,$q){
        var api ={
            findUserByUsername:findUserByUsername,
            findUserByCredentials:findUserByCredentials ,
            findAllUsers:findAllUsers,
            register:register,
            deleteUserById:deleteUserById,
            updateUser:updateUser,
            registerBusiness:registerBusiness,
            setCurrentUser:setCurrentUser,
            createUser:createUser,
            login:login,
            logout:logout,
            updateUserByAdmin:updateUserByAdmin,
            sortAscending:sortAscending


        };

        return api;

        function sortAscending(category,dir){
            var deferred = $q.defer();
            $http
                .get("/api/project/admin/sort?category=" + category + "&dir=" + dir)
                .success(function(users){
                    deferred.resolve(users);
                });
            return deferred.promise;
        }

        function updateUserByAdmin(userId,user){
            var deferred = $q.defer();

            $http
                .put("/appi/project/admin/user/" + userId,user)
                .success(function(user){
                    deferred.resolve(user);
                });

            return deferred.promise;
        }

        function logout() {
            var deferred = $q.defer();

            $http
                .post("/api/project/logout")
                .success(function(user){
                    deferred.resolve(user);
                });
            return deferred.promise;
        }

        function login(user){

            return $http.post("/api/project/login", user);

        }

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
                .get("/api/project/admin/user")
                .success(function(users){
                    deferred.resolve(users);
                });

            return deferred.promise;
        }

        function registerBusiness(business){

            var vendor = {
                username: business.id,
                password: "123",
                name:business.name,
                phone:business.phone,
                email: String,
                zipCode:business.location.postal_code,
                address:business.location.display_address,
                categories:business.categories,
                role:'vendor'
            };

            var deferred = $q.defer();

            $http
                .post("/api/project/register", vendor)
                .success(function(user){
                    deferred.resolve(user);
                });

            return deferred.promise;
        }

        function register(user){

            var deferred = $q.defer();

            $http
                .post("/api/project/register", user)
                .success(function(user){
                    deferred.resolve(user);
                });

            return deferred.promise;
        }

        function createUser(user){
            var deferred = $q.defer();

            $http
                .post("/api/project/admin/user", user)
                .success(function(doc){
                    deferred.resolve(doc);
                });

            return deferred.promise;
        }

        function deleteUserById(userId){

            var deferred = $q.defer();

            $http
                .delete("/api/project/admin/user/" + userId)
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
            console.log($rootScope.currentUser);

        }


    }

})();