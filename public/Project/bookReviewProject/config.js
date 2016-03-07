/**
 * Created by mengxichen on 2/29/16.
 */
(function (){
    angular
        .module("BookReviewApp")
        .config(function($routeProvider){
            $routeProvider
                .when("/search",{
                    templateUrl:"views/search/search.view.html",
                    controller:"SearchController"
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
                .otherwise({
                    redirectTo: "/search"
                });

        });

})();