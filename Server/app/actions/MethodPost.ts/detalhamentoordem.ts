import {Post} from '../../decorators';
import {Action} from '../../kernel/action';
import {ActionType} from '../../kernel/route-types';
import {MySQL} from '../../mysql/mysql';
import {MySQLFactory} from '../../mysql/mysql_factory';


export class DetalhamentoOrdemAction extends Action{
    private ordemServico() :string {
        return 'select ordemServico.Usuario_idUsuario,ordemServico.resumo,ordemServico.descricao,tipoManutencao.tipoManutencao,ordemServico.requerParada,DATE_FORMAT(ordemServico.inicioPlanejado, "%d/%m/%Y") AS inicioPlanejado,DATE_FORMAT(ordemServico.fimPlanejado, "%d/%m/%Y") AS fimPlanejado,Equipamento.numeroPatrimonio,Setor.nome,Status.tipoStatus from ordemServico INNER JOIN tipoManutencao ON ordemServico.tipoManutencao_idtipoManutencao = tipoManutencao.idtipoManutencao  INNER JOIN Status ON ordemServico.Status_idStatus = Status.idStatus INNER JOIN Setor ON ordemServico.Setor_idSetor = Setor.idSetor LEFT JOIN Equipamento ON ordemServico.Equipamento_idEquipamento = Equipamento.idEquipamento  where ordemServico.idOrdemServico =\''+this.req.body.id+'\'' 
    }

    @Post('/detalhamentoordem')
    public detalhamentoOrdem(){
        let ordem : any = [];
        // let ordemServico: string;
        // ordemServico = 'select ordemServico.resumo,ordemServico.descricao,ordemServico.tipoManutencao,ordemServico.requerParada,ordemServico.inicioPlanejado,ordemServico.fimPlanejado,Equipamento.numeroPatrimonio,Setor.nome,Status.tipoStatus from ordemServico INNER JOIN Status ON ordemServico.Status_idStatus = Status.idStatus INNER JOIN Setor ON ordemServico.Setor_idSetor = Setor.idSetor LEFT JOIN Equipamento ON ordemServico.Equipamento_idEquipamento = Equipamento.idEquipamento  where ordemServico.idOrdemServico =\''+req.body.id+'\'' 
       console.log('entrou em detalhe ordem serviço')
        console.log(this.ordemServico());
          new MySQLFactory().getConnection().select(this.ordemServico()).subscribe(
            (data : any) => {
                data.forEach((element : any) => {
                  ordem.push({
                    resumo : element.resumo,
                    descricao: element.descricao,
                    numeroPatrimonio: element.numeroPatrimonio,
                    requerParada: element.requerParada,
                    tipoManutencao: element.tipoManutencao,
                    nome: element.nome,
                    inicioPlanejado : element.inicioPlanejado,
                    fimPlanejado : element.fimPlanejado,
                    tipoStatus : element.tipoStatus,
                })
                });
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