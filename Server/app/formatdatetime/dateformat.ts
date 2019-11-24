export class FormatarData{

    public dataAtualFormatada(){
        let data = new Date();
            let dia  = data.getDate().toString().padStart(2, '0');
            let mes  = (data.getMonth()+1).toString().padStart(2, '0'); //+1 pois no getMonth Janeiro começa com zero.
            let ano  = data.getFullYear();
            let resultformatada = ano+"/"+mes+"/"+dia;
            return resultformatada;
        // console.log(" data :"+dia+"/"+mes+"/"+ano);
        }
    }