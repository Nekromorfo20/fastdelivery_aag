import { Table, Column, Model, DataType, Default, PrimaryKey, IsEmail, AllowNull, HasMany } from "sequelize-typescript"
import { Order } from "./Orders.model";

@Table({
    tableName: "clients"
})

class Client extends Model {
    @PrimaryKey
    @Default(DataType.UUIDV4)
    @Column(DataType.UUID)
    declare id: string;
    
    @AllowNull(false)
    @Column(DataType.STRING(100))
    declare name: string;
    
    @AllowNull(true)
    @Column(DataType.STRING(100))
    declare address: string;

    @AllowNull(true)
    @IsEmail
    @Column(DataType.STRING(100))
    declare contactEmail: string;

    @AllowNull(true)
    @Column(DataType.STRING(100))
    declare contactPhone: string;

    @HasMany(() => Order)
    declare orders: Order[];
}

export default Client;