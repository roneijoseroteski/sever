import {Post} from '../../decorators';
import {Action} from '../../kernel/action';
import {ActionType} from '../../kernel/route-types';
import {MySQL} from '../../mysql/mysql';
import {MySQLFactory} from '../../mysql/mysql_factory';


export  class LancamentosAction extends Action{

    private insertLancamentos(): string {
        return 'insert into Apontamento(descricaoOperacao,data,tempo,Usuario_idUsuario,ordemServico_idOrdemServico) values(\'' + this.req.body.descricao + '\',\'' + this.req.body.dataApontamento + '\',\'' +this.req.body.tempoDedicado +'\',\'' + this.req.body.usuario +'\',\'' + this.req.body.orderKey +'\')'
    }
    @Post('/lancamentos')
    public Lancamentos() {
        console.log(this.insertLancamentos());
        //res.send(sql);
        new MySQLFactory().getConnection().select(this.insertLancamentos()).subscribe(
          (data : any) => {
            this.sendAnswer({
              sucesso: "Sucesso ao Apontamentos ordem!"
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
