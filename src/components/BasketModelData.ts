import { IItem, IBasketModel } from "../types";
import { Model } from "./Model";
import { IEvents } from "./base/events";

export class BasketModelData  extends Model implements IBasketModel {
    protected _buyedItems: IItem[];

    constructor (events: IEvents) {
        super(events)
        this._buyedItems = []
    }

    get buyedItems(): IItem[] {
        return this._buyedItems
    }

    set buyedItems(value: IItem[]) {
        this._buyedItems = value
    }

    checkItem(id: string): boolean {
        return (this._buyedItems.find(item => item.id === id)) ? true : false
    }

    deleteBuyeditems(id: string): void {
        this._buyedItems = this.buyedItems.filter(item => item.id !== id)
        this.events.emit('items:changed', {id})
    }

    getTotalQuantity(): number {
        return this._buyedItems.length
    }

    getTotalPrice(): number {
        return this._buyedItems.reduce((sum, purchase) => {
            return sum + purchase.price
        }, 0)

    }

    getIdList(): string[] {
        return this._buyedItems.map(item => {
            return item.id
        })
    }

    clear(): void {
        this.buyedItems = []
        this.events.emit('purchases:changed', {})
    }

}