"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var FormatarData = /** @class */ (function () {
    function FormatarData() {
    }
    FormatarData.prototype.dataAtualFormatada = function () {
        var data = new Date();
        var dia = data.getDate().toString().padStart(2, '0');
        var mes = (data.getMonth() + 1).toString().padStart(2, '0'); //+1 pois no getMonth Janeiro começa com zero.
        var ano = data.getFullYear();
        var resultformatada = ano + "/" + mes + "/" + dia;
        return resultformatada;
        // console.log(" data :"+dia+"/"+mes+"/"+ano);
    };
    return FormatarData;
}());
exports.FormatarData = FormatarData;
