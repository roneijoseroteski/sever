"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var decorators_1 = require("../../decorators");
var action_1 = require("../../kernel/action");
var route_types_1 = require("../../kernel/route-types");
var mysql_factory_1 = require("../../mysql/mysql_factory");
var dateformat_1 = require("../../formatdatetime/dateformat");
var timeformat_1 = require("../../formatdatetime/timeformat");
var SolicitaPecasAction = /** @class */ (function (_super) {
    __extends(SolicitaPecasAction, _super);
    function SolicitaPecasAction() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.data = new dateformat_1.FormatarData().dataAtualFormatada();
        _this.hora = new timeformat_1.FormataTime().horaAtualFormatada();
        return _this;
    }
    SolicitaPecasAction.prototype.pecaSQL = function () {
        return 'insert into SolicitacaoProduto(hora, data, quantidadeSolicitada, descricaoSolicitacao,Setor_idSetor,Prioridade_idPrioridade,Equipamento_idEquipamento,Usuario_idUsuario) values(\'' + this.hora + '\',\'' + this.data + '\',\'' + this.req.body.numeroPecas + '\',\'' + this.req.body.NomePeca + '\',\'' + this.req.body.setor + '\',\'' + this.req.body.prioridade + '\',\'' + this.req.body.maquinaDestinada + '\',\'' + this.req.body.usuario + '\')';
    };
    SolicitaPecasAction.prototype.pecaSQL1 = function () {
        return 'insert into SolicitacaoProduto(hora, data, quantidadeSolicitada, descricaoSolicitacao,Setor_idSetor,Prioridade_idPrioridade,Usuario_idUsuario,ordemServico_idOrdemServico) values(\'' + this.hora + '\',\'' + this.data + '\',\'' + this.req.body.numeroPecas + '\',\'' + this.req.body.NomePeca + '\',\'' + this.req.body.setor + '\',\'' + this.req.body.prioridade + '\',\'' + this.req.body.usuario + '\',\'' + this.req.body.orderKey + '\')';
    };
    SolicitaPecasAction.prototype.pecaSQL2 = function () {
        return 'insert into SolicitacaoProduto(hora, data, quantidadeSolicitada, descricaoSolicitacao,Setor_idSetor,Prioridade_idPrioridade,Equipamento_idEquipamento,Usuario_idUsuario,ordemServico_idOrdemServico) values(\'' + this.hora + '\',\'' + this.data + '\',\'' + this.req.body.numeroPecas + '\',\'' + this.req.body.NomePeca + '\',\'' + this.req.body.setor + '\',\'' + this.req.body.prioridade + '\',\'' + this.req.body.maquinaDestinada + '\',\'' + this.req.body.usuario + '\',\'' + this.req.body.orderKey + '\')';
    };
    SolicitaPecasAction.prototype.pecaSQL3 = function () {
        return 'insert into SolicitacaoProduto(hora, data, quantidadeSolicitada, descricaoSolicitacao,Setor_idSetor,Prioridade_idPrioridade,Usuario_idUsuario) values(\'' + this.hora + '\',\'' + this.data + '\',\'' + this.req.body.numeroPecas + '\',\'' + this.req.body.NomePeca + '\',\'' + this.req.body.setor + '\',\'' + this.req.body.prioridade + '\',\'' + this.req.body.usuario + '\')';
    };
    SolicitaPecasAction.prototype.SolicitaPecas = function () {
        var _this = this;
        var pecaSQL = "";
        console.log(this.pecaSQL());
        if ((this.req.body.orderKey === undefined || this.req.body.orderKey === null) && (this.req.body.maquinaDestinada != undefined && this.req.body.maquinaDestinada != null)) {
            pecaSQL = this.pecaSQL();
        }
        else if ((this.req.body.maquinaDestinada === undefined || this.req.body.maquinaDestinada === null) && (this.req.body.orderKey != undefined && this.req.body.orderKey != null)) {
            pecaSQL = this.pecaSQL1();
        }
        else if ((this.req.body.maquinaDestinada != undefined && this.req.body.maquinaDestinada != null) && (this.req.body.orderKey != undefined && this.req.body.orderKey != null)) {
            pecaSQL = this.pecaSQL2();
        }
        else if ((this.req.body.maquinaDestinada === undefined || this.req.body.maquinaDestinada === null) && (this.req.body.orderKey === undefined || this.req.body.orderKey === null)) {
            pecaSQL = this.pecaSQL3();
        }
        new mysql_factory_1.MySQLFactory().getConnection().insert(pecaSQL).subscribe(function (data) {
            console.log("aqui r2");
            _this.sendAnswer({ Sucesso: "Peça solicitada com Sucesso" });
        }, function (error) {
            console.log("aqui r");
            console.log(error);
        });
    };
    SolicitaPecasAction.prototype.defineVisibility = function () {
        this.actionEscope = route_types_1.ActionType.atPublic;
    };
    __decorate([
        decorators_1.Post('/solicitapecas'),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", void 0)
    ], SolicitaPecasAction.prototype, "SolicitaPecas", null);
    return SolicitaPecasAction;
}(action_1.Action));
exports.SolicitaPecasAction = SolicitaPecasAction;
