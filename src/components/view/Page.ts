
import { Component } from "./View";
import { IPage, TPage } from "../../types";
import { ensureElement } from "../../utils/utils";
import { IEvents } from "./../base/events";

export class Page extends Component<TPage> implements IPage {
    protected _gallery: HTMLElement;
    protected _buttonBasket: HTMLButtonElement;
    protected _counter: HTMLSpanElement;
    protected _wrapper: HTMLDivElement;

    constructor(container: HTMLElement, events: IEvents) {
        super(container, events);
        this._buttonBasket = ensureElement<HTMLButtonElement>('.header__basket', container);
        this._buttonBasket.addEventListener('click', () => events.emit('modal-basket:open'));
        this._counter = ensureElement<HTMLSpanElement>('.header__basket-counter', this._buttonBasket);
        this._gallery = ensureElement<HTMLElement>('.gallery', container);
        this._wrapper = ensureElement<HTMLDivElement>('.page__wrapper', container)
    }

    set gallery(cards: HTMLElement[]) {
        this._gallery.replaceChildren(...cards)
    }

    set counter(value: number) {
        this.setText(this._counter, String(value));
    }

    lock(value: boolean) {
        if(value) {this._wrapper.classList.add('page__wrapper_locked')}
        else{this._wrapper.classList.remove('page__wrapper_locked')}
    }
}
