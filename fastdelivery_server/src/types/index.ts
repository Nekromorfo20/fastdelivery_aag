
export interface IUser {
    id : string
    email : string
    password : string
    name : string
}

export type IUserDraf = Omit<IUser, 'id'>;

export interface IClient {
    id : string
    name : string,
    address : string
    contactEmail : string
    contactPhone : string
}

export type IClientDraf = Omit<IClient, 'id'>;

export interface IOrder {
        id: number
        userAssignedId : string
        userAssignedName : string
        clientId : string
        clientName : string
        trackingNumber : string
        status : string
        creationDate : Date
}

export type IOrderDraf = Omit<IOrder, 'id'>;

export interface IMovement {
        id : string
        orderId : number
        currentStatus : string
        lastStatus : string | null
        lat : number
        lng : number
        lastMovementDate : Date
        comments : string | null
}

export type IMovementDraf = Omit<IMovement, 'id'>;