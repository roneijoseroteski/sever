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
var kernel_utils_1 = require("../../kernel/kernel-utils");
var VerificaServicoAction = /** @class */ (function (_super) {
    __extends(VerificaServicoAction, _super);
    function VerificaServicoAction() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.nivelAcesso = "2";
        return _this;
    }
    VerificaServicoAction.prototype.sqlVerificaServico = function () {
        return 'select * from usuario where usuario.numeroCracha = \'' + this.req.body.cracha + '\' and usuario.senha = \'' + this.req.body.password + '\' and usuario.nivelAcesso = \'' + this.nivelAcesso + '\' ';
    };
    VerificaServicoAction.prototype.verificaservico = function () {
        var _this = this;
        var usuarioVerificador = [];
        console.log(this.sqlVerificaServico());
        //res.send(sql);
        new mysql_factory_1.MySQLFactory().getConnection().select(this.sqlVerificaServico()).subscribe(function (data) {
            if (!data.length || data.length != 1) {
                _this.sendError(new kernel_utils_1.KernelUtils().createErrorApiObject(401, '1001', 'Conta inválida!'));
                console.log("Deu muito ERRADO!");
                return;
            }
            data.forEach(function (element) {
                usuarioVerificador.push({
                    idUsuario: element.idUsuario,
                    numeroCracha: element.numeroCracha,
                });
            });
            _this.sendAnswer({ usuarioVerificador: usuarioVerificador });
            console.log("Deu MUITO Certo!!!");
        }, function (error) {
            console.log(error);
        });
    };
    VerificaServicoAction.prototype.defineVisibility = function () {
        this.actionEscope = route_types_1.ActionType.atPublic;
    };
    __decorate([
        decorators_1.Post('/verificaservico'),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", void 0)
    ], VerificaServicoAction.prototype, "verificaservico", null);
    return VerificaServicoAction;
}(action_1.Action));
exports.VerificaServicoAction = VerificaServicoAction;
