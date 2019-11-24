import {Post} from '../../decorators';
import {Action} from '../../kernel/action';
import {ActionType} from '../../kernel/route-types';
import {MySQL} from '../../mysql/mysql';
import {MySQLFactory} from '../../mysql/mysql_factory';
import {FormataTime} from '../../formatdatetime/timeformat';


export class VerificaManutencaoAction extends Action {
  private data = new FormataTime().horaAtualFormatada();

    private insertOrdem() : string {                                                                                                                                                                                                                                            
        return 'SET AUTOCOMMIT=0;START TRANSACTION;insert into Verificacao(solucaoRealizada,dataFim, problemaResolvido, responsavel1, responsavel2,ordemServico_idOrdemServico) values(\''+ this.req.body.solucaoRealizada + '\',\'' + this.data+ '\','+this.req.body.problemaResolvido+','+this.req.body.responsavel1+','+this.req.body.responsavel2+','+this.req.body.numeroOrdem+');UPDATE ordemServico SET Status_idStatus = \''+3+'\' WHERE idOrdemServico = \''+this.req.body.numeroOrdem+'\';COMMIT;SET AUTOCOMMIT=1;' 
    }
    @Post('/verificamanutencao')
    public VerificaManutencao() {
    let verificaId : any = [];
    console.log(this.insertOrdem());
    //res.send(sql);
    new MySQLFactory().getConnection().insert(this.insertOrdem()).subscribe(
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