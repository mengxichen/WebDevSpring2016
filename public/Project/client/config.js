/**
 * Created by mengxichen on 2/29/16.
 */
(function (){
    angular
        .module("HomeServiceApp")
        .config(function($routeProvider){
            $routeProvider
                .when("/search",{
                    templateUrl:"views/search/search.view.html",
                    controller:"SearchController",
                    controllerAs: "model",
                    /*resolve: {
                        loggedin: checkCurrentUser
                    }*/

                })

                .when("/appointmentList",{
                    templateUrl:"views/appointments/appointmentList.view.html",
                    controller:"AppointmentController",
                    controllerAs: "model",
                    /*resolve: {
                        loggedin: checkLoggedin
                    }*/
                })

                .when("/reviewList",{
                    templateUrl:"views/review/reviewList.view.html",
                    controller:"ReviewController",
                    controllerAs: "model",
                    /*resolve: {
                     loggedin: checkLoggedin
                     }*/
                })


                .when("/profile",{
                    templateUrl:"views/users/profile.view.html",
                    controller:"ProfileController",
                    controllerAs: "model",
                    /*resolve: {
                     loggedin: checkLoggedin
                     }*/
                })


                .when("/admin", {
                    templateUrl:"views/admin/admin.view.html",
                    controller:"AdminController",
                    controllerAs: "model",
                    /*resolve: {
                        loggedin: checkAdmin
                    }*/
                })
                .when("/login",{
                    templateUrl:"views/login/login.view.html",
                    controller:"LoginController",
                    controllerAs: "model"
                })

                .when("/register",{
                    templateUrl:"views/users/register.view.html",
                    controller:"RegistrationController",
                    controllerAs: "model"
                })

                .when("/appointments/:id",{
                    templateUrl:"views/appointments/appointments.view.html",
                    controller:"AppointmentController",
                    controllerAs: "model",
                    /*resolve: {
                        checkLoggedin: checkLoggedin
                    }*/
                })
                .when("/forms",{
                    templateUrl:"views/forms/forms.view.html",
                    controller:"FormController",
                    controllerAs: "model",
                    /*resolve: {
                     checkLoggedin: checkLoggedin
                     }*/
                })
                .when("/field/:formId",{
                    templateUrl:"views/forms/field.view.html",
                    controller:"FieldController",
                    controllerAs: "model",
                    /*resolve: {
                     checkLoggedin: checkLoggedin
                     }*/
                })

                .otherwise({
                    redirectTo: "/search"
                });

        });




    var checkAdmin = function($q, $timeout, $http, $location, $rootScope)
    {
        var deferred = $q.defer();

        $http.get('/api/project/loggedin').success(function(user)
        {
            $rootScope.errorMessage = null;
            // User is Authenticated
            if (user !== '0' && user.role=='admin')
            {
                $rootScope.currentUser = user;
                deferred.resolve();
            }
        });

        return deferred.promise;
    };


    var checkLoggedin = function($q, $timeout, $http, $location, $rootScope)
    {
        var deferred = $q.defer();

        $http.get("/api/project/loggedin").success(function(user)
        {
            $rootScope.errorMessage = null;
            // User is Authenticated
            if (user !== '0')
            {
                $rootScope.currentUser = user;
                deferred.resolve();
            }
            // User is Not Authenticated
            else
            {
                $rootScope.errorMessage = 'You need to log in!!!';
                deferred.reject();
                $location.url('/login');
            }
        });

        return deferred.promise;
    };

    var checkCurrentUser = function($q, $timeout, $http, $location, $rootScope)
    {
        var deferred = $q.defer();

        $http.get('/api/project/loggedin').success(function(user)
        {
            $rootScope.errorMessage = null;
            // User is Authenticated
            if (user !== '0')
            {
                $rootScope.currentUser = user;
            }
            deferred.resolve();
        });

        return deferred.promise;
    };


})();
