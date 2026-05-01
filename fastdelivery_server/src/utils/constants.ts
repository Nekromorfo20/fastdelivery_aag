
export const orderStatus = {
    PENDING: 'pending',
    ON_THE_WAY: 'onTheWay',
    RECEIVED: "received",
    CANCELED: "canceled"
} as const;

export type OrderStatus = typeof orderStatus[keyof typeof orderStatus];

