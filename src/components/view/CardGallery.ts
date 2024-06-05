import { Card } from "./Card";
import { IEvents } from "../base/events";
import { ensureElement } from "../../utils/utils";
import { ICardGallery, TCategoryClasses } from "../../types";

export class CardGallery<T> extends Card<T> implements ICardGallery {
protected _image: HTMLImageElement;
protected _category: HTMLSpanElement;

constructor(container: HTMLElement, events: IEvents) {
    super(container, events);
    this._image = ensureElement<HTMLImageElement>('.card__image', container);
    this._category = ensureElement<HTMLSpanElement>('.card__category', container);
    this.container.addEventListener('click', () => this.events.emit('modal-card:open', {id: this.id}))
}  

// protected addCSSClassCategory(value: string) {
//     if(value in categoryCSSClassData) {
//     this._category.classList.add(categoryCSSClassData[value])
//     }
// }

categoryCSSClassData: TCategoryClasses = {
    'софт-скил': 'card__category_soft',
			'дополнительное': 'card__category_additional',
			'хард-скил': 'card__category_hard',
    'кнопка': 'card__category_button',
    'другое': 'card__category_other'
    }

set image(src: string) {
    this._image.src = src;
    this._image.alt = this.title
}

// set category(value: string) {
//     this.setText(this._category, value);
//     this.addCSSClassCategory(value)
// }

set category(category: string) {
    this.setText(this._category, category);
    Object.values(this.categoryCSSClassData).forEach(value => {
        this.removeClass(this._category, value);
    })
    if (category in this.categoryCSSClassData) {
        this.addClass(
            this._category,
            this.categoryCSSClassData[category as keyof typeof this.categoryCSSClassData]
        )
    }
}

get category() {
    return this._category.textContent ?? '';
}
}