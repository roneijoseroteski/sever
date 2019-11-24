import { Post } from '../../decorators';
import { Action } from '../../kernel/action';
import { ActionType } from '../../kernel/route-types';
import { MySQL } from '../../mysql/mysql';
import { MySQLFactory } from '../../mysql/mysql_factory';
import { KernelUtils } from '../../kernel/kernel-utils';



export class EpiAction extends Action {

    

    private SQLEpi(): string {
        // console.log("pinto");
        
        return 'select Epi.idEpi,Epi.descricaoEpi,Epi.icon,ordemServico_has_Epi.checked from ordemServico_has_Epi inner join Epi on Epi_idEpi = Epi.idEpi where ordemServico_idOrdemServico =\''+this.req.body.idOrdemServico+'\''
        
    }


    @Post('/epi')
    public PegaEpi() {
        let listaEPI: any = [];
       console.log('chegou aqui 1234');
    //    console.log(this.req.body.idOrdemServico);
    //    console.log(this.SQLEpi());
       
    
        new MySQLFactory().getConnection().select(this.SQLEpi()).subscribe(
            
            (data: any) => {
                console.log("entro prof");
                // console.log(data);
               
                data.forEach((element: any) => {
                    // console.log(element);
                    listaEPI.push(
                        {
                            idEpi: element.idEpi,
                            descricaoEpi: element.descricaoEpi,
                            icon: element.icon,
                            checked:element.checked
                            

                        }
                    )

                });
                // console.log(listaEPI);
                this.sendAnswer(listaEPI)
            },(error:any) =>{
                console.log("aaaaaaaaaaaaaaaaaaaaaaaaaaaaa");
                this.sendAnswer(error)

              }
        )

    }
    defineVisibility() {
        this.actionEscope = ActionType.atPublic;
      }
}