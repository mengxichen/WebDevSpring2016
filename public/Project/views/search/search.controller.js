/**
 * Created by mengxichen on 2/29/16.
 */
(function(){
    angular
        .module("HomeServiceApp")
        .controller("SearchController",SearchController);
    function SearchController($scope, $location, $routeParams, VendorService) {
        $scope.search = search;
        $scope.select = select;

        if($scope.service) {
            search($scope.service);
        }

        function search(service) {
            var bar = document.getElementById("progressBar");
            bar.style="width: 50%";
            bar.innerHTML = "make an appointment!";

            var businesses = [
                {"name" : "plumbing LLC", "location": "Seattle, WA", "rating": 3.5, "categories":["water heater", "kitchen sewer"]},
                {"name" : "Carpet Cleaning LLC", "location": "Seattle, WA", "rating": 3.9, "categories":["carpet cleaning", "dry cleaning"]}

            ]

            $scope.services = businesses;
            /*$location.url("/search/"+$scope.service.type + $scope.service.location);
            console.log(service.type + service.location);
            VendorService.findServiceByTypeLocation(
                service.type,
                service.location,
                function(response){
                    console.log(response);
                    $scope.services = response;
                });*/
        }


        function select(business){
            console.log("hi from appointments");
            $location.url("/appointments");
        }
    }


})();