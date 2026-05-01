import mongoose, { Schema, Document } from "mongoose";
import { orderStatus, OrderStatus } from "../../utils/constants"

interface IMovement extends Document {
    orderId : number
    currentStatus : OrderStatus
    lastStatus : OrderStatus | null
    lat : number
    lng: number
    lastMovementDate : Date
    comments : string
}

export const MovementSchema : Schema = new Schema({
    orderId: {
        type: Number,
        required: true
    },
    currentStatus: {
        type: String,
        enum: Object.values(orderStatus),
        default: orderStatus.PENDING
    },
    lastStatus: {
        type: String,
        enum: Object.values(orderStatus),
        required: false
    },
    lat: {
        type: Number,
        required: true
    },
    lng: {
        type: Number,
        required: true
    },
    lastMovementDate: {
        type: Date,
        required: true
    },
    comments: {
        type: String,
        trim: true,
        required: false
    }
}, { timestamps: true })

const Movement = mongoose.model<IMovement>('Movements', MovementSchema);

export default Movement;