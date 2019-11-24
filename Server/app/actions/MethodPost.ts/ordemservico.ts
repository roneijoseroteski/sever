import { MySQL } from '../../mysql/mysql';
import {Post} from '../../decorators';
import {Action} from '../../kernel/action';
import {ActionType} from '../../kernel/route-types';
import {MySQLFactory} from '../../mysql/mysql_factory';


export class OrdemServicoAction extends Action {

    private ordemServico() : string {
        return 'select ordemServico.idOrdemServico,ordemServico.resumo,DATE_FORMAT(ordemServico.inicioPlanejado, "%d/%m/%Y") AS inicioPlanejado,DATE_FORMAT(ordemServico.fimPlanejado, "%d/%m/%Y") AS fimPlanejado,Status.tipoStatus from ordemServico LEFT JOIN Status ON ordemServico.Status_idStatus = Status.idStatus where ordemServico.Status_idStatus =\''+this.req.body.statusOrdemSelecionada+'\' or ordemServico.Prioridade_idPrioridade = \''+this.req.body.prioridadeSelecionada+'\''
    }
    private ordemServico1() : string {
        return 'select ordemServico.idOrdemServico,ordemServico.resumo,DATE_FORMAT(ordemServico.inicioPlanejado, "%d/%m/%Y") AS inicioPlanejado,DATE_FORMAT(ordemServico.fimPlanejado, "%d/%m/%Y") AS fimPlanejado,Status.tipoStatus from ordemServico INNER JOIN Status ON ordemServico.Status_idStatus = Status.idStatus where ordemServico.Status_idStatus =\''+this.req.body.statusOrdemSelecionada+'\'' 
    }
    private ordemServico2() : string {
        return 'select ordemServico.idOrdemServico,ordemServico.resumo,DATE_FORMAT(ordemServico.inicioPlanejado, "%d/%m/%Y") AS inicioPlanejado,DATE_FORMAT(ordemServico.fimPlanejado, "%d/%m/%Y") AS fimPlanejado,Status.tipoStatus from ordemServico INNER JOIN Status ON ordemServico.Status_idStatus = Status.idStatus where ordemServico.Prioridade_idPrioridade =\''+this.req.body.prioridadeSelecionada+'\'' 
    }


    @Post('/ordemservico')
    public OrdemServico() {
      let ordem : any = [];
      let ordemServico: string;
      ordemServico = ""
      if(this.req.body.statusOrdemSelecionada != null && this.req.body.statusOrdemSelecionada != undefined && this.req.body.prioridadeSelecionada != null && this.req.body.prioridadeSelecionada != undefined){
        ordemServico = this.ordemServico()
      }else if(this.req.body.statusOrdemSelecionada != null && this.req.body.statusOrdemSelecionada != undefined && (this.req.body.prioridadeSelecionada == null || this.req.body.prioridadeSelecionada == undefined)){
        ordemServico =  this.ordemServico1()
      }else if(this.req.body.prioridadeSelecionada != null && this.req.body.prioridadeSelecionada != undefined && (this.req.body.statusOrdemSelecionada == null || this.req.body.statusOrdemSelecionada == undefined)){ 
        ordemServico =  this.ordemServico2()
      }
        console.log(ordemServico);
        new MySQLFactory().getConnection().select(ordemServico).subscribe(
          (data : any) => {
              data.forEach((element : any) => {
                ordem.push({
                  idOrdemServico: element.idOrdemServico,
                  resumo : element.resumo,
                  inicioPlanejado : element.inicioPlanejado,
                  fimPlanejado : element.fimPlanejado,
                  tipoStatus : element.tipoStatus,
              })
              });
              console.log(ordem)
              this.sendAnswer(ordem)
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