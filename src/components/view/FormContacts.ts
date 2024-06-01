import { Form } from "./Form";
import { IFormContacts, TFormContacts } from "../../types";
import { ensureElement } from "../../utils/utils";
import { IEvents } from "./../base/events";

export class FormContacts extends Form<TFormContacts> implements IFormContacts {
    protected inputEmail: HTMLInputElement;
    protected inputPhone: HTMLInputElement;

    constructor(container: HTMLFormElement, events: IEvents) {
        super(container, events); 
        this.inputEmail = ensureElement<HTMLInputElement>('input[name=email]', container);
        this.inputPhone = ensureElement<HTMLInputElement>('input[name=phone]', container);
    }

    get email() {
        return this.inputEmail.value;
    }

    get phone() {
        return this.inputPhone.value
    }

    get valid() {
        if(Boolean(this.inputEmail.value) && Boolean(this.inputPhone.value)) {
            this.errorMessage ='';
            return false
        }
        else if(super.valid) {
            this.errorMessage ='Введите эл. почту и номер телефона';
            return true
        }
        else if(!Boolean(this.inputEmail.value) && Boolean(this.inputPhone.value)) {
            this.errorMessage ='Введите эл. почту';
            return true
        }
        else if(Boolean(this.inputEmail.value) && !Boolean(this.inputPhone.value)) {
            this.errorMessage ='Введите номер телефона';
            return true
        }
    }

    set valid(value: boolean) {
        super.valid = value;
    }
}