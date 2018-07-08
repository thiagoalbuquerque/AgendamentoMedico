app.controller('AgendamentoDetalhesCtrl', function ($scope, ApiService, $state, AppService) {
    $scope.cliente = AppService.pull('cliente');
    $scope.agendamentos = [];
    $scope.ExameSangue = false;
    $scope.ExameToxicologico = false;
    $scope.ExameEsforco = false;
    $scope.ExameEntrevista = false;
   
    $scope.goBack = function(cliente){
        AppService.push('cliente', cliente);
        $state.go("Detalhes");
    }

    $scope.goHome = function(){
        $state.go("Home")
    }

    ApiService.getAgendamentoByClient($scope.cliente.Id).then(response => {
        var agendamentos = response.data;
        $scope.agendamentos = agendamentos;
        for (i in agendamentos) {
            switch (agendamentos[i].TipoExame) {
                case 1:
                    $scope.ExameSangue = true
                    break;
                case 2:
                    $scope.ExameToxicologico = true
                    break;
                case 3:
                    $scope.ExameEsforco = true
                    break;
                case 4:
                    $scope.ExameEntrevista = true
                    break;
            }

        }

    })
})