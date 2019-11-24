import {Get} from '../../decorators';
import {Action} from '../../kernel/action';
import {ActionType} from '../../kernel/route-types';
import {MySQL} from '../../mysql/mysql';
import {MySQLFactory} from '../../mysql/mysql_factory';


export class MaquinaAction extends Action {

    private equipamentoSelecionados():string{
        return 'select * from Equipamento'
    }

    @Get('/maquina')
    public maquina(){
        let equipamento : any = [];
        // let equipamentoSelecionados : string = 'select * from Equipamento'
        console.log(this.equipamentoSelecionados());
        new MySQLFactory().getConnection().select(this.equipamentoSelecionados()).subscribe(
          (data : any) => {
              data.forEach((element : any) => {
                equipamento.push({
                id : element.idEquipamento,
                descricao : element.descricao,
              })
              });
              console.log(equipamento)
              this.sendAnswer(equipamento)
              //console.log("Deu MUITO Certo mesmo1!!!")
          },
          (error : any) => {
              //res.send("Deu errado!!!")
              console.log(error)
              
          }
        );
    }
    defineVisibility() {
        this.actionEscope = ActionType.atPublic;
    }


}






