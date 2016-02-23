/**
 * Created by mengxichen on 2/8/16.
 */
(function(){
    angular
        .module("FormBuilderApp")
        .controller("LoginController", function ($scope,$rootScope,$location,UserService){
            console.log("here we are from login")
            $scope.login = login;

            function login(user){
                console.log("login user")
                var username = user.username;
                var password = user.password;
                UserService.findUserByUsernameAndPassword(username,password, render);

                function render(response){
                    console.log(response);
                    $rootScope.user=response;
                    $location.url("/profile");
                };


            }
        });



})();