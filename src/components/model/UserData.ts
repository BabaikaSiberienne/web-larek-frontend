import {  IUserOrder, TMoney } from "../../types"

export class UserData implements IUserOrder {
    _payment: TMoney;
    _email: string;
    _phone_number: string;
    _address: string;
    _totalPrice: number;
    _userItemsList: string[];

    constructor() {
    
    }
    
    set payment(value: TMoney) {
        this._payment = value
    }
    
    set email(value: string) {
        this._email = value
    }
    
    set phone(value: string) {
        this._phone_number = value
    }
    
    set address(value: string) {
        this._address = value
    }
    
    set total(value: number) {
        this._totalPrice = value
    }
    
    set items(value: string[]) {
        this._userItemsList = value
    }
    
    get userOrder() {
        return {
            payment: this._payment,
            email: this._email,
            phone: this._phone_number,
            address: this._address,
            total: this._totalPrice,
            items: this._userItemsList
        }
    }
}