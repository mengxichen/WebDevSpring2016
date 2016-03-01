/**
 * Created by mengxichen on 2/29/16.
 */
(function(){
    angular
        .module("HomeServiceApp")
        .controller("HomeController",HomeController);
    function HomeController($scope,$rootScope) {
        console.log("hi from home");

    }
})();