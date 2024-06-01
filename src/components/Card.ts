import { IItem } from "../types";
export class Card implements IItem {
    _id: string;
    _title: HTMLElement;
    _image?: HTMLElement;
    _price: HTMLElement;
    _description?: HTMLElement;
    _category?: HTMLElement;
    _button?: HTMLElement;
}