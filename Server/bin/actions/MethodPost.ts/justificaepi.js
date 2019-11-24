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
var mysql_factory_1 = require("../../mysql/mysql_factory");
var JustificaEpiAction = /** @class */ (function (_super) {
    __extends(JustificaEpiAction, _super);
    function JustificaEpiAction() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    JustificaEpiAction.prototype.SQLEpiJustifica = function () {
        return 'UPDATE ordemServico_has_Epi SET checked=\'' + this.req.body.checked + '\', justificativa=\'' + this.req.body.justificativa + '\' WHERE ordemServico_idOrdemServico=\'' + this.req.body.idOrdemServico + '\' and Epi_idEpi=\'' + this.req.body.idEpi + '\'';
    };
    JustificaEpiAction.prototype.SQLSemJustifica = function () {
        return 'UPDATE ordemServico_has_Epi SET checked=\'' + this.req.body.checked + '\' WHERE ordemServico_idOrdemServico=\'' + this.req.body.idOrdemServico + '\' and Epi_idEpi=\'' + this.req.body.idEpi + '\'';
    };
    // 'update ordemServico set Status_idStatus =\'' + this.req.body.fk_Status + '\'where ordemServico.Usuario_idUsuario = \'' + this.req.body.idUsuario + '\' and ordemServico.idOrdemServico =\'' + this.req.body.idOrdemServico + '\''
    JustificaEpiAction.prototype.EpicomJustificativa = function () {
        this.req.body.listaepi.foreach(function (element) {
            new mysql_factory_1.MySQLFactory().getConnection().insert().subscribe(function (data) {
                console.log('entrou 1');
            }, function (error) {
                console.log(error);
            });
        });
    };
    __decorate([
        decorators_1.Post('/epicomjustificativa'),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", void 0)
    ], JustificaEpiAction.prototype, "EpicomJustificativa", null);
    return JustificaEpiAction;
}(action_1.Action));
exports.JustificaEpiAction = JustificaEpiAction;
