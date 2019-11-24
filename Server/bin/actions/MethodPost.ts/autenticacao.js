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
var AutenticacaoAction = /** @class */ (function (_super) {
    __extends(AutenticacaoAction, _super);
    function AutenticacaoAction() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.nivelAcesso = "1";
        return _this;
    }
    AutenticacaoAction.prototype.sql = function () {
        return 'select * from Token where Token.Token = \'' + this.req.body.token + '\' and Token.Usuario_idUsuario = \'' + this.req.body.id + '\'; ';
    };
    AutenticacaoAction.prototype.autenticacao = function () {
        var _this = this;
        // let sql = 'select * from Token where Token.Token = \'' + req.body.token + '\' and Token.Usuario_idUsuario = \'' + req.body.id + '\'; '
        var status = true;
        console.log(this.sql());
        var login = [];
        var idUsuario;
        //res.send(sql);
        new mysql_factory_1.MySQLFactory().getConnection().select(this.sql()).subscribe(function (data) {
            if (!data.length || data.length != 1) {
                _this.sendError(new kernel_utils_1.KernelUtils().createErrorApiObject(401, '1001', 'Conta inválida!'));
                console.log("Deu muito ERRADO!");
                return;
            }
            _this.sendAnswer({
                id: _this.req.body.id
            });
            console.log("Deu MUITO Certo!!!");
        }, function (error) {
            console.log(error);
        });
    };
    AutenticacaoAction.prototype.defineVisibility = function () {
        this.actionEscope = route_types_1.ActionType.atPublic;
    };
    __decorate([
        decorators_1.Post('/autenticacao'),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", void 0)
    ], AutenticacaoAction.prototype, "autenticacao", null);
    return AutenticacaoAction;
}(action_1.Action));
exports.AutenticacaoAction = AutenticacaoAction;
