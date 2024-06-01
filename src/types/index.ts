
export interface IItem {
    _id: string;
    _title: HTMLElement;
    _image?: HTMLElement;
    _price: HTMLElement;
    _description?: HTMLElement;
    _category?: HTMLElement;
    _button?: HTMLElement;
}

export interface IItemsModelData {
    _products: IItem[];
    getProduct(id: string): IItem;
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

export interface IUserData {
    _phone_number: string;
    _address: string;
    _payment: TMoney;
    _email: string 
    _totalPrice: number;
    _userItemsList: string[];
}

export interface IUserOrder extends IUserData {
    userOrder: IUserData;
}

export interface IUserDataBuilder {
    paymentInfo: TMoneyInfo;
    deliveryInfo: TDelivery;
    contactsInfo: TContacts;
    get userOrderData(): IUserData;
}

export interface IUserConstructor {
    new (): IUserOrder;
}

export interface ISuccesData {
    orderSuccess: TSuccessData;
}


export interface IApiView {
    getItems(): Promise<IItem[]>;
    getItemById(id: string): Promise<IItem>;
    postItem(order: IUserData): Promise<TSuccessData>;
}

export interface IPage {
    catalog: HTMLElement[];
    counter: number;
    lockScreen(value: boolean): void;
}

export interface IModal {
    content: HTMLElement;
    open(): void;
    close(): void;
}

export interface IForm {
    valid: boolean;
    errorMessage: string;
    clear(): void;
}

export interface IFormOrder {
    payment: TMoney | null;
    address: string;
    valid: boolean;
    render(data: object): HTMLElement;
}

export interface IFormContacts {
    email: string;
    phone_number: string;
    valid: boolean;
}

export interface ISuccess {
    description: string;
}

export type TMoney = 'cash' | 'card'
export type TMoneyInfo = Pick<IUserData, '_totalPrice' | '_userItemsList'>;
export type TDelivery = Pick<IUserData, '_payment' | '_address'>;
export type TContacts = Pick<IUserData, '_email' | '_phone_number' >
export type TCategoryClassNames = 'card__category_soft' |'card__category_other' | 'card__category_additional' | 'card__category_button' | 'card__category_hard';
export type TCategoryClasses = Record<string, TCategoryClassNames>;
export type TPage = {counter: number, catalog: HTMLElement[]};
export type TBasket = {cardsList: HTMLElement[]; total: number; emptyCheck: boolean};
export type TModal ={content: HTMLElement};
export type TForm = {valid: boolean}
export type TFormOrder = {payment: TMoney; address: string};
export type TFormContacts = {email: string; phone: string};
export type TSuccessData = {id: string; total: number};
export type TSuccess = {description: string};
export type TId = {id: string};