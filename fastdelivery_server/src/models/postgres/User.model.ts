import { 
    Table,
    Column,
    Model,
    DataType,
    Default,
    PrimaryKey,
    Unique,
    IsEmail,
    AllowNull,
    HasMany
} from "sequelize-typescript";
import { Order } from "./Orders.model";

@Table({
    tableName: "users"
})

class User extends Model {
    @PrimaryKey
    @Default(DataType.UUIDV4)
    @Column(DataType.UUID)
    declare id: string;
    
    @AllowNull(false)
    @Column(DataType.STRING(100))
    declare name: string;
 
    @AllowNull(false)
    @Unique
    @IsEmail
    @Column(DataType.STRING(100))
    declare email: string;

    @AllowNull(false)
    @Column(DataType.STRING(100))
    declare password: string;

    @HasMany(() => Order)
    declare orders: Order[];
}

export default User;