/**
 * Created by mengxichen on 3/2/16.
 */
(function(){
    angular
        .module("HomeServiceApp")
        .controller("AppointmentController", AppointmentController);

    function AppointmentController($routeParams,AppointmentService,$rootScope,$location,ReviewService){
        console.log("hi from appointment");
        var role = $rootScope.currentUser.role;
        var vm = this;
        var businessName = $routeParams.id;
        vm.submit=submit;
        vm.cancel = cancel;
        var userId = $rootScope.currentUser._id;
        var username = $rootScope.currentUser.username;
        vm.editApp = editApp;
        vm.updateApp = updateApp;
        var date = new Date();
        vm.currentDate = date.toISOString();
        vm.cancelApp = cancelApp;
        vm.writeReview=writeReview;
        vm.addReview = addReview;



        function init(){
            vm.businessName = businessName;
            if(role == 'customer'){
                AppointmentService
                    .getAllAppointmentsByUsername(username)
                    .then(function(response){
                        console.log(response);
                        vm.appointments = response;
                    });
            }else if (role == 'vendor'){
                AppointmentService
                    .getAllAppointmentsByVendorUsername(username)
                    .then(function(response){
                        console.log(response);
                        vm.appointments = response;
                    });

            }else{
                AppointmentService
                    .findAllAppointments()
                    .then(function(response){
                        console.log(response);
                        vm.appointments = response;
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

        function submit(appointment){
            appointment.username = username;
            appointment.vendorUsername = businessName;
            console.log(appointment);
            AppointmentService
                .createAppointment(appointment)
                .then(function(response){
                    console.log(response);
                    $location.url("/appointmentList");
                });
        }

        function cancel(){
            $location.url("/search");
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
                   ;
                })
        }

    }


})();