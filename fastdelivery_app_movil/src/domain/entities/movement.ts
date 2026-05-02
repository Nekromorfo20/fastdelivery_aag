
export interface Movement {
    id : number
    currentStatus : string
    lastStatus? : string | null
    lat : number
    lng : number
    lastMovementDate : Date
    comments? : string | null
}