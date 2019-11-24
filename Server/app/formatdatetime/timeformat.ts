export class FormataTime{

    public horaAtualFormatada(seconds : boolean = false){

        let data = new Date();
        let hora = data.getHours().toString().padStart(2, '0');
        let min = data.getMinutes().toString().padStart(2, '0');
        let result = hora + ':' + min;
        
        if (seconds){
            let seg = data.getSeconds().toString().padStart(2, '0');
            result = result + ':' + seg;
        }
        
        return result;
        }
    }