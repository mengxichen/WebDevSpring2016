(function(){
    angular
        .module("HomeServiceApp")
        .controller("LoginController", LoginController)


    function LoginController ($location,
                              UserService,
                              FormService,
                              $q
    ) {
        var vm = this;
        console.log("here we are from login");
        vm.login = login;

        function init() {

        }

        init();

        function login(user) {
            if (!user) {
                return;
            }

            UserService
                .findUserByCredentials({
                    username: user.username,
                    password: user.password
                })
                .then(function (response) {
                    if (response[0]) {
                        console.log(response[0]);
                        $location.url("/profile");
                        UserService.setCurrentUser(response[0])

                    }

                });
        }

    }

})();