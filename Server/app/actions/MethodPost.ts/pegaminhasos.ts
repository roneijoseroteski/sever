import {Post} from '../../decorators';
import {Action} from '../../kernel/action';
import {ActionType} from '../../kernel/route-types';
import {MySQL} from '../../mysql/mysql';
import {MySQLFactory} from '../../mysql/mysql_factory';

export class PegaMinhasOsAction extends Action{
  private pegaOS():string{
    console.log('entrou')
      return 'select ordemServico.idOrdemServico,ordemServico.resumo,DATE_FORMAT(ordemServico.inicioPlanejado, "%d/%m/%Y") AS inicioPlanejado,DATE_FORMAT(ordemServico.fimPlanejado, "%d/%m/%Y") AS fimPlanejado , ordemServico.Status_idStatus, status.tipoStatus,status.idStatus  from ordemServico inner join status  on ordemServico.Status_idStatus = Status.idStatus inner join ordemservico_has_usuario on ordemServico_idOrdemServico =ordemservico.idOrdemServico  where Status_idStatus = idStatus  and Usuario_idUsuario =\'' + this.req.body.idUsuario +'\''
      //  'select ordemServico.idOrdemServico,ordemServico.resumo,DATE_FORMAT(ordemServico.inicioPlanejado, "%d/%m/%Y") AS inicioPlanejado,DATE_FORMAT(ordemServico.fimPlanejado, "%d/%m/%Y") AS fimPlanejado , ordemServico.Status_idStatus, status.tipoStatus,status.idStatus  from ordemServico, status where Status_idStatus = idStatus  and Usuario_idUsuario =\'' + this.req.body.idUsuario +'\''
      // select ordemServico.idOrdemServico,ordemServico.resumo,DATE_FORMAT(ordemServico.inicioPlanejado, "%d/%m/%Y") AS inicioPlanejado,DATE_FORMAT(ordemServico.fimPlanejado, "%d/%m/%Y") AS fimPlanejado , ordemServico.Status_idStatus, status.tipoStatus,status.idStatus from ordemServico, status where Usuario_idUsuario =1 and Status_idStatus=idStatus
      
    }
  @Post('/pegaminhasos')
  public Pegaminhasos(){
      console.log('entrou 5')
      let listaOS : any = []
      new MySQLFactory().getConnection().select(this.pegaOS()).subscribe(
        (data : any) => {
          console.log('entrou 1');
          data.forEach((element: any) => {
            console.log('mamis');
            listaOS.push(
              {
                idOrdemServico:element.idOrdemServico,
                resumo:element.resumo,
                inicioPlanejado:element.inicioPlanejado,
                fimPlanejado:element.fimPlanejado,
                Status_idStatus:element.Status_idStatus,
                tipoStatus:element.tipoStatus
              }
            )
          
          });
          console.log(listaOS);
          this.sendAnswer(listaOS)
        },
        (error:any) =>{
          this.sendAnswer(error)
        }
      )

  }
    defineVisibility() {
        this.actionEscope = ActionType.atPublic;
    }
}
