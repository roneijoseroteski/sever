import {Post} from '../../decorators';
import {Action} from '../../kernel/action';
import {ActionType} from '../../kernel/route-types';
import {MySQL} from '../../mysql/mysql';
import {MySQLFactory} from "../../mysql/mysql_factory";
import {VPUtils} from '../../utils/vputils';
import { KernelUtils } from '../../kernel/kernel-utils';


export class LogandoAction extends Action{

    public nivelAcesso : string = "1";
    private sqlLogar() : string {
        return 'select * from usuario where usuario.numeroCracha = \'' + this.req.body.cracha + '\' and usuario.senha = \'' + this.req.body.password + '\' and usuario.nivelAcesso = \'' + this.nivelAcesso + '\'; '


    }
    @Post('/logando')
    public Logando(){
      
      
      let status= true
      console.log(this.sqlLogar());
      let login : any = [];
      let idUsuario: number;
      //res.send(sql);
      new MySQLFactory().getConnection().select(this.sqlLogar()).subscribe(
        (data : any) => {
          if (!data.length || data.length != 1){
            this.sendError(new KernelUtils().createErrorApiObject(401, '1001', 'Conta inválida!'));
            console.log("Deu muito ERRADO!");
            return;
          }
          data.forEach((element : any) => {
          login.push({
            idUsuario: element.idUsuario,
            token: new VPUtils().generateGUID().toUpperCase(),
            userName: this.req.body.userName
          })
          idUsuario = element.idUsuario
          console.log("-------------")
          console.log(element.idUsuario)
          console.log("-------------")
          console.log("-------------")
          });
          this.sendAnswer({
            idUsuario,
            token: new VPUtils().generateGUID().toUpperCase(),
            userName: this.req.body.userName
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
