/**
 * Created by mengxichen on 2/29/16.
 */
(function (){
    angular
        .module("HomeServiceApp")
        .config(function($routeProvider){
            $routeProvider
                .when("/home",{
                    templateUrl:"views/home/home.view.html",
                    controller:"HomeController"
                })
                .when("/profile",{
                    templateUrl:"views/users/profile.view.html",
                    controller:"ProfileController"
                })
                .when("/admin", {
                    templateUrl:"views/admin/admin.view.html",
                    controller:"AdminController"
                })
                .when("/login",{
                    templateUrl:"views/login/login.view.html",
                    controller:"LoginController"
                })
                .when("/register",{
                    templateUrl:"views/users/register.view.html",
                    controller:"RegistrationController"
                })
                .when("/appointments",{
                    templateUrl:"views/appointment/appointments.view.html",
                    controller:"AppointmentController"
                })
                .otherwise({
                    redirectTo: "/home"
                });

        });

})();