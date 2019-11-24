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
var StatusAction = /** @class */ (function (_super) {
    __extends(StatusAction, _super);
    function StatusAction() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    StatusAction.prototype.statusSelecionados = function () {
        return 'select * from Status';
    };
    StatusAction.prototype.status = function () {
        var _this = this;
        var status = [];
        // let statusSelecionados : string = 'select * from Status'
        console.log(this.statusSelecionados());
        new mysql_factory_1.MySQLFactory().getConnection().select(this.statusSelecionados()).subscribe(function (data) {
            data.forEach(function (element) {
                status.push({
                    id: element.idStatus,
                    tipoStatus: element.tipoStatus,
                });
            });
            _this.sendAnswer(status);
            //console.log("Deu MUITO Certo mesmo1!!!")
        }, function (error) {
            //res.send("Deu errado!!!")
            console.log(error);
        });
    };
    StatusAction.prototype.defineVisibility = function () {
        this.actionEscope = route_types_1.ActionType.atPublic;
    };
    __decorate([
        decorators_1.Get('/status'),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", void 0)
    ], StatusAction.prototype, "status", null);
    return StatusAction;
}(action_1.Action));
exports.StatusAction = StatusAction;
