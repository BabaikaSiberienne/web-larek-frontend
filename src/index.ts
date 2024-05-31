import './scss/styles.scss';
import {  API_URL, CDN_URL } from './utils/constants';
import { Api, ApiListResponse, ApiPostMethods } from './components/base/api';
import { EventEmitter } from './components/base/events';
interface ICard {
    _title: string;
    _description: string;
    _price: string;
    _category: string;
    _image_url: string;
}

// interface IForm_customer_connection {
//     _phone_number: Number;
//     _email: String;
// }

// interface IForm_delivery {
//     _adress: string;
//     _payment: boolean;
// }

// interface IHome_page {
//     page_wrapper: HTMLElement
//     gallery: HTMLElement;
// }

// шаг 1: отображение компонента

// export class ApiItemsModel extends Api {
//     protected cdn: string 
//     constructor (cdn: string, baseUrl: string, options: RequestInit = {}) {
//         super(baseUrl, options)
//         this.cdn = cdn

//     }

//     getProducts():Promise<IItem[]> {
//         return this.get('/product').then((list: ApiListResponse<IItem>) => {
//             return list.items.map((item) => { return {...item, image: this.cdn + item.image}})
//         })}
// }


// const api = new ApiItemsModel(CDN_URL, API_URL)
// const events = new EventEmitter()

// const items = api.getProducts()
// const gallery: HTMLElement = document.querySelector('.gallery')

