/**
 * Created by mengxichen on 3/1/16.
 */
(function() {
    angular
        .module("HomeServiceApp")
        .factory("ReviewService", ReviewService);


    function ReviewService($http,$q) {

        var api = {
            createReview:createReview,
            deleteReviewById:deleteReviewById,
            getAllReviewsByUsername:getAllReviewsByUsername,
            getAllReviewsByVendorUsername:getAllReviewsByVendorUsername,
            getAllReviewsByAdmin:getAllReviewsByAdmin


        }

        return api;


        function createReview(review){
            var deferred = $q.defer();

            $http
                .post("/api/project/review",review)
                .success(function(review){
                    deferred.resolve(review);
                });

            return deferred.promise;
        }

        function deleteReviewById(reviewId){
            var deferred = $q.defer();

            $http
                .delete("/api/project/review/"+reviewId)
                .success(function(review){
                    deferred.resolve(review);
                });

            return deferred.promise;
        }

        function getAllReviewsByUsername(username){
            var deferred = $q.defer();

            $http
                .get("/api/project/review/username/"+username)
                .success(function(review){
                    deferred.resolve(review);
                });

            return deferred.promise;

        }

        function getAllReviewsByVendorUsername(vendorUsername){
            var deferred = $q.defer();

            $http
                .get("/api/project/review/vendor/"+vendorUsername)
                .success(function(review){
                    deferred.resolve(review);
                });

            return deferred.promise;
        }

        function getAllReviewsByAdmin(){
            var deferred = $q.defer();

            $http
                .get("/api/project/review/admin/")
                .success(function(review){
                    deferred.resolve(review);
                });

            return deferred.promise;
        }
    }


})();