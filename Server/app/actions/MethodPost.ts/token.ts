import {Post} from '../../decorators';
import {Action} from '../../kernel/action';
import {ActionType} from '../../kernel/route-types';
import {MySQL} from '../../mysql/mysql';
import {MySQLFactory} from '../../mysql/mysql_factory';

export class TokenAction extends Action{

    private sqlToken() : string {
        let status= true
        return 'insert into Token(Token, Status, Usuario_idUsuario) values(\'' + this.req.body.token + '\',' + status + '\,\''+this.req.body.idUsuario+'\')'

    }
    @Post('/token')
    public Token() {
        
        let dadosToken : any = [];
        console.log(this.sqlToken());
        //res.send(sql);
        new MySQLFactory().getConnection().select(this.sqlToken()).subscribe(
          (data : any) => {
              this.sendAnswer({
                 idUsuario: this.req.body.idUsuario,
                 token: this.req.body.token,
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
