/**
 * Created by mengxichen on 2/18/16.
 */
(function(){
    angular
        .module("FormBuilderApp")
        .controller("HeaderController",HeaderController);
        function HeaderController($scope,$rootScope) {
            console.log("hi from header")
            $scope.logout= logout;
            function logout(){
                $rootScope.user = null;
            }
        }
})();

