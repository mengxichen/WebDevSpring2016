/**
 * Created by mengxichen on 4/27/16.
 */
(function(){
    angular
        .module("HomeServiceApp")
        .controller("AppointmentListController", AppointmentListController);

    function AppointmentListController(AppointmentService,$rootScope,ReviewService){
        console.log("hi from appointment");
        var role = $rootScope.currentUser.role;
        var vm = this;
        var username = $rootScope.currentUser.username;
        vm.editApp = editApp;
        vm.updateApp = updateApp;
        vm.cancelApp = cancelApp;
        vm.writeReview=writeReview;
        vm.addReview = addReview;



        function init(){
            if(role == 'customer'){
                AppointmentService
                    .getAllAppointmentsByUsername(username)
                    .then(function(response){
                        console.log(response);
                        vm.apps = response;
                    });
            }else if (role == 'vendor'){
                AppointmentService
                    .getAllAppointmentsByVendorUsername(username)
                    .then(function(response){
                        console.log(response);
                        vm.apps = response;
                    });

            }else{
                AppointmentService
                    .findAllAppointments()
                    .then(function(response){
                        console.log(response);
                        vm.apps = response;
                    });
            }

        }

        init();

        function updateApp(appointment){
            console.log(appointment);
        }

        function editApp(appointment){
            $("#dialog-1").modal();
            vm.app = appointment;
            console.log(vm.app);
        }


        function cancelApp(app){
            app.status = "canceled";
            AppointmentService
                .updateAppointmentByAppId(app._id,app)
                .then(function(response){
                    console.log(response);
                    init();
                })
        }

        function writeReview(app){
            $("#dialog-2").modal();
            console.log(app);
            vm.vendorUsername = app.vendorUsername;

        }

        function addReview(vendorUsername,review){
            console.log(vendorUsername);
            console.log(review);
            review.vendorUsername = vendorUsername;
            review.time = new Date();
            review.username = $rootScope.currentUser.username;
            ReviewService
                .createReview(review)
                .then(function(response){
                    console.log(response);

                })
        }

    }


})();