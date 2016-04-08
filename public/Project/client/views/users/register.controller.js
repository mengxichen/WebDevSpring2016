/**
 * Created by mengxichen on 2/8/16.
 */
(function(){
    angular
        .module("HomeServiceApp")
        .controller("RegistrationController", function ($scope,$rootScope,$location,UserService){
            console.log("here we are from register")

            $scope.register = register;

            function register(user){
                console.log("add new users")

                UserService.createUser(user,render);
                function render(response){
                    console.log(response);
                    $rootScope.user=response;
                    $location.url("/profile");
                };

                UserService.findAllUsers(callback);
                function callback(response){
                    console.log(response);
                }

            }
        });



} )();