import {Post} from '../../decorators';
import {Action} from '../../kernel/action';
import {ActionType} from '../../kernel/route-types';
import {MySQL} from '../../mysql/mysql';
import {MySQLFactory} from '../../mysql/mysql_factory';
import { KernelUtils } from '../../kernel/kernel-utils';


export class AutenticacaoAction extends Action {
    public nivelAcesso :string = "1"
    private sql():string{
        return 'select * from Token where Token.Token = \'' + this.req.body.token + '\' and Token.Usuario_idUsuario = \'' + this.req.body.id + '\'; '
    }

    @Post('/autenticacao')
    public autenticacao(){
        
        // let sql = 'select * from Token where Token.Token = \'' + req.body.token + '\' and Token.Usuario_idUsuario = \'' + req.body.id + '\'; '
        let status= true
        console.log(this.sql());
        let login : any = [];
        let idUsuario: number;
        //res.send(sql);
        new MySQLFactory().getConnection().select(this.sql()).subscribe(
          (data : any) => {
            if (!data.length || data.length != 1){
              this.sendError(new KernelUtils().createErrorApiObject(401,'1001','Conta inválida!'))
              console.log("Deu muito ERRADO!");
              return;
            }
            this.sendAnswer({
              id: this.req.body.id
            })
            console.log("Deu MUITO Certo!!!")
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
