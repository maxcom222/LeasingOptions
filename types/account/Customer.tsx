import { Manager } from "./Manager";

export type Customer = {
    ownerId: string,
    accountNumber: string,
    firstName: string,
    email: string, 
    accountId: string,
    manager: Manager
}