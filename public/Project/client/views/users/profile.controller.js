/**
 * Created by mengxichen on 2/8/16.
 */
(function(){
    angular
        .module("HomeServiceApp")
        .controller("ProfileController", function ($scope,$rootScope,UserService){
            console.log("here we are from profile");
            var vm = this;
            vm.user1 = {
                username: $rootScope.currentUser.username,
                password: $rootScope.currentUser.password,
                firstName: $rootScope.currentUser.firstName,
                lastName: $rootScope.currentUser.lastName,
                email: $rootScope.currentUser.email,
                phone:$rootScope.currentUser.phone,
                zipCode:$rootScope.currentUser.zipCode,
                address:$rootScope.currentUser.address

            };
            vm.update = update;

            function update(updateUser){
                var userId= $rootScope.user._id;
                UserService.updateUser(userId,updateUser,render);
                function render(response){
                    console.log(response);
                    $rootScope.user=response;
                }

                UserService.findAllUsers(callback);
                function callback(response){
                    console.log(response);
                }


            }
        });



} )();