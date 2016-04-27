/**
 * Created by mengxichen on 2/18/16.
 */
(function(){
    angular
        .module("HomeServiceApp")
        .controller("HeaderController",HeaderController);
        function HeaderController(UserService,$location,$rootScope) {
            var vm = this;
            vm.logout = logout;
            console.log("hi from header");
            function init(){

            }
            init();

            function logout(){

                UserService
                    .logout()
                    .then(
                        function(response){
                            $rootScope.currentUser = null;
                            $location.url("/login");
                        }
                    );

            }
        }
})();

