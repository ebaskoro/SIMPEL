(function () {

    angular
        .module('app')
        .controller('ApplicationController', function ($scope, USER_ROLES, AUTH_EVENTS, Session, toastr) {
            $scope.currentUser = null;
            $scope.userRoles = USER_ROLES;
            $scope.isAuthorised = false;
            
            toastr.options = {
                "positionClass": "toast-bottom-full-width"
            };
            
            $scope.$on(AUTH_EVENTS.loginSuccess, function () {
                $scope.currentUser = Session.userId;
            });
            
            $scope.$on(AUTH_EVENTS.loginFailed, function () {
                toastr.warning("Nama Penguna dan/atau Kata Sandi salah");
            });
            
            $scope.$on(AUTH_EVENTS.notAuthenticated, function () {
                $scope.currentUser = null;
                toastr.warning("Masukan Nama Penguna dan Kata Sandi");
            });
        })
    ;
    
})();