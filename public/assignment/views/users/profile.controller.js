/**
 * Created by mengxichen on 2/8/16.
 */
(function(){
    angular
        .module("FormBuilderApp")
        .controller("ProfileController", function ($scope,$rootScope,UserService){
            console.log("here we are from profile");
            $scope.user1 = {
                username: $rootScope.user.username,
                password: $rootScope.user.password,
                firstName: $rootScope.user.firstName,
                lastName: $rootScope.user.lastName,
                email: $rootScope.user.email
            };
            $scope.update = update;

            function update(updateUser){
                var userId= $rootScope.user._id;
                UserService.updateUser(userId,updateUser,render);
                function render(response){
                    console.log(response);
                    $rootScope.user=response;
                };

                UserService.findAllUsers(callback);
                function callback(response){
                    console.log(response);
                }


            }
        });



} )();