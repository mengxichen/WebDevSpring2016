/**
 * Created by mengxichen on 2/8/16.
 */
(function(){
    angular
        .module("FormBuilderApp")
        .controller("RegistrationController", function ($location,UserService,FormService){
            console.log("here we are from register")
            var vm = this;
            vm.register = register;

            function init(){

            }
            init();

            function register(user){
                console.log("add new users")

                UserService
                    .createUser(user)
                    .then(function (response){
                        console.log(response);
                        UserService.setCurrentUser(response);
                        $location.url("/profile");
                    });

            }
        });



} )();