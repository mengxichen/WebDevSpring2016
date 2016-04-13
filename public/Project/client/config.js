/**
 * Created by mengxichen on 2/29/16.
 */
(function (){
    angular
        .module("HomeServiceApp")
        .config(function($routeProvider){
            $routeProvider
                .when("/search",{
                    templateUrl:"views/search/search.view.html",
                    controller:"SearchController",
                    controllerAs: "model"
                })

                .when("/profile",{
                    templateUrl:"views/users/profile.view.html",
                    controller:"ProfileController",
                    controllerAs: "model"
                })
                .when("/admin", {
                    templateUrl:"views/admin/admin.view.html",
                    controller:"AdminController",
                    controllerAs: "model"
                })
                .when("/login",{
                    templateUrl:"views/login/login.view.html",
                    controller:"LoginController",
                    controllerAs: "model"
                })
                .when("/register",{
                    templateUrl:"views/users/register.view.html",
                    controller:"RegistrationController",
                    controllerAs: "model"
                })
                .when("/reviews",{
                    templateUrl:"views/review/reviews.view.html",
                    controller:"ReviewController",
                    controllerAs:"model"
                })
                .when("/appointments",{
                    templateUrl:"views/appointments/appointments.view.html",
                    controller:"AppointmentController",
                    controllerAs: "model"
                })
                .otherwise({
                    redirectTo: "/search"
                });

        });

})();
