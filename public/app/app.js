(function () {

    angular.module('app', ['ngResource']);
    
    angular
        .module('app')
        .value('toastr', toastr)
    ;
    
    angular
        .module('app')
        .constant('AUTH_EVENTS', {
            loginSuccess: 'auth-login-success',
            loginFailed: 'auth-login-failed',
            sessionTimeout: 'auth-session-timeout',
            notAuthenticated: 'auth-not-authenticated',
            notAuthorised: 'auth-not-authorised'
        })
    ;
    
    angular
        .module('app')
        .constant('USER_ROLES', {
            all: '*',
            admin: 'admin'
        })
    ;
    
    angular
        .module('app')
        .factory('AuthService', function ($http, Session) {
            return {
                login: function (credentials) {
                    return $http
                        .post('/login', credentials)
                        .then(function (result) {
                            var response = result.data;
                            Session.create(response.id, response.userId, response.role);
                        })
                    ;
                },
                
                isAuthenticated: function () {
                    return !!Session.userId;
                }
            };
        })
    ;
    
    angular
        .module('app')
        .service('Session', function () {
            this.create = function (id, userId, role) {
                this.id = id;
                this.userId = userId;
                this.role = role;
            };
            
            this.destroy = function () {
                this.id = null;
                this.userId = null;
                this.role = null;
            };
            
            return this;
        })
    ;
    
    angular
        .module('app')
        .factory('AuthInterceptor', function ($rootScope, $q, AUTH_EVENTS) {
            return {
                responseError: function (response) {
                    if (response.status === 401) {
                        $rootScope.$broadcast(AUTH_EVENTS.notAuthenticated, response);
                    }
                    else {
                    }
                    
                    return $q.reject(response);
                }
            };
        })
    ;
    
    angular
        .module('app')
        .config(function ($httpProvider) {
            $httpProvider.interceptors.push([
                '$injector',
                function ($injector) {
                    return $injector.get('AuthInterceptor');
                }
            ]);
        })
    ;
    
})();