import { IEvents } from "./../base/events";
import { IItem } from "../../types";
import { IItemsModelData } from "../../types";
import { Model } from "./Model";

export class ItemsModelData extends Model implements IItemsModelData  {
    _items: IItem[];
    protected events: IEvents;

    constructor(events: IEvents) {
        super(events)
        this.events = events
    }

    set items(value: IItem[]) {
        this._items = value
    }

    get items() {
        return this._items
    }

    getItem(id: string): IItem {
        return this._items.find(item => item._id === id)
    }
}
