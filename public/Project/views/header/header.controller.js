/**
 * Created by mengxichen on 2/29/16.
 */
(function(){
    angular
        .module("HomeServiceApp")
        .controller("HeaderController",HeaderController);
    function HeaderController($scope,$rootScope) {
        console.log("hi from header")
        $scope.logout= logout;
        function logout(){
            $rootScope.user = null;
        }
    }
})();
