import {  IUserOrder, TMoney } from "../types";

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
            _payment: this._payment,
            _email: this._email,
            _phone_number: this._phone_number,
            _address: this._address,
            _totalPrice: this._totalPrice,
            _userItemsList: this._userItemsList
        }
    }
}