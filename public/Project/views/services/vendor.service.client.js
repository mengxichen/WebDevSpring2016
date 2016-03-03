/**
 * Created by mengxichen on 3/2/16.
 */
(function(){
    angular
        .module("HomeServiceApp")
        .factory("VendorService", VendorService);

    function VendorService($http) {

        var api = {
            findServiceByTypeLocation: findServiceByTypeLocation,
        };
        return api;

        //http://api.yelp.com/v2/search?term=food&location=San+Francisco



        var url_service = "//https://api.yelp.com/v2/search?term=";
        var auth_service = "&oauth_consumer_key=" +
            "&oauth_nonce=" +
            "&oauth_signature=" +
            "&oauth_signature_method=" +
            "&oauth_timestamp=" +
            "&oauth_token=";

        tbody.empty();

        function findServiceByTypeLocation(type, location, renderBusiness) {
            var search_url = url_service + type + "&find_loc=" + location + auth_service;

            $.ajax({
                url: search_url,
                dataType: "jsonp",
                success: renderBusiness
            });

        }

        function renderBusiness(result) {
            console.log("renderBusiness");

            var comps = result.data.companies;

            for (var obj in comps) {
                var movie_comp = comps[obj].company;
                for (var c in movie_comp) {
                    var movies = movie_comp[c].movies;

                    for (var m in movies) {
                        var movie = movies[m];
                        var title = movie.movie.name;
                        var location = movie.location;
                        var rating = movie.rating;
                        var categories = movie.categories;

                        var tr = $("<tr>");
                        var titleTd = $("<td>" + title + "</td>");
                        var yearTd = $("<td>" + location + "</td>");
                        var remarkTd = $("<td>" + rating + "</td>");
                        var categoryTd = $("<td>" + categories + "</td>")

                        tr.append(titleTd);
                        tr.append(yearTd);
                        tr.append(remarkTd);
                        tr.append(categoryTd);

                        tbody.append(tr);
                    }

                }
            }

        }
    }
})();