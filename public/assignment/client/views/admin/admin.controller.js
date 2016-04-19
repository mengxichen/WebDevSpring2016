/**
 * Created by mengxichen on 2/8/16.
 */
"use strict";
(function(){
    angular
        .module("FormBuilderApp")
        .controller("AdminController",AdminController);
            function AdminController(UserService){
                var vm = this;
                console.log("here we are from admin");
                vm.removeByAdmin = removeByAdmin;
                vm.select = select;
                vm.updateByAdmin = updateByAdmin;
                vm.addByAdmin = addByAdmin;

                function init(){

                    UserService
                        .findAllUsers()
                        .then(handleSuccess, handleError);


                }
                init();

                function updateByAdmin(user){
                    var userId = user._id;
                    UserService.updateUser(userId,user)
                        .then(handleSuccess, handleError);
                }

                function addByAdmin(user){
                    UserService
                        .createUser(user)
                        .then(handleSuccess, handleError);
                }

                function removeByAdmin(user){
                    var userId = user._id;
                    console.log(userId);
                    UserService
                        .deleteUserById(userId)
                        .then(handleSuccess, handleError);
                }


                function select(user){
                    vm.newUser= {
                        "_id": user._id,
                        "firstName": user.firstName,
                        "lastName": user.lastName,
                        "username": user.username,
                        "password": user.password,
                        "email":user.email,
                        "roles":user.roles
                    };
                }

                function handleSuccess(response) {
                    vm.users = response;
                }

                function handleError(error) {
                    vm.error = error;
                }


            }



} )();