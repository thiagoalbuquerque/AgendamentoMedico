app.controller('DetalhesCtrl', function ($scope, $ionicHistory, $state, AppService, ApiService) {
    $scope.cliente = AppService.pull('cliente');
    $scope.agendamentos = [];
    $scope.sangue = false;
    $scope.drogas = false;
    $scope.esforco = false;
    $scope.entrevista = false;
    $scope.today = new Date();
    $scope.sangueHora = 0;
    $scope.drogasHora = 0;
    $scope.esforcoHora = 0;
    $scope.entrevistaHora = 0;

    $scope.detalhes = function (item) {
        AppService.push('cliente', item);

        $state.go('AgendamentoDetalhes');

    }

    $scope.EnderecoAlternativo = function () {
        //console.log("obj param: " + $scope.cliente)
        ApiService.updateClient($scope.cliente.Id, $scope.cliente).then(response => {
            //console.log(response);
            $scope.editing = false;
        })
    }

    $scope.cancelar = function (exame) {
        //console.log('entrou no fucntion');
        var ag = $scope.agendamentos;
        for (i in ag) {
            if (ag[i].TipoExame == exame) {
                ApiService.removeAgendamento(ag[i].Id).then(response => {
                    //console.log('removeu');
                    AppService.push('cliente', $scope.cliente);
                    $state.go("AgendamentoDetalhes");
                })
            }
        }
    }

    $scope.remarcar = function (exame) {
        //console.log('entrou no fucntion');
        var ag = $scope.agendamentos;
        for (i in ag) {
            if (ag[i].TipoExame == exame) {
                ApiService.removeAgendamento(ag[i].Id).then(response => {
                    //console.log('removeu');
                    $scope.agendar(exame, $scope.cliente);
                })
            }
        }
    }

    $scope.agendar = function (exame, cliente) {
        console.log('exame: ' + exame + ' cliente: ' + cliente.Nome)
        AppService.push('cliente', cliente);
        switch (exame) {
            case 1:
                $state.go("ExameSangue");
                break;
            case 2:
                $state.go("ExameToxicologico");
                break;
            case 3:
                $state.go("ExameEsforco");
                break;
            case 4:
                $state.go("ExameEntrevista");
                break;
        }
    }

    $scope.goBack = function () {
        $ionicHistory.goBack();
    }

    $scope.goHome = function () {
        $state.go("Home")
    }

    ApiService.getAgendamentoByClient($scope.cliente.Id).then(response => {
        var agendamentos = response.data;
        $scope.agendamentos = agendamentos;
        var check = [false, false, false, false];
        var exames = [$scope.cliente.ExameSangue, $scope.cliente.ExameToxicologico, $scope.cliente.ExameEsforco, $scope.cliente.ExameEntrevista];
        console.log('exames: ' + exames);
        var ok = true;
        for (i in agendamentos) {
            //console.log(agendamentos[i].Mes + " " + agendamentos[i].Dia + ", " + agendamentos[i].Ano);
            switch (agendamentos[i].TipoExame) {
                case 1:
                    $scope.ExameSangue = true
                    $scope.sangueHora = ((Date.parse(agendamentos[i].Mes + " " + agendamentos[i].Dia + ", " + agendamentos[i].Ano) - Date.parse($scope.today)) / (3600000)) + agendamentos[i].Hora;
                    if ($scope.sangueHora < 0) {
                        check[0] = true
                        console.log('ExameSangue true');
                        exames[0] = false;
                    } else {
                        check[0] = false
                        console.log('ExameSangue false');
                    }
                    //console.log($scope.sangueHora);
                    break;
                case 2:
                    $scope.ExameToxicologico = true
                    $scope.drogasHora = ((Date.parse(agendamentos[i].Mes + " " + agendamentos[i].Dia + ", " + agendamentos[i].Ano) - Date.parse($scope.today)) / (3600000)) + agendamentos[i].Hora;
                    if ($scope.drogasHora < 0) {
                        check[1] = true
                        console.log('ExameToxicologico true');
                        exames[1] = false;
                    } else {
                        check[1] = false
                        console.log('ExameToxicologico false');
                    }
                    break;
                case 3:
                    $scope.ExameEsforco = true
                    $scope.esforcoHora = ((Date.parse(agendamentos[i].Mes + " " + agendamentos[i].Dia + ", " + agendamentos[i].Ano) - Date.parse($scope.today)) / (3600000)) + agendamentos[i].Hora;
                    if ($scope.esforcoHora < 0) {
                        check[2] = true
                        console.log('ExameEsforco true');
                        exames[2] = false;
                    } else {
                        check[2] = false
                        console.log('ExameEsforco false');
                    }
                    //console.log($scope.esforcoHora)
                    break;
                case 4:
                    $scope.ExameEntrevista = true
                    $scope.entrevistaHora = ((Date.parse(agendamentos[i].Mes + " " + agendamentos[i].Dia + ", " + agendamentos[i].Ano) - Date.parse($scope.today)) / (3600000)) + agendamentos[i].Hora;
                    //console.log($scope.entrevistaHora)
                    if ($scope.entrevistaHora < 0) {
                        check[3] = true
                        console.log('ent true');
                        exames[3] = false;
                    } else {
                        check[3] = false
                        console.log('ent false');
                    }
                    break;
            }
        }

        if ($scope.cliente.Check == false) {
            for (a in check) {
                console.log('check: ' + check[a])
                if (check[a] == false) {
                    console.log('exame: ' + exames[a])
                    if (exames[a] == true) {
                        ok = false;
                    }
                }
            }
            //console.log(ok);
            if (ok) {
                $scope.cliente.Check = true;
                ApiService.updateClient($scope.cliente.Id, $scope.cliente).then(response => {
                    console.log('editou');
                })

            }
        }

    })

})