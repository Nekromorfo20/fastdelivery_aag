import { Table, Column, Model, DataType, PrimaryKey, IsEmail, AllowNull, AutoIncrement, ForeignKey, BelongsTo } from "sequelize-typescript"
import User from "./User.model";
import Client from "./Clients.model";
import { orderStatus, OrderStatus } from "../../utils/constants"

@Table({
    tableName: "orders"
})

export class Order extends Model {
    @PrimaryKey
    @AutoIncrement
    @Column(DataType.INTEGER)
    declare id: number;
    
    @ForeignKey(() => User)
    @Column(DataType.UUID)
    declare userAssignedId: string;

    @ForeignKey(() => Client)
    @Column(DataType.UUID)
    declare clientId: string;
    
    @AllowNull(false)
    @Column(DataType.STRING(100))
    declare trackingNumber: string;

    @AllowNull(false)
    @Column({
        type: DataType.ENUM(...Object.values(orderStatus)),
        allowNull: false,
        defaultValue: orderStatus.PENDING
    })
    declare status: OrderStatus;

    @AllowNull(false)
    @Column(DataType.STRING(100))
    declare receiverName: string;

    @AllowNull(false)
    @Column(DataType.STRING(100))
    declare receiverAddress: string;

    @AllowNull(true)
    @Column(DataType.STRING(100))
    declare receiverPhone: string;

    @AllowNull(true)
    @IsEmail
    @Column(DataType.STRING(100))
    declare receiverEmail: string;

    @BelongsTo(() => User)
    declare user: User;

    @BelongsTo(() => Client)
    declare client: Client;
}

export default Order;