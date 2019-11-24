import {Get} from '../../decorators';
import {Action} from '../../kernel/action';
import {ActionType} from '../../kernel/route-types';
import {MySQL} from '../../mysql/mysql';
import {MySQLFactory} from '../../mysql/mysql_factory';



export class SetorAction extends Action {

    private setorSelecionados() : string {
        return 'select * from setor'
    }
    @Get('/setor')
     public Setor(){
        let setor : any = [];
        // let setorSelecionados : string = 'select * from setor'
        console.log(this.setorSelecionados());
        new MySQLFactory().getConnection().select(this.setorSelecionados()).subscribe(
          (data : any) => {
              data.forEach((element : any) => {
                setor.push({
                id : element.idSetor,
                nome : element.nome,
              })
              });
              this.sendAnswer(setor)
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
