(function(){
    angular
        .module("FormBuilderApp")
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
                    if (response) {
                        console.log(response);
                        $location.url("/profile");
                        UserService.setCurrentUser(response)

                    }

                });
        }

    }

})();