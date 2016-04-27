(function(){
    angular
        .module("HomeServiceApp")
        .controller("LoginController", LoginController)


    function LoginController ($location,
                              UserService
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
                .login({
                    username: user.username,
                    password: user.password
                })
                .then(function (response) {
                    if (response.data) {
                        console.log(response);
                        $location.url("/profile");
                        UserService.setCurrentUser(response.data)

                    }else{
                        vm.message = "either username or password is wrong"
                    }

                });
        }

    }

})();