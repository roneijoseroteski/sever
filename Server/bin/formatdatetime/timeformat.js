"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var FormataTime = /** @class */ (function () {
    function FormataTime() {
    }
    FormataTime.prototype.horaAtualFormatada = function (seconds) {
        if (seconds === void 0) { seconds = false; }
        var data = new Date();
        var hora = data.getHours().toString().padStart(2, '0');
        var min = data.getMinutes().toString().padStart(2, '0');
        var result = hora + ':' + min;
        if (seconds) {
            var seg = data.getSeconds().toString().padStart(2, '0');
            result = result + ':' + seg;
        }
        return result;
    };
    return FormataTime;
}());
exports.FormataTime = FormataTime;
