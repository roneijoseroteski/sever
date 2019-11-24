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
var PegaMinhasOsAction = /** @class */ (function (_super) {
    __extends(PegaMinhasOsAction, _super);
    function PegaMinhasOsAction() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    PegaMinhasOsAction.prototype.pegaOS = function () {
        console.log('entrou');
        return 'select ordemServico.idOrdemServico,ordemServico.resumo,DATE_FORMAT(ordemServico.inicioPlanejado, "%d/%m/%Y") AS inicioPlanejado,DATE_FORMAT(ordemServico.fimPlanejado, "%d/%m/%Y") AS fimPlanejado , ordemServico.Status_idStatus, status.tipoStatus,status.idStatus  from ordemServico inner join status  on ordemServico.Status_idStatus = Status.idStatus inner join ordemservico_has_usuario on ordemServico_idOrdemServico =ordemservico.idOrdemServico  where Status_idStatus = idStatus  and Usuario_idUsuario =\'' + this.req.body.idUsuario + '\'';
        //  'select ordemServico.idOrdemServico,ordemServico.resumo,DATE_FORMAT(ordemServico.inicioPlanejado, "%d/%m/%Y") AS inicioPlanejado,DATE_FORMAT(ordemServico.fimPlanejado, "%d/%m/%Y") AS fimPlanejado , ordemServico.Status_idStatus, status.tipoStatus,status.idStatus  from ordemServico, status where Status_idStatus = idStatus  and Usuario_idUsuario =\'' + this.req.body.idUsuario +'\''
        // select ordemServico.idOrdemServico,ordemServico.resumo,DATE_FORMAT(ordemServico.inicioPlanejado, "%d/%m/%Y") AS inicioPlanejado,DATE_FORMAT(ordemServico.fimPlanejado, "%d/%m/%Y") AS fimPlanejado , ordemServico.Status_idStatus, status.tipoStatus,status.idStatus from ordemServico, status where Usuario_idUsuario =1 and Status_idStatus=idStatus
    };
    PegaMinhasOsAction.prototype.Pegaminhasos = function () {
        var _this = this;
        console.log('entrou 5');
        var listaOS = [];
        new mysql_factory_1.MySQLFactory().getConnection().select(this.pegaOS()).subscribe(function (data) {
            console.log('entrou 1');
            data.forEach(function (element) {
                console.log('mamis');
                listaOS.push({
                    idOrdemServico: element.idOrdemServico,
                    resumo: element.resumo,
                    inicioPlanejado: element.inicioPlanejado,
                    fimPlanejado: element.fimPlanejado,
                    Status_idStatus: element.Status_idStatus,
                    tipoStatus: element.tipoStatus
                });
            });
            console.log(listaOS);
            _this.sendAnswer(listaOS);
        }, function (error) {
            _this.sendAnswer(error);
        });
    };
    PegaMinhasOsAction.prototype.defineVisibility = function () {
        this.actionEscope = route_types_1.ActionType.atPublic;
    };
    __decorate([
        decorators_1.Post('/pegaminhasos'),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", void 0)
    ], PegaMinhasOsAction.prototype, "Pegaminhasos", null);
    return PegaMinhasOsAction;
}(action_1.Action));
exports.PegaMinhasOsAction = PegaMinhasOsAction;
