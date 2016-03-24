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
                    controller:"HomeController",
                    controllerAs: "model"
                })
                .when("/forms",{
                    templateUrl:"views/forms/forms.view.html",
                    controller:"FormController",
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
                    templateUrl:"views/users/login.view.html",
                    controller:"LoginController",
                    controllerAs: "model"
                })
                .when("/register",{
                    templateUrl:"views/users/register.view.html",
                    controller:"RegistrationController",
                    controllerAs: "model"
                })
                .when("/field/:formId",{
                    templateUrl:"views/forms/field.view.html",
                    controller:"FieldController",
                    controllerAs: "model"
                })
                .otherwise({
                    redirectTo: "/home"
                });

    });

})();
