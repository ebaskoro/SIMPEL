(function () {

    angular
        .module('app')
        .filter('empty', function () {
            return function (input, emptyText) {
                if (input.trim()) {
                    return input;
                }
                else {
                    return emptyText;
                }
            };
        })
    ;
    
    angular
        .module('app')
        .filter('gender', function () {
            return function (input) {
                if (input === "L") {
                    return "LAKI-LAKI";
                }
                else if (input === "P") {
                    return "PEREMPUAN";
                }
                else {
                    return input;
                }
            };
        })
    ;
    
    
    angular
        .module('app')
        .filter('category', function () {
            return function (input) {
                if (input === "3") {
                    return "(DPKTb)";
                }
                else {
                    return "";
                }
            };
        })
    ;
    
})();