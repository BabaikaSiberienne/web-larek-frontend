import { Model } from "./Model";
import { IEvents } from "./../base/events";
import { IUserDataBuilder, IUserConstructor, IUserOrder, TMoneyInfo, TDelivery, TContacts } from "../../types"; 

export class UserOrderDataBuilder extends Model implements IUserDataBuilder {
    protected userOrder: IUserOrder;

    constructor(events: IEvents, orderConstructor: IUserConstructor) {
		super(events);
        this.userOrder = new orderConstructor();
	}

    set paymentInfo(info: TMoneyInfo) {
        this.userOrder.total = info.total;
        this.userOrder.items = info.items
    }

    set deliveryInfo(info: TDelivery) {
        this.userOrder.payment = info.payment;
        this.userOrder.address = info.address 
    }

    set contactsInfo(info: TContacts) {
        this.userOrder.email = info.email;
        this.userOrder.phone = info.phone;
    }

    getUserOrderData() {
        return this.userOrder
    }
}