import { Post } from '../../decorators';
import { Action } from '../../kernel/action';
import { ActionType } from '../../kernel/route-types';
import { MySQL } from '../../mysql/mysql';
import { MySQLFactory } from '../../mysql/mysql_factory';
import { KernelUtils } from '../../kernel/kernel-utils';


export class EpiCompletoAction extends Action{

    private sqljustificada():string{
        // idUsuario: idUsuario,
        // idOrdemServico: idOrdemServico,
        // fk_Status: fk_Status,
        // listaepi: listaepi,
        // justificativa: justificativa

        //tenpleta string
    //    return `set ${this.req.body.idOrdemServico} asaisiajs ${this.req.body.idOrdemServico} aushaus 
    //     aasas ${asasa}
    //     asas
    //    `
        return 'SET AUTOCOMMIT=0;START TRANSACTION;INSERT INTO apontamento_epi (fkOrdemServico,fkUsuario,data,hora,justificativa)  values(\''+this.req.body.idOrdemServico+'\',\''+this.req.body.idUsuario+'\',06/03/2019, 21:35 ,\''+this.req.body.justificativa+'\'); SELECT LAST_INSERT_ID;'
        // return 'update ordemServico_has_Epi set checked=\''+this.req.body.checked +'\', justificativa=\''+this.req.body.justificativa+'\' where ordemServico_idOrdemServico=\''+this.req.body.idOrdemServico+'\' and Epi_idEpi=\''+this.req.body.idEpi+'\''
    }
    private sqlepi(epi:any,idpai:any):string{
        return 'insert into Registro_de_epi(fkapontamento_epi,fkEpi,checked) from (idpai,epi.idEpi,epi.checked)'
        // return 'update ordemServico_has_Epi set checked=\''+this.req.body.checked +'\' where ordemServico_idOrdemServico=\''+this.req.body.idOrdemServico+'\' and Epi_idEpi=\''+this.req.body.idEpi+'\''
    }
    private sqlStatus():string{
        return 'update ordemServico set Status_idStatus =\'' + this.req.body.fk_Status + '\'where ordemServico_has_Usuario.ordemServico_idOrdemServico =\'' + this.req.body.idOrdemServico + '\''
    }
    // 'update ordemServico set Status_idStatus =\'' + this.req.body.fk_Status + '\'where ordemServico.Usuario_idUsuario = \'' + this.req.body.idUsuario + '\' and ordemServico.idOrdemServico =\'' + this.req.body.idOrdemServico + '\''

    @Post('/epicompleto')
    public async EpicomJustificativa(){
           let listaepi= [];
           listaepi = this.req.body.epis;
           console.log('entrou 🎉');
            try{
                await new MySQLFactory().getConnection().insert(this.sqlStatus()).toPromise();
                // const teste = new MySQLFactory()
                // teste.
                // connection.query('startTransaction' => {
                //     if (err) throw err
                // })

               let idpai = await new MySQLFactory().getConnection().insert(this.sqljustificada()).toPromise();
                // this.RegistaEpi(listaepi);
    
                listaepi.forEach(async (element :any) =>{
                    await new MySQLFactory().getConnection().insert(this.sqlepi(element,idpai)).toPromise();
                })
                this.sendAnswer({status:'Registrado com sucesso'})
            }catch(e){
                console.log(e);
                // rollback
                // rollback();
                this.sendAnswer(e)
            }



    }
    defineVisibility() {
        this.actionEscope = ActionType.atPublic;
      }
    // public  RegistaEpi(listaepi:any){
       
    //     async () => listaepi.forEach((element :any) => {
                
    //         await new MySQLFactory().getConnection().insert().toPromise();
    //     })
    
    //      }
    //     }
}