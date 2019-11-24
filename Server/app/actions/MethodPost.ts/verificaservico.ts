import {Post} from '../../decorators';
import {Action} from '../../kernel/action';
import {ActionType} from '../../kernel/route-types';
import {MySQL} from '../../mysql/mysql';
import {MySQLFactory} from '../../mysql/mysql_factory';
import { KernelUtils } from '../../kernel/kernel-utils';


export class VerificaServicoAction extends Action{
    public nivelAcesso : string = "2" ;
    private sqlVerificaServico() : string {
        return 'select * from usuario where usuario.numeroCracha = \'' + this.req.body.cracha + '\' and usuario.senha = \'' + this.req.body.password + '\' and usuario.nivelAcesso = \'' + this.nivelAcesso + '\' '

    }
    @Post('/verificaservico')
    public verificaservico() {
        let usuarioVerificador : any = [];
        console.log(this.sqlVerificaServico());
        //res.send(sql);
        new MySQLFactory().getConnection().select(this.sqlVerificaServico()).subscribe(
          (data : any) => {
            if (!data.length || data.length != 1){
              this.sendError(new KernelUtils().createErrorApiObject(401,'1001','Conta inválida!'))
              console.log("Deu muito ERRADO!");
              return;
            }
            data.forEach((element : any) => {
              usuarioVerificador.push({
              idUsuario : element.idUsuario,
              numeroCracha : element.numeroCracha,
            })
            });
            this.sendAnswer({usuarioVerificador})
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
