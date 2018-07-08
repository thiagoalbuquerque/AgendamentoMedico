app.factory('ApiService', function ($http) {
    const BASE_URL = "http://localhost:62650/api";
    const URL_GET_ALL = BASE_URL + "/clientes/";
    const URL_GET_SINGLE = BASE_URL + "/clientes/";
    const URL_GET_BY_NOME = BASE_URL + "/clientes/nome/"
    const URL_ADD = BASE_URL + "/clientes/";
    const URL_REMOVE = BASE_URL + "/clientes/";
    const URL_UPDATE = BASE_URL + "/clientes/";
    const URL_GET_agendamentoes = BASE_URL + "/agendamentoes/"
    const URL_AGENDAMENTO_CLIENTE = BASE_URL + "/agendamentoes/"
    const URL_ADD_AGENDAMENTO = BASE_URL + "/agendamentoes/";
    const URL_REMOVE_AGENDAMENTO = BASE_URL + "/agendamentoes/"

    var ApiService = {
        getClients: function () {
            return httpRequest('GET', URL_GET_ALL);
        },
        getClientById: function (id) {
            return httpRequest('GET', URL_GET_SINGLE + id);
        },
        getClientByName: function (nome) {
            return httpRequest('GET', URL_GET_BY_NOME + nome);
        },
        addClient: function (client) {
            return httpRequest('POST', URL_ADD, client);
        },
        removeClient: function (client) {
            return httpRequest('DELETE', URL_REMOVE, client);     //MODIFICADO
        },
        updateClient: function (id, client) {
            return httpRequest('PUT', URL_UPDATE + id, client);
        },
        getAgendamentoByClient: function (id) {
            return httpRequest('GET', URL_AGENDAMENTO_CLIENTE + id);
        },
        getAgendamentos: function () {
            return httpRequest('GET', URL_AGENDAMENTO_CLIENTE);
        },
        addAgendamento: function (ag) {
            return httpRequest('POST', URL_ADD_AGENDAMENTO, ag);
        },
        removeAgendamento: function (id) {
            return httpRequest('DELETE', URL_REMOVE_AGENDAMENTO + id);
        }
    }

    function httpRequest(method, url, param) {
        return $http({
            method: method,
            url: url,
            data: (param) ? param : {}
        });
    }
    return ApiService;
})