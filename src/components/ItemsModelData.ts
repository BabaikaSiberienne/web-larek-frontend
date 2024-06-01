import { IEvents } from "./base/events";
import { IItem } from "../types";
import { IItemsModelData } from "../types";
import { Model } from "./Model";

export class ItemsModelData extends Model implements IItemsModelData  {
    _products: IItem[];
    protected events: IEvents;

    constructor(events: IEvents) {
        super(events)
        this.events = events
    }

    set products(value: IItem[]) {
        this._products = value
    }

    get products() {
        return this._products
    }

    getProduct(id: string): IItem {
        return this._products.find(product => product.id === id)
    }
}
