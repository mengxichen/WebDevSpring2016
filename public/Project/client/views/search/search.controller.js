
(function(){
    angular
        .module("HomeServiceApp")
        .controller("SearchController",SearchController);
    function SearchController(VendorService, $location,UserService) {

        var vm = this;
        console.log("here we are from search page");
        function init() {
            $('[data-toggle="popover"]').popover({
                placement : 'top'
            });
        }

        init();


        vm.search = search;
        vm.select = select;

        if(vm.service) {
            search(vm.service);
        }

        function search(service) {
            var bar = document.getElementById("progressBar");
            bar.style = "width: 50%";
            bar.innerHTML = "make an appointment!";
            var tbody = $("#container");
            console.log(service);
            VendorService
                .search(service)
                .then(
                    function (response) {
                        console.log(response);
                        vm.businesses = response.businesses;
                    }
                );


        }




        function select(business){
            console.log("hi from appointments");
            console.log(business);
            UserService
                .findUserByUsername(business.id)
                .then(
                    function (response) {
                        var currentUser = response;
                        console.log(currentUser);
                        if (currentUser == null) {
                            UserService
                                .registerBusiness(business)
                                .then(
                                    function (response) {
                                        var currentUser = response;
                                        console.log(currentUser);
                                        if (currentUser != null) {
                                            $location.url("/appointments/" + business.id);
                                        }

                                    }
                                );
                        }else{
                            $location.url("/appointments/" + business.id);
                        }

                    }
                )
        };
    }


})();