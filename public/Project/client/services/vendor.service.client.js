/**
 * Created by mengxichen on 3/2/16.
 */
(function(){
    angular
        .module("HomeServiceApp")
        .factory("VendorService", VendorService);

    function VendorService($http,$q) {

        var api = {
            search: search
        };
        return api;

        //http://api.yelp.com/v2/search?term=food&location=San+Francisco


        function search(service) {
            var deferred = $q.defer();
            console.log(service);
            $http
                .get("/api/project/vendor?type="+service.type+"&location="+service.location)
                .success(function(businesses){
                    deferred.resolve(businesses);
                });
            return deferred.promise;
        }
    }
})();