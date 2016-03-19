/**
 * Created by mengxichen on 2/8/16.
 */
(function(){
    angular
        .module("FormBuilderApp")
        .controller("ProfileController", function ($scope,$rootScope,UserService){
            var vm = this;
            console.log("here we are from profile");
            vm.user1 = {
                "_id" : $rootScope.currentUser._id,
                "firstName" : $rootScope.currentUser.firstName,
                "lastName" : $rootScope.currentUser.lastName,
                "username" : $rootScope.currentUser.username,
                "password" : $rootScope.currentUser.password,
                "email" : $rootScope.currentUser.email

            }

            vm.update = update;
            console.log(vm.user1);
            function init(){

            }
            init();

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