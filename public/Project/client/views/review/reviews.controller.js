/**
 * Created by mengxichen on 3/1/16.
 */
(function(){
    angular
        .module("HomeServiceApp")
        .controller("ReviewController", function ($rootScope,ReviewService){
            console.log("hi from review!");
            var vm = this;
            var role = $rootScope.currentUser.role;
            var username = $rootScope.currentUser.username;
            var vendorUsername = $rootScope.currentUser.vendorUsername;

            function init(){
                if(role == 'customer'){
                    ReviewService
                        .getAllReviewsByUsername(username)
                        .then(function(response){
                            console.log(response);
                            vm.reviews = response;
                        });
                }else if (role == 'vendor'){
                    ReviewService
                        .getAllReviewsByVendorUsername(vendorUsername)
                        .then(function(response){
                            console.log(response);
                            vm.reviews = response;
                        });

                }else{
                    ReviewService
                        .getAllReviewsByAdmin()
                        .then(function(response){
                            console.log(response);
                            vm.reviews = response;
                        });
                }
            }

            init();

        });



})();