import {Post} from '../../decorators';
import {Action} from '../../kernel/action';
import {ActionType} from '../../kernel/route-types';
import {MySQL} from '../../mysql/mysql';
import {MySQLFactory} from '../../mysql/mysql_factory';


export class RegistroOperacoesAction extends Action{
    private registooperacoesSQL():string{
        return 'insert into dadosoperacoes(operacao,descricao,status,tempoPlanejado,execucao) values(\'' + this.req.body.operacao + '\',\'' + this.req.body.descricao+ '\',\''+this.req.body.statusOrdemSelecionada+'\',\''+this.req.body.tempoplanejado+'\',\''+this.req.body.execucao+'\')'
    }

    @Post('/registrooperacoes')
    public Registrooperacoes(){
        console.log(this.registooperacoesSQL());
        new MySQLFactory().getConnection().insert(this.registooperacoesSQL()).subscribe(
          (data : any) =>{
            this.sendAnswer({Sucesso:"operaçoes registradas com sucesso"})
          },
          (error: any) =>{
            console.log(error)
            this.sendAnswer(error)
          }
        )
    }
    defineVisibility() {
        this.actionEscope = ActionType.atPublic;
    }
}

