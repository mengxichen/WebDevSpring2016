/**
 * Created by mengxichen on 2/9/16.
 */
(function(){
    angular.config(function($routeProvider){
        $routeProvider
            .when("/register",{
                templateUrl:"/views/users/register.view.html"
            })
            .when("/login",{
                templateUrl:"/views/users/login.view.html"
            })
            .when("/profile",{
                templateUrl:"/views/users/profile.view.html"
            })
            .when("/admin",{
                templateUrl:"/views/admin/admin.view.html"
            })

    })
})();