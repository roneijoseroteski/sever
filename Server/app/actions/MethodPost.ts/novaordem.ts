import {Post} from '../../decorators';
import {Action} from '../../kernel/action';
import {ActionType} from '../../kernel/route-types';
import {MySQL} from '../../mysql/mysql';
import {MySQLFactory} from '../../mysql/mysql_factory';


export class NovaOrdemAction extends Action{

    private insertOrdem() : string {
        return 'insert into ordemServico(resumo,descricao, tipoManutencao_idtipoManutencao, inicioPlanejado, fimPlanejado, Prioridade_idPrioridade,Status_idStatus,requerParada,Setor_idSetor, Usuario_idUsuario) values(\'' +this.req.body.resumo + '\',\'' +this.req.body.descricao + '\',\''+this.req.body.tipoManutencao+'\',\''+this.req.body.inicioPlanejado+'\',\''+this.req.body.fimPlanejado+'\',\''+this.req.body.prioridade+'\',\''+this.req.body.statusChamado+'\',\''+this.req.body.requerParada+'\',\''+this.req.body.Setor_idSetor+'\',\''+this.req.body.Usuario_idUsuario+'\')'
    }
    @Post('/novaordem')
    public NovaOrdem() {
        console.log(this.insertOrdem());
        //res.send(sql);
        new MySQLFactory().getConnection().select(this.insertOrdem()).subscribe(
          (data : any) => {
            this.sendAnswer({
              sucesso: "Sucesso ao cadastrar ordem!"
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
