import { Column, Model, Table, DataType, BeforeCreate } from "sequelize-typescript";
import bcrypt from 'bcrypt'
@Table({ tableName: 'usuarios' })
class Usuario extends Model {
  
  
  @Column({ type: DataType.STRING(50), primaryKey:true, field: 'email', allowNull:false, validate: {isEmail:true} })
  declare email: string;


  @Column({ type: DataType.STRING(60), field: 'password', allowNull:false })
  declare password: string;

  @BeforeCreate
  static async hashPassword(usuario:Usuario){
    usuario.password = await bcrypt.hash(usuario.password, 10)
  }
}

export default Usuario;