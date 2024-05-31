import { IEvents } from "../components/base/events";

export interface IItem {
    id: string,
    description: string,
    image: string,
    title : string,
    category: string,
    price: number
}

class ProductsData {
    protected _products: IItem[];
    protected events: IEvents;

    constructor(events: IEvents) {
        this.events = events
    }

    set products(value: IItem[]) {
        this._products = value
    }

    get products() {
        return this._products
    }

    getProduct(id: string) {
        this._products.find(product => product.id === id)
    }
}


export interface IBasketModel {
    get buyedItems(): IItem[]
    set buyedItems(value: IItem)
    checkItem(id: string): boolean
    deleteBuyeditems(id: string): void
    getTotalQuantity(): number
    getTotalPrice(): number
    getIdList(): string[]
    clear(): void
}

