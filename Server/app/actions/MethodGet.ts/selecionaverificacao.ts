import {Get} from '../../decorators';
import {Action} from '../../kernel/action';
import {ActionType} from '../../kernel/route-types';
import {MySQL} from '../../mysql/mysql';
import {MySQLFactory} from '../../mysql/mysql_factory';


export class SelecionaVerificacaoAction extends Action{
    private selecionaOrdem():string{
        return 'select * from Verificacao where idVerificacao = LAST_INSERT_ID();'
    }
    @Get('/selecionaverificacao')
    public SelecionaVerificacao(){
        let verificaId : any = [];
        // let selecionaOrdem = 'select * from Verificacao where idVerificacao = LAST_INSERT_ID();' 
        console.log(this.selecionaOrdem());
        //res.send(sql);
        new MySQLFactory().getConnection().insert(this.selecionaOrdem()).subscribe(
          (data : any) => {
            console.log(data)
            data.forEach((element : any) => {
              verificaId.push({
                idVerificacao : element.idVerificacao
            })
            });
            console.log(verificaId)
            this.sendAnswer({verificaId})
          },
          (error : any) => {
              console.log(error)
          }
        );

    }
    defineVisibility() {
        this.actionEscope = ActionType.atPublic;
    }

}
