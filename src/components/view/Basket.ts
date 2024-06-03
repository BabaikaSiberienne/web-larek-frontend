import { IEvents } from "./../base/events";
import { Component } from "./View"
import { TBasket } from "../../types";
import { ensureElement } from "../../utils/utils";

export class Basket extends Component<TBasket> {
protected _itemsList: HTMLUListElement;
protected _totalPrice: HTMLSpanElement;
protected buttonToOrder: HTMLButtonElement;

constructor (container: HTMLElement, events: IEvents) {
    super(container, events)
    this._itemsList = ensureElement<HTMLUListElement>('.basket__list', container);
    this._totalPrice = ensureElement<HTMLSpanElement>('.basket__price', container);
    this.buttonToOrder = ensureElement<HTMLButtonElement>('.basket__button', container);
    this.buttonToOrder.addEventListener('click', () => this.events.emit('modal-order:open'))
}

set itemsList(cards: HTMLElement[]) {
    this._itemsList.replaceChildren(...cards)
    console.log("itemsList")
}

set emptyCheck(state: boolean) {
    this.buttonToOrder.disabled = state
    console.log("emptyCheck")
}

set totalPrice(value: number) {
    this.setText(this._totalPrice, String(value) + 'синапсов')
    console.log("totalPrice")
    }
}