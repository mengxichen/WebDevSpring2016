/**
 * Created by mengxichen on 3/6/16.
 */
(function(){
    angular.module("BookReviewApp")
        .controller("SearchController",SearchController);

    function SearchController(){
        console.log("hi from Search controller");
        function handleResponse(response) {
            for (var i = 0; i < response.items.length; i++) {
                var item = response.items[i];
                // in production code, item.text should have the HTML entities escaped.
                document.getElementById("content").innerHTML += "<br>" + item.volumeInfo.title;
            }
        }
    }


})();
