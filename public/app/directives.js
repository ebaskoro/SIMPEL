(function () {

    angular
        .module('app')
        .directive('detail', function () {
            return {
                link: function (scope, element, attr) {
                    scope.show = function () {
                        element.modal('show');
                    };
                    
                    scope.dismiss = function () {
                        element.modal('hide');
                    };
                }
            };
        })
    ;
    
})();