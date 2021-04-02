export interface Payment{
    paymentId?:number;
    cardNumber:string;
    firstName:string;
    lastName:string;
    expirationDate:string;
    cVV:string;
}