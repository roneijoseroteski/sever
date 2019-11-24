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
var timeformat_1 = require("../../formatdatetime/timeformat");
var VerificaManutencaoAction = /** @class */ (function (_super) {
    __extends(VerificaManutencaoAction, _super);
    function VerificaManutencaoAction() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.data = new timeformat_1.FormataTime().horaAtualFormatada();
        return _this;
    }
    VerificaManutencaoAction.prototype.insertOrdem = function () {
        return 'SET AUTOCOMMIT=0;START TRANSACTION;insert into Verificacao(solucaoRealizada,dataFim, problemaResolvido, responsavel1, responsavel2,ordemServico_idOrdemServico) values(\'' + this.req.body.solucaoRealizada + '\',\'' + this.data + '\',' + this.req.body.problemaResolvido + ',' + this.req.body.responsavel1 + ',' + this.req.body.responsavel2 + ',' + this.req.body.numeroOrdem + ');UPDATE ordemServico SET Status_idStatus = \'' + 3 + '\' WHERE idOrdemServico = \'' + this.req.body.numeroOrdem + '\';COMMIT;SET AUTOCOMMIT=1;';
    };
    VerificaManutencaoAction.prototype.VerificaManutencao = function () {
        var _this = this;
        var verificaId = [];
        console.log(this.insertOrdem());
        //res.send(sql);
        new mysql_factory_1.MySQLFactory().getConnection().insert(this.insertOrdem()).subscribe(function (data) {
            console.log(data);
            data.forEach(function (element) {
                verificaId.push({
                    idVerificacao: element.idVerificacao
                });
            });
            console.log(verificaId);
            _this.sendAnswer({ verificaId: verificaId });
        }, function (error) {
            console.log(error);
        });
    };
    VerificaManutencaoAction.prototype.defineVisibility = function () {
        this.actionEscope = route_types_1.ActionType.atPublic;
    };
    __decorate([
        decorators_1.Post('/verificamanutencao'),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", void 0)
    ], VerificaManutencaoAction.prototype, "VerificaManutencao", null);
    return VerificaManutencaoAction;
}(action_1.Action));
exports.VerificaManutencaoAction = VerificaManutencaoAction;
