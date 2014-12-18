(function () {
    
    angular
        .module('app')
        .controller('LoginController', function ($scope, $rootScope, AUTH_EVENTS, AuthService) {
            $scope.credentials = {
                userName: '',
                password: ''
            };
            
            $scope.login = function (credentials) {
                AuthService
                    .login(credentials)
                    .then(function () {
                        $rootScope.$broadcast(AUTH_EVENTS.loginSuccess);
                    }, function() {
                        $rootScope.$broadcast(AUTH_EVENTS.loginFailed);
                    })
                ;
            };
        })
    ;
    
})();