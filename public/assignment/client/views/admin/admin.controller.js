/**
 * Created by mengxichen on 2/8/16.
 */
(function(){
    angular
        .module("FormBuilderApp")
        .controller("AdminController",AdminController);
            function AdminController(UserService){
                var vm = this;
                console.log("here we are from admin");
                vm.remove = remove;
                vm.select = select;
                vm.updateByAdmin = updateByAdmin;


                function init(){

                    UserService
                        .findAllUsers()
                        .then(function(response){
                            console.log(response);
                            vm.users= response;
                        });


                }
                init();

                function updateByAdmin(user){
                    var userId = user._id;
                    UserService.updateUser(userId,user);
                    UserService
                        .findAllUsers()
                        .then(function(response){
                            console.log(response);
                            vm.users= response;
                        });
                    vm.newUser = null;
                }

                function remove(user){
                    var userId = user._id;
                    console.log(userId);
                    UserService
                        .deleteUserById(userId)
                        .then(function(response){
                            console.log(response);
                            vm.users = response;
                        });
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

            }


} )();