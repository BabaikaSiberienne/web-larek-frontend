# Проектная работа "Веб-ларек"

Стек: HTML, SCSS, TS, Webpack

Структура проекта:
- src/ — исходные файлы проекта
- src/components/ — папка с JS компонентами
- src/components/base/ — папка с базовым кодом

Важные файлы:
- src/pages/index.html — HTML-файл главной страницы
- src/types/index.ts — файл с типами
- src/index.ts — точка входа приложения
- src/styles/styles.scss — корневой файл стилей
- src/utils/constants.ts — файл с константами
- src/utils/utils.ts — файл с утилитами

## Установка и запуск
Для установки и запуска проекта необходимо выполнить команды

```
npm install
npm run start
```

или

```
yarn
yarn start
```
## Сборка

```
npm run build
```

или

```
yarn build
```


# Api

`export type ApiListResponse<Type> = { `      - описывает тип ответа с сервера, который содержит в себе количество элементов и массив с элементами
`    total: number,`
`    items: Type[]`
`};`

`export type ApiPostMethods = 'POST' | 'PUT' | 'DELETE';`  - описывает возможные типы запросов на сервер 

### класс Api

`readonly baseUrl: string;` - базовый путь 
`protected options: RequestInit;` - объект с настройками для формирования запроса

`protected handleResponse(response: Response): Promise<object>` - принимает ответ от сервера, возвращает его в формате json, если нет ошибки
` get(uri: string): Promise<object>` - выполняет `GET-запрос`, возвращает ответ сервера  в виде промиса

`post(uri: string, data: object, method: ApiPostMethods = 'POST'): Promise<object>` - по умолчанию выполняет `POST-запрос`, но метод может быть изменен

## EventsEmitter

Класс `EventsEmitter` - обработчик событий

`type EventName = string | RegExp;` - EventName может быть строкой или регвыражением

`type Subscriber = Function;` - тип подписчика - функция

`type EmitterEvent = {` - обработчик событий - объект, содержащий имя события и данные
`    eventName: string,`
`    data: unknown`
`};`


`on<T extends object>(eventName: EventName, callback: (event: T) => void)` - повесить обработчик событий

`off(eventName: EventName, callback: Subscriber)` - снять обработчик событий

`emit<T extends object>(eventName: string, data?: T)` - инициализировать события

`onAll(callback: (event: EmitterEvent) => void)` - обработать все события (выполнить коллбек на любое событие)

`offAll()` - сбросить события

`trigger<T extends object>(eventName: string, context?: Partial<T>)` - возвращает функцию, при вызове которой инициализируется требуемое в параметрах событие.

# Model

Класс `Model` - шаблон для классов слоя данных

`protected events: IEvents` - объект класса `EventEmitter` для инициализации событий

## ItemsModelData

Класс `ItemsModelData` хранит данные товаров

`protected _items: Iitems[]` - массив с товарами

`set items(value: IItems[]): void` - устанавливает значение массива товаров

`get items(): IItems[]` - возвращает массив с товарами

`get itemById(id: string): IItem` - возвращает товар, находя его по ID

## BasketModelData  

Класс `BasketModelData` хранит данные, принадлежащие корзине

`protected _buyedItems: IItems[]` - массив покупок

`get buyedItems: IItems[]` - возвращает массив покупок

`addBuyedItem(value: IItem): void` - устанавливает значение массива покупок

`checkItem(id: string): boolean` - определяет есть ли товар в корзине

`deleteBuyeditems(id: string): void` - удалить товар из массива

`getTotalQuantity(): number` - возвращает количество товаров в корзине

`getTotalPrice(): number` - возвращает итоговую стоимость товаров в корзине

`getIdList(): string[]` - возвращает список ID всех товаров в корзине, нужен при оформлении заказа

`clear(): void` - очистка корзины, выполняется в случае успешного заказа

## UserData

Класс `UserData` хранит данные, принадлежащие пользователю

`protected _phone-number: string;` - номер телефона пользователя

`protected _address: string;` - адрес пользователя

`protected _payment: IMoney` - способ оплаты пользователя

`protected _email: string` - электронная почта пользователя

`protected _totalPrice: number;` - обощая стоимость пользователя

`protected _userItemsList: string[];` - список ID товаров заказа пользователя


`set payment(value: IMoney)` - устанавливает способ оплаты

`set email(value: string)` - записывает электронную почту

`set phone-number(value: string)` - записывает номер телефона

`set address(value: string )` - устанавливает адрес

`set totalPrice(value: number)` - устанавливает итоговую стоимость заказанных товаров

`set userItemsList: string[]` - устанавливает список ID товаров заказа пользователя

`get userInfo(): IUser` - возвращает всю информацию о заказе


### UserDataBuilder

`protected user: IUserData` - экземпляр интерфейса IUserData

`orderConstructor: IUserConstructor` - класс, создающий объекты интерфейса IUserData

`set paymentInfo: TMoneyInfo` - записывает информацию корзины

`set deliveryInfo: TDeliveryInfo` - записывает с формы доставки

`set contactsInfo: TContactsInfo` - записывает информацию с формы контактов

`getOrderData(): IUser` - возвращает всю информацию о пользователе 

## SuccessData

protected _userSuccess: TSuccessData - ответ с данными об успешном заказе

set userSuccess(value: TSuccess): void - записывает данные оформленного заказа, пришедшие с сервера