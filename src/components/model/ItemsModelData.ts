import { IEvents } from "./../base/events";
import { IItems } from "../../types";
import { IItemsModelData } from "../../types";
import { Model } from "./Model";

export class ItemsModelData extends Model implements IItemsModelData  {
    _items: IItems[];

    constructor(events: IEvents) {
        super(events)
        this._items = []
    }

    set items(value: IItems[]) {
        this._items = value
        this.events.emit('products:changed', this._items)
    }

    get items() {
        return this._items
    }

    getItem(id: string) {
        return this._items.find((item) => {
            return (item.id === id)
        })
    }
}
