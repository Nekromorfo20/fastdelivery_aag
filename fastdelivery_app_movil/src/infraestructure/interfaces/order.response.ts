export interface OrderResponse {
    data: Datum[];
}

export interface Datum {
    id:             number;
    trackingNumber: string;
    status:         string;
}
