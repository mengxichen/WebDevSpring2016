/**
 * Created by mengxichen on 2/9/16.
 */
(function (){
    angular
        .module("FormBuilderApp")
        .config(function($routeProvider){
            $routeProvider
                .when("/home",{
                    templateUrl:"views/home/home.view.html",
                    controller:"HomeController"
                })
                .when("/forms",{
                    templateUrl:"views/forms/forms.view.html",
                    controller:"FormController"
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
                    templateUrl:"views/users/login.view.html",
                    controller:"LoginController"
                })
                .when("/register",{
                    templateUrl:"views/users/register.view.html",
                    controller:"RegistrationController"
                })
                .when("/field",{
                    templateUrl:"views/forms/field.view.html",
                    controller:"FieldController"
                })
                .otherwise({
                    redirectTo: "/home"
                });

    });

})();
