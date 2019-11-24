import {Get} from '../../decorators';
import {Action} from '../../kernel/action';
import {ActionType} from '../../kernel/route-types';
import {MySQL} from '../../mysql/mysql';
import {MySQLFactory} from '../../mysql/mysql_factory';


export class PrioridadeAction extends Action {


    private prioridadesSelecionadas() : string{
        return 'select * from Prioridade'
    }

    @Get('/prioridade')
     public Prioridade(){
        let prioridade : any = [];
        // let prioridadesSelecionadas : string = 'select * from Prioridade'
        console.log(this.prioridadesSelecionadas());
        new MySQLFactory().getConnection().select(this.prioridadesSelecionadas()).subscribe(
          (data : any) => {
              data.forEach((element : any) => {
                prioridade.push({
                id : element.idPrioridade,
                descricaoPrioridade : element.descricaoPrioridade,
              })
              });
              this.sendAnswer(prioridade)
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