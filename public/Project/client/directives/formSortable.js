
(function(){
    angular
        .module("formSortable", [])
        .directive("formSortable", formSortable);

    function formSortable() {
        function link(scope, element, attrs) {
            var start = null;
            var end   = null;
            $(element)
                .sortable({
                    axis: "y",
                    sort: function(event, ui) {
                        //ui.helper.find("a").hide();
                        start = ui.item.index();
                    },
                    stop: function(event, ui) {
                        //ui.item.find("a").show();
                        end = ui.item.index();
                        if(start >= end) {
                            start--;
                        }
                        scope.jgaSortableCallback({start: start, end: end});
                    }
                });
        }
        return {
            scope: {
                jgaSortableCallback: '&'
            },
            link: link
        };
    }
})();