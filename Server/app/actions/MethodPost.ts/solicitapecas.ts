import {Post} from '../../decorators';
import {Action} from '../../kernel/action';
import {ActionType} from '../../kernel/route-types';
import {MySQL} from '../../mysql/mysql';
import {MySQLFactory} from '../../mysql/mysql_factory';
import {FormatarData} from '../../formatdatetime/dateformat';
import {FormataTime} from '../../formatdatetime/timeformat';

export class SolicitaPecasAction extends Action{
    private data = new FormatarData().dataAtualFormatada();
    private hora = new FormataTime().horaAtualFormatada();

    private pecaSQL() : string {
        return 'insert into SolicitacaoProduto(hora, data, quantidadeSolicitada, descricaoSolicitacao,Setor_idSetor,Prioridade_idPrioridade,Equipamento_idEquipamento,Usuario_idUsuario) values(\'' + this.hora + '\',\''+this.data+'\',\''+this.req.body.numeroPecas+'\',\''+this.req.body.NomePeca+'\',\''+this.req.body.setor+'\',\''+this.req.body.prioridade+'\',\''+this.req.body.maquinaDestinada+'\',\''+this.req.body.usuario+'\')'
    }

    
    private pecaSQL1() : string {
        return 'insert into SolicitacaoProduto(hora, data, quantidadeSolicitada, descricaoSolicitacao,Setor_idSetor,Prioridade_idPrioridade,Usuario_idUsuario,ordemServico_idOrdemServico) values(\'' +this.hora + '\',\''+this.data+'\',\''+this.req.body.numeroPecas+'\',\''+this.req.body.NomePeca+'\',\''+this.req.body.setor+'\',\''+this.req.body.prioridade+'\',\''+this.req.body.usuario+'\',\''+this.req.body.orderKey+'\')'
    }

    
    private pecaSQL2() : string {
        return 'insert into SolicitacaoProduto(hora, data, quantidadeSolicitada, descricaoSolicitacao,Setor_idSetor,Prioridade_idPrioridade,Equipamento_idEquipamento,Usuario_idUsuario,ordemServico_idOrdemServico) values(\'' + this.hora + '\',\''+this.data+'\',\''+this.req.body.numeroPecas+'\',\''+this.req.body.NomePeca+'\',\''+this.req.body.setor+'\',\''+this.req.body.prioridade+'\',\''+this.req.body.maquinaDestinada+'\',\''+this.req.body.usuario+'\',\''+this.req.body.orderKey+'\')'
    }

    private pecaSQL3() : string {
        return 'insert into SolicitacaoProduto(hora, data, quantidadeSolicitada, descricaoSolicitacao,Setor_idSetor,Prioridade_idPrioridade,Usuario_idUsuario) values(\'' +this.hora + '\',\''+this.data+'\',\''+this.req.body.numeroPecas+'\',\''+this.req.body.NomePeca+'\',\''+this.req.body.setor+'\',\''+this.req.body.prioridade+'\',\''+this.req.body.usuario+'\')'
    }
    @Post('/solicitapecas')
    public SolicitaPecas(){
        let pecaSQL=""
        console.log(this.pecaSQL());
        if ((this.req.body.orderKey === undefined || this.req.body.orderKey === null)  && (this.req.body.maquinaDestinada != undefined && this.req.body.maquinaDestinada != null)){
            pecaSQL=this.pecaSQL();
          }else if((this.req.body.maquinaDestinada === undefined || this.req.body.maquinaDestinada === null) && (this.req.body.orderKey != undefined && this.req.body.orderKey != null)){
            pecaSQL=this.pecaSQL1();
          }else if((this.req.body.maquinaDestinada != undefined && this.req.body.maquinaDestinada != null) && (this.req.body.orderKey != undefined && this.req.body.orderKey != null)){
            pecaSQL=this.pecaSQL2();
          }else if((this.req.body.maquinaDestinada === undefined || this.req.body.maquinaDestinada === null) && (this.req.body.orderKey === undefined ||this.req.body.orderKey === null)){
            pecaSQL=this.pecaSQL3();
          }
        new MySQLFactory().getConnection().insert(pecaSQL).subscribe(
        (data : any) => {
          console.log("aqui r2")
         this.sendAnswer({Sucesso:"Peça solicitada com Sucesso"})
        },
        (error:any) =>{
          console.log("aqui r")
          console.log(error)
        }
        )
        }

    defineVisibility() {
        this.actionEscope = ActionType.atPublic;
    }
}
