/**
 * Created by mengxichen on 3/2/16.
 */
(function(){
    angular
        .module("HomeServiceApp")
        .controller("AppointmentController", AppointmentController);

    function AppointmentController($routeParams,AppointmentService,$rootScope,$location){
        console.log("hi from appointment");
        var role = $rootScope.currentUser.role;
        var vm = this;
        var businessName = $routeParams.id;
        vm.submit=submit;
        vm.cancel = cancel;
        var username = $rootScope.currentUser.username;




        function init(){
            vm.businessName = businessName;


        }

        init();



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


    }


})();