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
var DetalhamentoOrdemAction = /** @class */ (function (_super) {
    __extends(DetalhamentoOrdemAction, _super);
    function DetalhamentoOrdemAction() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    DetalhamentoOrdemAction.prototype.ordemServico = function () {
        return 'select ordemServico.Usuario_idUsuario,ordemServico.resumo,ordemServico.descricao,tipoManutencao.tipoManutencao,ordemServico.requerParada,DATE_FORMAT(ordemServico.inicioPlanejado, "%d/%m/%Y") AS inicioPlanejado,DATE_FORMAT(ordemServico.fimPlanejado, "%d/%m/%Y") AS fimPlanejado,Equipamento.numeroPatrimonio,Setor.nome,Status.tipoStatus from ordemServico INNER JOIN tipoManutencao ON ordemServico.tipoManutencao_idtipoManutencao = tipoManutencao.idtipoManutencao  INNER JOIN Status ON ordemServico.Status_idStatus = Status.idStatus INNER JOIN Setor ON ordemServico.Setor_idSetor = Setor.idSetor LEFT JOIN Equipamento ON ordemServico.Equipamento_idEquipamento = Equipamento.idEquipamento  where ordemServico.idOrdemServico =\'' + this.req.body.id + '\'';
    };
    DetalhamentoOrdemAction.prototype.detalhamentoOrdem = function () {
        var _this = this;
        var ordem = [];
        // let ordemServico: string;
        // ordemServico = 'select ordemServico.resumo,ordemServico.descricao,ordemServico.tipoManutencao,ordemServico.requerParada,ordemServico.inicioPlanejado,ordemServico.fimPlanejado,Equipamento.numeroPatrimonio,Setor.nome,Status.tipoStatus from ordemServico INNER JOIN Status ON ordemServico.Status_idStatus = Status.idStatus INNER JOIN Setor ON ordemServico.Setor_idSetor = Setor.idSetor LEFT JOIN Equipamento ON ordemServico.Equipamento_idEquipamento = Equipamento.idEquipamento  where ordemServico.idOrdemServico =\''+req.body.id+'\'' 
        console.log('entrou em detalhe ordem serviço');
        console.log(this.ordemServico());
        new mysql_factory_1.MySQLFactory().getConnection().select(this.ordemServico()).subscribe(function (data) {
            data.forEach(function (element) {
                ordem.push({
                    resumo: element.resumo,
                    descricao: element.descricao,
                    numeroPatrimonio: element.numeroPatrimonio,
                    requerParada: element.requerParada,
                    tipoManutencao: element.tipoManutencao,
                    nome: element.nome,
                    inicioPlanejado: element.inicioPlanejado,
                    fimPlanejado: element.fimPlanejado,
                    tipoStatus: element.tipoStatus,
                });
            });
            _this.sendAnswer(ordem);
            //console.log("Deu MUITO Certo mesmo1!!!")
        }, function (error) {
            //res.send("Deu errado!!!")
            console.log(error);
        });
    };
    DetalhamentoOrdemAction.prototype.defineVisibility = function () {
        this.actionEscope = route_types_1.ActionType.atPublic;
    };
    __decorate([
        decorators_1.Post('/detalhamentoordem'),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", void 0)
    ], DetalhamentoOrdemAction.prototype, "detalhamentoOrdem", null);
    return DetalhamentoOrdemAction;
}(action_1.Action));
exports.DetalhamentoOrdemAction = DetalhamentoOrdemAction;
