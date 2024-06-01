
export interface IItem {
    _id: string;
    _title: HTMLElement;
    _image?: HTMLElement;
    _price: number;
    _description?: HTMLElement;
    _category?: HTMLElement;
    _button?: HTMLElement;
}

export interface IItemsModelData {
    _items: IItem[];
    getItem(id: string): IItem;
}

export interface ICardAction {
    onClick: (event: MouseEvent) => void;
}

export interface IBasketModel {
    get buyedItems(): IItem[]
    set buyedItems(value: IItem)
    checkItem(id: string): boolean
    deleteBuyedItems(id: string): void
    getTotalQuantity(): number
    getTotalPrice(): number
    getIdList(): string[]
    clear(): void
}

export interface ICard {
    id: string;
    title: string;
    price: string;
}
    
export interface ICardGallery {
    image: string;
    category: string;
}
    
export interface ICardBasket {
    index: number;
}
    
export interface ICardPreview {
    description: string;
    priceCheck: boolean;
    state: boolean;
}

export interface IUserData {
    userOrder: any;
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
    getUserOrderData(): IUserData;
}

export interface IUserConstructor {
    new (): IUserOrder;
}

export interface IApiPresenter {
    getItems(): Promise<IItem[]>;
    getItemById(id: string): Promise<IItem>;
    postItem(order: IUserData): Promise<TSuccessData>;
}

export interface IPage {
    gallery: HTMLElement[];
    counter: number;
    lock(value: boolean): void;
}

export interface ISuccess {
    description: string;
}

export interface ISuccessData {
    orderSuccess: TSuccessData;
}

export interface IBasket {
    cardsList: HTMLElement[];
    emptyCheck: boolean;
    total: number
}

export interface IForm {
    valid: boolean;
    errorMessage: string;
    clear(): void;
}
    

export interface IModal {
    content: HTMLElement;
    open(): void;
    close(): void;
}

export interface IFormDelivery {
    payment: TMoney | null;
    address: string;
    valid: boolean;
    clear(): void; 
    render(data: object ): HTMLElement; 
}
    
export interface IFormContacts {
    email: string;
    phone: string;
    valid: boolean;
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
export type TFormDelivery = {payment: TMoney; address: string};
export type TFormContacts = {email: string; phone: string};
export type TSuccessData = {id: string; total: number};
export type TSuccess = {description: string};
export type TId = {id: string};
export type TCardGallery = Omit<IItem, 'description'>;
export type TCardBasket = Pick<IItem, '_id' | '_title' | '_price'> & {index: number};
export type TCardPreview = IItem & {priceCheck: boolean; state: boolean};