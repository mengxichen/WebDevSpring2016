/**
 * Created by mengxichen on 2/8/16.
 */
(function(){
    angular
        .module("HomeServiceApp")
        .controller("ProfileController", function ($scope,$rootScope,UserService){
            console.log("here we are from profile");
            var vm = this;
            vm.user = {
                username: $rootScope.currentUser.username,
                password: $rootScope.currentUser.password,
                name: $rootScope.currentUser.name,
                email: $rootScope.currentUser.email,
                phone: $rootScope.currentUser.phone,
                zipCode: $rootScope.currentUser.zipCode,
                address: $rootScope.currentUser.address,
                categories: $rootScope.currentUser.categories
            }





            function init(){

            }
            init();
            vm.update = update;


            function update(updateUser){
                console.log(updateUser);
                var userId= $rootScope.currentUser._id;
                UserService
                    .updateUser(userId,updateUser)
                    .then(function(response){
                        console.log(response);
                        UserService.setCurrentUser(response);
                    });
            }
        });



} )();