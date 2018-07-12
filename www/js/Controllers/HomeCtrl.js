app.controller('HomeCtrl', function ($scope, $state, $ionicLoading, AppService, ApiService) {
    $scope.list = [];

    $scope.buscar = function (nome) {
        if (nome.length >= 3) {
            $ionicLoading.show({
                template: '<ion-spinner icon="lines" class="spinner-energized"></ion-spinner> <br/> Carregando...'
            });
            ApiService.getClientByName(nome)
                .then(response => {
                    $scope.list = response.data;
                    response.data.sort(function (a, b) {
                        var x = a.Nome.toLowerCase();
                        var y = b.Nome.toLowerCase();
                        if (x < y) { return -1; }
                        if (x > y) { return 1; }
                        return 0;
                    });
                })
                .finally(final => {
                    $ionicLoading.hide();
                })
        } else {
            $scope.list = [];
        }
    };

    $scope.showDetails = function (item) {
        AppService.push('cliente', item);
        $state.go('Detalhes');
    }

})