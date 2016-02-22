/**
 * Created by mengxichen on 2/8/16.
 */
(function(){
    angular
        .module("FormBuilderApp")
        .controller("RegistrationController", function ($scope,$rootScope,$location,UserService){
            console.log("here we are from register")

            $scope.register = register;

            function register(user){
                console.log("add new user")
                $location.url("/profile");
                $rootScope.user = user;
            }
        });



} )();