/**
 * Created by mengxichen on 2/29/16.
 */

(function(){
    angular
        .module("HomeServiceApp")
        .controller("SearchController",SearchController);
    function SearchController( $location, $routeParams, VendorService) {

        var vm = this;
        console.log("here we are from search page");
        function init() {

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


            //$scope.services = businesses;

            /*$location.url("/search/"+$scope.service.type + $scope.service.location);
             console.log(service.type + service.location);
             VendorService.findServiceByTypeLocation(
             service.type,
             service.location,
             function(response){
             console.log(response);
             $scope.services = response;
             });*/

            var auth = {
                //
                // Update with your auth tokens.
                //
                consumerKey : "1M_96VMW70cWQDI1gR9tRQ",
                consumerSecret : "EZvspOlLcsEdgIc0trY-V1aT3j8",
                accessToken : "SJroBIRL3kyN4eRv4q-UaZPq9LMkXBCT",
                // This example is a proof of concept, for how to use the Yelp v2 API with javascript.
                // You wouldn't actually want to expose your access token secret like this in a real application.
                accessTokenSecret : "wKu0cQ4pxSvUcGCB6m0M7z68H9M",
                serviceProvider : {
                    signatureMethod : "HMAC-SHA1"
                }
            };
            var terms = service.type;
            var near = service.location;
            var accessor = {
                consumerSecret : auth.consumerSecret,
                tokenSecret : auth.accessTokenSecret
            };
            parameters = [];
            parameters.push(['term', terms]);
            parameters.push(['location', near]);
            parameters.push(['callback', 'cb']);
            parameters.push(['oauth_consumer_key', auth.consumerKey]);
            parameters.push(['oauth_consumer_secret', auth.consumerSecret]);
            parameters.push(['oauth_token', auth.accessToken]);
            parameters.push(['oauth_signature_method', 'HMAC-SHA1']);
            var message = {
                'action' : 'http://api.yelp.com/v2/search',
                'method' : 'GET',
                'parameters' : parameters
            };
            OAuth.setTimestampAndNonce(message);
            OAuth.SignatureMethod.sign(message, accessor);
            var parameterMap = OAuth.getParameterMap(message.parameters);
            parameterMap.oauth_signature = OAuth.percentEncode(parameterMap.oauth_signature)
            console.log(parameterMap);
            $.ajax({
                'url' : message.action,
                'data' : parameterMap,
                'cache' : true,
                'dataType' : 'jsonp',
                'jsonpCallback' : 'cb',
                'success' : function(data, textStats, XMLHttpRequest) {
                    console.log(data);
                    var comps = data.businesses;
                    console.log(comps);
                    console.log(comps[0]);
                    console.log(comps[0].name);

                    for(var i = 0; i<comps.length;i++) {
                        var name = comps[i].name;
                        var location = comps[i].location.address + ', '
                                + comps[i].location.city + ', '
                                +comps[i].location.postal_code;
                        var phone = comps[i].phone;
                        var rating = comps[i].rating;


                        var tr = $("<tr>");
                        var nameTd = $("<td>" + name + "</td>");
                        var locationTd = $("<td>" + location + "</td>");
                        var phoneTd = $("<td>" + phone + "</td>");
                        var ratingTd = $("<td>" + rating + "</td>");

                        var selectBtn  = $('<td><button type="button" ng-click = "model.select(model.business)"class="btn btn-default">Select</button></td>')

                        tr.append(nameTd);
                        tr.append(locationTd);
                        tr.append(phoneTd);
                        tr.append(ratingTd);

                        tr.append(selectBtn);
                        tbody.append(tr);
                    }
                }

            });

        }



        function select(business){
            console.log("hi from appointments");
            $location.url("/appointments");
        }
    }


})();