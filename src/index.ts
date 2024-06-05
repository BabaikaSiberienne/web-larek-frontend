// делаем необходиме импорты для приложения
import './scss/styles.scss';
import { API_URL, CDN_URL } from './utils/constants';
import { EventEmitter } from './components/base/events'
import { cloneTemplate, ensureElement } from './utils/utils';
import { ApiPresenter } from './components/ApiPresenter';
import { ItemsModelData } from './components/model/ItemsModelData';
import { BasketModelData } from './components/model/BasketModelData';
import { UserData } from './components/model/UserData';
import { UserOrderDataBuilder } from './components/model/UserDataBuilder';
import { SuccessModel } from './components/model/SuccessModel';
import { CardGallery } from './components/view/CardGallery';
import { CardBasket } from './components/view/CardBasket';
import { CardPreview } from './components/view/CardPreview';
import { Page } from './components/view/Page';
import { Basket } from './components/view/Basket';
import { Modal } from './components/view/Modal';
import { FormDelivery } from './components/view/FormDelivery';
import { FormContacts } from './components/view/FormContacts';
import { Success } from './components/view/Success';
import { IItem, IItems, TCardGallery, TId, TSuccessData } from './types';

//исчем контейнеры и темплейты
const containerPage = ensureElement<HTMLElement>('.page');
const containerModal = ensureElement<HTMLDivElement>('#modal-container');
const templateCardCatalog = ensureElement<HTMLTemplateElement>('#card-catalog');
const templateCardPreview = ensureElement<HTMLTemplateElement>('#card-preview');
const templateCardBasket = ensureElement<HTMLTemplateElement>('#card-basket');
const templateBasket = ensureElement<HTMLTemplateElement>('#basket');
const templateOrder = ensureElement<HTMLTemplateElement>('#order');
const templateContacts = ensureElement<HTMLTemplateElement>('#contacts');
const templateSuccess = ensureElement<HTMLTemplateElement>('#success');

//Создаем экземпляры классов EventEmitter и AppApi
const api = new ApiPresenter(CDN_URL, API_URL);
const events = new EventEmitter();

//Создаем слой модели
const itemsData = new ItemsModelData(events);
const basketData = new BasketModelData(events);
const userOrderDataBuilder = new UserOrderDataBuilder(events, UserData);
const successData = new SuccessModel(events);

//Создаем слой представления
const page = new Page(containerPage, events);
const modal = new Modal(containerModal, events);
const cardPreview = new CardPreview(cloneTemplate(templateCardPreview), events);
const basket = new Basket(cloneTemplate(templateBasket), events);
const formOrder = new FormDelivery(cloneTemplate(templateOrder), events);
const formContacts = new FormContacts(cloneTemplate(templateContacts), events);
const success = new Success(cloneTemplate(templateSuccess), events);

//получим данны о продуктах с сервера
api.getItems().then((data) => {
  itemsData.items = data;
}).catch(console.error)

//обработчик события изменения данных о продуктах 
  events.on('products:changed', (items: IItems[]) => {
    const cardsList = items.map((product) => {
      const cards = new CardGallery<TCardGallery>(cloneTemplate(templateCardCatalog), events);
      return cards.render(product)
    })
    page.render({gallery: cardsList})
  });

events.on('modal:open', () => {
  page.lock(true);
});

events.on('modal:close', () => {
  page.lock(false);
});

//обработаем событие, когда покупатель кликнул по иконке(кнопке) корзины на главной старанице
events.on('modal-basket:open', () => {
  modal.render({ content: basket.render({totalPrice: basketData.getTotalPrice(), emptyCheck: basketData.getTotalQuantity() === 0})});
  modal.open();
});

//обработаем событие, когда покупатель кликнул по какой-нибудь карточке в каталоге на главной странице
events.on('modal-card:open',(data: TId) => {
  const productCorrect = itemsData.getItem(data.id);
  if(productCorrect) { 
  modal.render({ content: cardPreview.render({...productCorrect, priceCheck: Boolean(productCorrect.price), state: basketData.checkItem(productCorrect.id)})});
  modal.open();
  }
});

//обработаем событие добавления товара в корзину
events.on('purchases:add', (data: TId) => {
  basketData.addBuyedItems(itemsData.getItem(data.id))
});

events.on('purchases:delete', (data: TId) => {
  basketData.deleteBuyedItems(data.id)

});

events.on('purchases:changed', (data: TId) => {
  cardPreview.render({priceCheck: true, state: !basketData.checkItem(data.id)});
  page.render({counter: basketData.getTotalQuantity()});
  const purchasesList = basketData.buyedItems.map((purchase, index) => {
    const cardBasket = new CardBasket(cloneTemplate(templateCardBasket), events);
    return cardBasket.render({...purchase, index: ++index})
  });
  basket.render({itemsList: purchasesList, totalPrice: basketData.getTotalPrice(), emptyCheck: basketData.getTotalQuantity() === 0})
});


events.on('modal-order:open', () => {
  userOrderDataBuilder.paymentInfo = {total: basketData.getTotalPrice(), items: basketData.getIdList()};
  modal.render({content: formOrder.render({valid: formOrder.valid})})
});

//обработчик события взаимодействия пользователя с полями формы доставки
events.on('order:valid', () => {
  formOrder.valid = formOrder.valid;
  userOrderDataBuilder.deliveryInfo = {payment: formOrder.payment, address: formOrder.address}
});

//после заполнения формы доставки и записи для заказа соответствующих данных для заказа, обработчик события перехода к форме контактных данныхе
events.on(`order:submit`, () => {
  modal.render({content: formContacts.render({valid: formContacts.valid})})
});

//обработчик события взаимодействия пользователя с полями формы контактных данных
events.on('contacts:valid', () => {
  formContacts.valid = formContacts.valid;
  userOrderDataBuilder.contactsInfo = {email: formContacts.email, phone: formContacts.phone};
});

/*
после успешного заполнения формы контактных данных отправляем сформированный заказ на сервер,
получаем от сервера данные, записываем их и очищаем корзину и формы: обработаем данное событие
*/
events.on('contacts:submit', () => {
  const order = userOrderDataBuilder.getUserOrderData().userOrder;
  api.postItem(order).then((data: TSuccessData) => {
    successData.orderSuccess = data;
    formOrder.clear();
    formContacts.clear();
    basketData.clear();
  }).catch(console.error)
});

//обработчик события получения данных с сервера и записываем в соответсвующий объект класса слоя данных
events.on('success:changed', (data: TSuccessData) => {
  modal.render({content: success.render({description: String(data.total)})})
});

//обработчик события успешной покупки, обрабатываем путем закрытия окна нажатием на кнопку 
events.on('success:confirm', () => {
  modal.close();
})