app.controller('ExameEntrevistaCtrl', function ($scope, ApiService, $state, $ionicHistory, $ionicLoading, AppService) {
    $scope.cliente = AppService.pull('cliente');
    $scope.date = new Date();
    this.isOpen = false;
    $scope.minDate = new Date(
        $scope.date.getFullYear(),
        $scope.date.getMonth(),
        $scope.date.getDate()
    );

    $scope.oito = true;
    $scope.nove = true;
    $scope.dez = true;
    $scope.onze = true;
    $scope.doze = true;
    $scope.treze = true;
    $scope.quatorze = true;
    $scope.quinze = true;
    $scope.dezesseis = true;

    $scope.goHome = function () {
        $state.go("Home")
    }

    $scope.goBack = function(cliente){
        AppService.push('cliente', cliente);
        $ionicHistory.goBack();
    }

    $scope.horarios = false;
    var data = new Date;
    var dia = data.getDate();
    var mes = data.getMonth() + 1;
    var match = [];    
    ApiService.getAgendamentos().then(response => {
        var res = response.data;
        for (i in res) {
            if (res[i].TipoExame == 4) {
                if (res[i].Dia == dia) {
                    if (res[i].Mes == mes) {
                        match.push(res[i]);

                    }
                }
            }
        }

        //console.log(match);
        for (a in match) {

            //console.log(match[a].Hora)
            switch (match[a].Hora) {
                case 8:
                    $scope.oito = false
                    $scope.nove = false
                    break;
                case 9:
                    $scope.nove = false
                    $scope.dez = false
                    break;
                case 10:
                    $scope.dez = false
                    $scope.onze = false
                    break;
                case 11:
                    $scope.onze = false
                    $scope.doze = false
                    break;
                case 12:
                    $scope.doze = false
                    $scope.treze = false
                    break;
                case 13:
                    $scope.treze = false
                    $scope.quatorze = false
                    break;
                case 14:
                    $scope.quatorze = false
                    $scope.quinze = false
                    break;
                case 15:
                    $scope.quinze = false
                    $scope.dezesseis = false
                    break;
                case 16:
                    $scope.dezesseis = false
                    break;
            }
        }
        if (data.getHours() >= 8) {
            $scope.oito = false;
        }
        if (data.getHours() >= 9) {
            $scope.nove = false;
        }
        if (data.getHours() >= 10) {
            $scope.dez = false;
        }
        if (data.getHours() >= 11) {
            $scope.onze = false;
        }
        if (data.getHours() >= 12) {
            $scope.doze = false;
        }
        if (data.getHours() >= 13) {
            $scope.treze = false;
        }
        if (data.getHours() >= 14) {
            $scope.quatorze = false;
        }
        if (data.getHours() >= 15) {
            $scope.quinze = false;
        }
        if (data.getHours() >= 16) {
            $scope.dezesseis = false;
        }

        $scope.horarios = true;
    })

    $scope.getHorarios = function (data) {
        $scope.oito = true;
        $scope.nove = true;
        $scope.dez = true;
        $scope.onze = true;
        $scope.doze = true;
        $scope.treze = true;
        $scope.quatorze = true;
        $scope.quinze = true;
        $scope.dezesseis = true;
        var dia = data.getDate();
        var mes = data.getMonth() + 1;
        var ano = data.getFullYear();
        var match = [];
        // console.log((((data) - Date.parse($scope.minDate)) / (3600000)) + data.getHours());
        // console.log(data);
        // console.log($scope.minDate);
        if(((data - $scope.minDate) / (3600000)) + data.getHours() >= 0){       
            ApiService.getAgendamentos().then(response => {
                var res = response.data;
                for (i in res) {
                    if (res[i].TipoExame == 4) {
                        if (res[i].Dia == dia) {
                            if (res[i].Mes == mes) {
                                match.push(res[i]);
    
                            }
                        }
                    }
                }
                //console.log(match);   
                for (a in match) {
                    //console.log(match[a].Hora)
                    switch (match[a].Hora) {
                        case 8:
                            $scope.oito = false
                            $scope.nove = false
                            break;
                        case 9:
                            $scope.nove = false
                            $scope.dez = false
                            break;
                        case 10:
                            $scope.dez = false
                            $scope.onze = false
                            break;
                        case 11:
                            $scope.onze = false
                            $scope.doze = false
                            break;
                        case 12:
                            $scope.doze = false
                            $scope.treze = false
                            break;
                        case 13:
                            $scope.treze = false
                            $scope.quatorze = false
                            break;
                        case 14:
                            $scope.quatorze = false
                            $scope.quinze = false
                            break;
                        case 15:
                            $scope.quinze = false
                            $scope.dezesseis = false
                            break;
                        case 16:
                            $scope.dezesseis = false
                            break;
                    }
                }
                if(ano ===  $scope.minDate.getFullYear() && mes === ($scope.minDate.getMonth()+1) && dia === $scope.minDate.getDate()){
                    //console.log('igual');
                    if (data.getHours() >= 8) {
                        $scope.oito = false;
                    }
                    if (data.getHours() >= 9) {
                        $scope.nove = false;
                    }
                    if (data.getHours() >= 10) {
                        $scope.dez = false;
                    }
                    if (data.getHours() >= 11) {
                        $scope.onze = false;
                    }
                    if (data.getHours() >= 12) {
                        $scope.doze = false;
                    }
                    if (data.getHours() >= 13) {
                        $scope.treze = false;
                    }
                    if (data.getHours() >= 14) {
                        $scope.quatorze = false;
                    }
                    if (data.getHours() >= 15) {
                        $scope.quinze = false;
                    }
                    if (data.getHours() >= 16) {
                        $scope.dezesseis = false;
                    }
                }
                $scope.horarios = true;
            })
        }else{
            $scope.horarios = false;
        }
       

    }

    $scope.agendar = function (id, dia, mes, ano, hora) {
        agendamento = {
            IdCliente: id,
            TipoExame: 4,
            Dia: dia,
            Mes: mes,
            Ano: ano,
            Hora: hora,
            IdPrestador: 2
        }
        $ionicLoading.show({
            template: '<ion-spinner icon="lines" class="spinner-energized"></ion-spinner> <br/>waiting...'                
        });
        ApiService.addAgendamento(agendamento).then(response => {
            AppService.push('cliente', $scope.cliente);
            $state.go("AgendamentoDetalhes");
        }).finally(final => {
            $ionicLoading.hide();
        })
    }

    ApiService.getClientById($scope.cliente.Id).then(response => {
        $scope.cliente = response.data;
        //console.log($scope.cliente);
    })
})