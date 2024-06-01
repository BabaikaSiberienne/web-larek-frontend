import { Model } from "./Model";
import { IEvents } from "./base/events"; 
import { IUserDataBuilder, IUserConstructor, IUserData, TMoneyInfo, TDelivery, TContacts } from "../types"; 

export class UserOrderDataBuilder extends Model implements IUserDataBuilder {
    protected userOrder: IUserData;

    constructor(events: IEvents, orderConstructor: IUserConstructor) {
		super(events);
        this.userOrder = new orderConstructor();
	}

    set paymentInfo(info: TMoneyInfo) {
        this.userOrder._totalPrice = info._totalPrice;
        this.userOrder._userItemsList = info._userItemsList
    }

    set deliveryInfo(info: TDelivery) {
        this.userOrder._payment = info._payment;
        this.userOrder._address = info._address 
    }

    set contactsInfo(info: TContacts) {
        this.userOrder._email = info._email;
        this.userOrder._phone_number = info._phone_number;
    }

    get userOrderData() {
        return this.userOrder
    }
}