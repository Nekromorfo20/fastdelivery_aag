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
    @AllowNull(false)
    @Column(DataType.UUID)
    declare userAsignedId: string;

    @ForeignKey(() => Client)
    @AllowNull(false)
    @Column(DataType.UUID)
    declare clienId: string;
    
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

    @BelongsTo(() => Client)
    client: Client;

    @BelongsTo(() => User)
    user!: User;
}

export default Order;