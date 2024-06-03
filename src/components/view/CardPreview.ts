import { CardGallery } from "./CardGallery";
import { IEvents } from "./../base/events";
import { ensureElement } from "../../utils/utils";
import { TCardPreview, ICardPreview } from "../../types";

export class CardPreview extends CardGallery<TCardPreview> implements ICardPreview {
    protected _description: HTMLParagraphElement;
    protected buttonBuyDelete: HTMLButtonElement;

    constructor(container: HTMLElement, events: IEvents) {
        super(container, events);
        this._description = ensureElement<HTMLParagraphElement>('.card__image', container);
        this.buttonBuyDelete = ensureElement<HTMLButtonElement>('.card__button', container);
        this.buttonBuyDelete.addEventListener('click', () => {
            if(this.buttonBuyDelete.textContent === 'Купить') {this.events.emit('purchases:add', {id: this.id})}
            else {this.events.emit('purchases:delete', {id: this.id})}
        })
    }

    set description(value: string) {
        this.setText(this._description, value)
    }

    set priceCheck(value: boolean) {
        this.buttonBuyDelete.disabled = !value
    }

    get priceCheck() { 
        return !this.buttonBuyDelete.disabled 
    }

    set state(value: boolean) {
        if(!this.priceCheck) { this.buttonBuyDelete.textContent = "Не продается"}
        else {
            if(value) {this.buttonBuyDelete.textContent = "Убрать из корзины"} 
            else {this.buttonBuyDelete.textContent  = "Купить"}
        }
    }
}