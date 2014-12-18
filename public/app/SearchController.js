(function () {

    angular
        .module('app')
        .controller('SearchController', function ($scope, $resource, toastr, Session) {
            $scope.criteria = {
                fullName: '',
                address: '',
                passport: ''
            }
            
            var Voters = $resource('/api/v1/Pemilih', {}, {
                query: {
                    method: 'GET',
                    isArray: true,
                    headers: {
                        sessionId: Session.id
                    },
                    timeout: 5000
                }
            });
            
            $scope.result = [];
            
            toastr.options = {
                "positionClass": "toast-bottom-full-width"
            };
            
            $scope.clearFullName = function () {
                $scope.criteria.fullName = "";
                $scope.search();
            };
            
            $scope.clearAddress = function () {
                $scope.criteria.address = "";
                $scope.search();
            };
            
            $scope.clearPassport = function () {
                $scope.criteria.passport = "";
                $scope.search();
            };
            
            $scope.search = function () {
                if ($scope.criteria.fullName
                    || $scope.criteria.address
                    || $scope.criteria.passport) {
                    Voters.query({
                        limitCount: 20,
                        fullName: $scope.criteria.fullName,
                        address: $scope.criteria.address,
                        passport: $scope.criteria.passport
                    }, function (voters) {
                        $scope.result = voters;
                    }, function (error) {
                        if (error.status === 401) {
                            $rootScope.$broadcast(AUTH_EVENTS.notAuthenticated);
                        }
                        else {
                            toastr.error("Koneksi terputus");
                        }
                    });
                }
                else {
                    $scope.result = [];
                }
            };
            
            $scope.select = function (item) {
                $scope.selected = item;
                $scope.show();
            };
        })
    ;
    
})();