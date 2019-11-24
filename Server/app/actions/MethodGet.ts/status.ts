import {Get} from '../../decorators';
import {Action} from '../../kernel/action';
import {ActionType} from '../../kernel/route-types';
import {MySQL} from '../../mysql/mysql';
import {MySQLFactory} from '../../mysql/mysql_factory';

export class StatusAction extends Action {

    private statusSelecionados() : string {
        return 'select * from Status'

    }
    @Get('/status')
    public status() {
        let status : any = [];
        // let statusSelecionados : string = 'select * from Status'
        console.log(this.statusSelecionados());
        new MySQLFactory().getConnection().select(this.statusSelecionados()).subscribe(
          (data : any) => {
              data.forEach((element : any) => {
                status.push({
                id : element.idStatus,
                tipoStatus : element.tipoStatus,
              })
              });
              this.sendAnswer(status)
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