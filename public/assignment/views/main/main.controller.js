/**
 * Created by mengxichen on 2/9/16.
 */
(function(){
    angular
        .module("FormBuilderApp")
        .controller("MainController", function($scope, $location) {
            $scope.$location = $location;
        });
})();

