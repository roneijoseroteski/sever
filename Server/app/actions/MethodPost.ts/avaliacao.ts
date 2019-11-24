import {Post} from '../../decorators';
import {Action} from '../../kernel/action';
import {ActionType} from '../../kernel/route-types';
import {MySQL} from '../../mysql/mysql';
import {MySQLFactory} from '../../mysql/mysql_factory';

export class AvaliacaoAction extends Action{
    private insertAvaliacao():string{
        return 'SET AUTOCOMMIT=0;START TRANSACTION; insert into Avaliacao(observacaoServico,avaliacao,ordemServico_idOrdemServico) values(\'' + this.req.body.textoAvaliar1 + '\',\'' + this.req.body.valorAvaliado1 +'\',\''+ this.req.body.numeroOrdem +'\'); insert into Avaliacao(observacaoServico,avaliacao,ordemServico_idOrdemServico) values(\'' + this.req.body.textoAvaliar2 + '\',\'' + this.req.body.valorAvaliado2 +'\',\''+ this.req.body.numeroOrdem +'\');COMMIT;SET AUTOCOMMIT=1;'
    }
    @Post('/avaliacao')
    public Avaliacao(){
        new MySQLFactory().getConnection().insert(this.insertAvaliacao()).subscribe(
            (data : any) => {
              console.log(data)
              this.sendAnswer({
                sucesso: "Sucesso ao realizar a Avaliação!"
             })
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

