import {Post} from '../../decorators';
import {Action} from '../../kernel/action';
import {ActionType}from '../../kernel/route-types';
import {MySQL} from '../../mysql/mysql';
import {MySQLFactory} from '../../mysql/mysql_factory';


export class VerificaAction extends Action {

    private sqlVerificacao() : string {
        return 'select * from usuario where usuario.numeroCracha = \'' + this.req.body.cracha + '\''
    }
    @Post('/verifica')
    public Verifica() {
        //console.log(this.req.body)
        //console.log(this.sqlVerificacao());
        //res.send(sql);
        new MySQLFactory().getConnection().select(this.sqlVerificacao()).subscribe(
            (data : any) => {
                if (data.length > 0){
                console.log(data.length);
                return;
                }
                console.log("Passou daqui!");
                console.log(data.length);
                console.log("Deu muito certo, conta validada!");
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
