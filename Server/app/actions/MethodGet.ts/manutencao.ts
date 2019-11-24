import {Get} from '../../decorators';
import {Action} from '../../kernel/action';
import {ActionType} from '../../kernel/route-types';
import {MySQL} from '../../mysql/mysql';
import {MySQLFactory} from '../../mysql/mysql_factory';



export class ManutencaoAction extends Action{

    private manutencaoSelecionados(): string{
        return 'select * from tipoManutencao'
    }

    @Get('/manutencao')
    public manutencao(){
        let manutencao : any = [];
        // let manutencaoSelecionados : string = 'select * from tipoManutencao'
        console.log(this.manutencaoSelecionados());
        new MySQLFactory().getConnection().select(this.manutencaoSelecionados()).subscribe(
          (data : any) => {
              data.forEach((element : any) => {
                manutencao.push({
                id : element.idtipoManutencao,
                tipoManutencao : element.tipoManutencao,
              })
              });
              this.sendAnswer(manutencao)
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


