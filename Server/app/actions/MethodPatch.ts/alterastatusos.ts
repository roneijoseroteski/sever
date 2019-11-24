import { Patch } from '../../decorators';
import { Action } from '../../kernel/action';
import { ActionType } from '../../kernel/route-types';
import { MySQL } from '../../mysql/mysql';
import { MySQLFactory } from '../../mysql/mysql_factory';

export class alteraStatusOsAction extends Action {
  private updateStatus(): string {
    return 'update ordemServico set Status_idStatus =\'' + this.req.body.fk_Status + '\'where ordemServico.Usuario_idUsuario = \'' + this.req.body.idUsuario + '\' and ordemServico.idOrdemServico =\'' + this.req.body.idOrdemServico + '\''
  }


  @Patch('/alterastatusos')
  public Alterastatusos() {
    console.log("entra os")
    new MySQLFactory().getConnection().insert(this.updateStatus()).subscribe(
      (data: any) => {
        console.log("entrou ro");
        this.sendAnswer({ sucesso: "alteração feita com exito" })
        return;
      },
      (error: any) => {
        this.sendAnswer(error);
      }
    )
  }
  defineVisibility() {
    this.actionEscope = ActionType.atPublic;
  }
}
