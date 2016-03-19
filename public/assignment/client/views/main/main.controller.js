/**
 * Created by mengxichen on 2/9/16.
 */
(function(){
    angular
        .module("FormBuilderApp")
        .controller("MainController", MainController);

    function MainController( $location) {
        var vm = this;
        vm.$location = $location;
    }

})();

