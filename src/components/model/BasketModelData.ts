import { IItems, IBasketModel } from "../../types";
import { Model } from "././Model";
import { IEvents } from "./../base/events";

export class BasketModelData  extends Model implements IBasketModel {
    protected _buyedItems: IItems[];

    constructor (events: IEvents) {
        super(events)
        this._buyedItems = []
    }

    get buyedItems(): IItems[] {
        return this._buyedItems
    }

    addBuyedItems(value: IItems) {
        if(!this._buyedItems.find(buyedItem => {buyedItem.id === value.id})) {
            this._buyedItems.push(value);
            this.events.emit('purchases:changed', {id: value.id })
        }
    }

    checkItem(id: string): boolean {
        return (this._buyedItems.find(item => item.id === id)) ? true : false
    }

    deleteBuyedItems(id: string): void {
        this._buyedItems = this.buyedItems.filter(item => item.id !== id)
        this.events.emit('items:changed', {id})
    }

    getTotalQuantity(): number {
        return this._buyedItems.length
    }

    getTotalPrice(): number {
        return this._buyedItems.reduce((sum, item) => {
            return sum + item.price
        }, 0)

    }

    getIdList(): string[] {
        return this._buyedItems.map(item => {
            return item.id
        })
    }

    clear(): void {
        this._buyedItems = []
        this.events.emit('purchases:changed', {})
    }

}