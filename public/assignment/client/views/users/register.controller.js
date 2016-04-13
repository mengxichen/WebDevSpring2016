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
                    .register(user)
                    .then(
                        function (response) {
                            var currentUser = response;
                            console.log(currentUser);
                            if (currentUser != null) {
                                UserService.setCurrentUser(currentUser);
                                $location.url("/profile");
                            }

                        },
                        function(err) {
                            $scope.error = err;
                        }
                    );

            }
        });



} )();