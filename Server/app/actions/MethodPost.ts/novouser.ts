import {Post} from '../../decorators';
import {Action} from '../../kernel/action';
import {ActionType} from '../../kernel/route-types';
import {MySQL} from '../../mysql/mysql';
import {MySQLFactory} from '../../mysql/mysql_factory';


export class NovoUserAction extends Action {
  public nivelAcesso : string = "1";
    private insertUsuario(): string {
        return 'insert into usuario(userName,senha,numeroCracha,email,nome,nivelAcesso) values(\'' + this.req.body.userName + '\',\'' + this.req.body.password + '\',\''+this.req.body.cracha+'\',\''+this.req.body.email+'\',\''+this.req.body.nome+'\',\''+ this.nivelAcesso +'\')'


    }
    @Post('/novo')
    public Novo() {
      console.log(this.insertUsuario());
      //res.send(sql);
      new MySQLFactory().getConnection().select(this.insertUsuario()).subscribe(
        (data : any) => {
          this.sendAnswer({
            userName: this.req.body.userName
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