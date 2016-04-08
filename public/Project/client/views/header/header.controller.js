(function(){
    angular
        .module("HomeServiceApp")
        .controller("HeaderController",HeaderController);
    function HeaderController(UserService,$location) {
        var vm = this;
        vm.logout = logout;
        console.log("hi from header");
        function init(){

        }
        init();

        function logout(){
            UserService.setCurrentUser(null);
            $location.url("/home");

        }
    }
})();
