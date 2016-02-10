/**
 * Created by mengxichen on 2/9/16.
 */
(function(){
    angular.config(function($RouteProvider){
        $RouteProvider
            .when("/home",{
                templateUrl:"/views/home/home/view.html"
            })
            .when("/forms",{
                templateUrl:"views/forms/forms.view.html"
            })
            .when("/profile",{
                templateUrl:"/views/users/profile,view.html"
            })
            .when("/admin", {
                templateUrl:"/views/admin/admin.view.html"
            })

    })
});