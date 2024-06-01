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

Проектная работа написана согласно принципу MVP, разделена на компоненты согласно слоям: Model - слой данных - отвечает за их хранение и изменение, View - слой представления - отвечает за отображение данных на странице , Presenter - соединяющий слой - отвечает за связь данных и отображений

## Базовые классы

Поля и свойства:
`export type ApiListResponse<Type> = { `      - описывает тип ответа с сервера, который содержит в себе количество элементов и массив с элементами
`    total: number,`
`    items: Type[]`
`};`

`export type ApiPostMethods = 'POST' | 'PUT' | 'DELETE';`  - описывает возможные типы запросов на сервер 

### класс Api

Поля и свойства:

`readonly baseUrl: string;` - базовый путь 
`protected options: RequestInit;` - объект с настройками для формирования запроса

Методы:

`protected handleResponse(response: Response): Promise<object>` - принимает ответ от сервера, возвращает его в формате json, если нет ошибки
` get(uri: string): Promise<object>` - выполняет `GET-запрос`, возвращает ответ сервера  в виде промиса

`post(uri: string, data: object, method: ApiPostMethods = 'POST'): Promise<object>` - по умолчанию выполняет `POST-запрос`, но метод может быть изменен

### EventsEmitter

Класс `EventsEmitter` - обработчик событий

Поля и свойства:

`type EventName = string | RegExp;` - EventName может быть строкой или регвыражением

`type Subscriber = Function;` - тип подписчика - функция

`type EmitterEvent = {` - обработчик событий - объект, содержащий имя события и данные
`    eventName: string,`
`    data: unknown`
`};`


Методы:

`on<T extends object>(eventName: EventName, callback: (event: T) => void)` - повесить обработчик событий

`off(eventName: EventName, callback: Subscriber)` - снять обработчик событий

`emit<T extends object>(eventName: string, data?: T)` - инициализировать события

`onAll(callback: (event: EmitterEvent) => void)` - обработать все события (выполнить коллбек на любое событие)

`offAll()` - сбросить события

`trigger<T extends object>(eventName: string, context?: Partial<T>)` - возвращает функцию, при вызове которой инициализируется требуемое в параметрах событие.

## Слой данных Model

Класс `Model` - шаблон для классов слоя данных

`protected events: IEvents` - объект класса `EventEmitter` для инициализации событий

### ItemsModelData

Класс `ItemsModelData` хранит данные товаров

Поля и свойства:

`protected _items: Iitems[]` - массив с товарами

Методы:

`set items(value: IItems[]): void` - устанавливает значение массива товаров

`get items(): IItems[]` - возвращает массив с товарами

`get itemById(id: string): IItem` - возвращает товар, находя его по ID

### BasketModelData  

Класс `BasketModelData` хранит данные, принадлежащие корзине

Поля и свойства:

`protected _buyedItems: IItems[]` - массив покупок

Методы:

`get buyedItems: IItems[]` - возвращает массив покупок

`addBuyedItem(value: IItem): void` - устанавливает значение массива покупок

`checkItem(id: string): boolean` - определяет есть ли товар в корзине

`deleteBuyeditems(id: string): void` - удалить товар из массива

`getTotalQuantity(): number` - возвращает количество товаров в корзине

`getTotalPrice(): number` - возвращает итоговую стоимость товаров в корзине

`getIdList(): string[]` - возвращает список ID всех товаров в корзине, нужен при оформлении заказа

`clear(): void` - очистка корзины, выполняется в случае успешного заказа

### UserData

Класс `UserData` хранит данные, принадлежащие пользователю

Поля и свойства:
`protected _phone-number: string;` - номер телефона пользователя

`protected _address: string;` - адрес пользователя

`protected _payment: IMoney` - способ оплаты пользователя

`protected _email: string` - электронная почта пользователя

`protected _totalPrice: number;` - обощая стоимость пользователя

`protected _userItemsList: string[];` - список ID товаров заказа пользователя

Методы:

`set payment(value: IMoney)` - устанавливает способ оплаты

`set email(value: string)` - записывает электронную почту

`set phone_number(value: string)` - записывает номер телефона

`set address(value: string )` - устанавливает адрес

`set totalPrice(value: number)` - устанавливает итоговую стоимость заказанных товаров

`set userItemsList: string[]` - устанавливает список ID товаров заказа пользователя

`get userInfo(): IUser` - возвращает всю информацию о заказе


#### UserDataBuilder
Класс `UserDataBuilder` является является билдером класса `UserData`, ибо формирование заказа происходит сложно, в 3 этапа: добавление товаров в корзину, указание способа покупки и адреса доставки, указание email и телефона.

Поля и свойства:

`protected user: IUserData` - экземпляр интерфейса IUserData

`userConstructor: IUserConstructor` - класс, создающий объекты интерфейса IUserData

Методы:

`set paymentInfo: TMoneyInfo` - записывает информацию корзины

`set deliveryInfo: TDeliveryInfo` - записывает с формы доставки

`set contactsInfo: TContactsInfo` - записывает информацию с формы контактов

`getOrderData(): IUser` - возвращает всю информацию о пользователе 

### SuccessData

Поля и свойства:

`protected _userSuccess: TSuccessData` - ответ с данными об успешном заказе

Методы и конструкции:

`set userSuccess(value: TSuccess): void` - записывает данные оформленного заказа, пришедшие с сервера


## Слой представления View
### Component 
Класс, отвечающий за отображение данных 

Конструктор:

`protected container: HTMLElement,` - DOM элемент, который передается в конструкторе

`protected events?: IEvents` - экземпляр брокера событий


Методы:

`protected setText(element: HTMLElement, value: unknown): void` - устанавливает текстовое содержимое изменяемого элемента

`protected setImage(element: HTMLImageElement, src: string, alt?: string): void` - устанавливает данные изображения

`render(data?: Partial<T>): HTMLElement` - возвращает DOM элемент, меняент его или прописывает

### Page

Класс `Page` отвечает за отображение главное страницы

Конструктор:

View

Поля и свойства:

`_gallery: HTMLElement` - отображает список товаров
`_counter: HTMLSpanElement` - счётчик количества товаров в корзине
`_wrapper: HTMLElement` - элемент внешней обертки страницы
`_basket: HTMLButtonElement;` - кнопка корзины

Методы:

`set gallery(cards: HTMLElement[]): void` - устанавливает содержимое контейнера с карточками
`set counter(value: number): void` - устанавливает значение счетчика корзины
`set lock(value: boolean) void` - отвечате за блокировку и разблокировку скроллбара

### Basket

Класс `Basket` отображает корзину стоварами.

Поля и свойства:

`protected _itemsList: HTMLUListElement` - HTML элемент, отвечающий за отображение списка карточек в корзине
`protected _totalPrice: HTMLSpanElement;` - HTML элемент, отвечающий за отображение общей стоимости товаров
`protected buttonToOrder: HTMLButtonElement` - кнопка "Оформить".

Конструкторе:

параметры View.

Методы:

`set itemsList(cards: HTMLElement[]): void` - устанавливает список карточек добавленных товаров в корзину
`set emptyCheck(state: boolean): void` - для блокировки кнопки "Оформить", если корзина пуста
`set totalPrice(value: number)` - устанавливает общую стоимость товаров 

### Card

Элемент Card расширяет элемент Component

Поля и свойства:

`protected _id: string;` - прописывает ID товара

`protected _title: HTMLHeadingElement;` - прописывает заголовок товара

`protected _price: string;` - прописывает цену товара

`protected _image: HTMLImageElement;` - прописывает картинку товара

`protected _category: string;` - прописывает категорию товара

`protected _description: string;` - прописывает описание товара

`protected button: HTMLButtonElement;` - прописывает кнопку товара


Методы и конструкции:
    
`set id(id: string): void` - прописывает ID товара
    
`set title(title: string): void` - устанавливает заголовок товара
    
`set price(price: string): void` - устанавливает цену товара, в случае её отсутствия значение цены равно бесценному
    
#### CardGallery
Класс `CardGallery` расширяет класс Card. Отображает карточку в каталоге на главной странице приложения.

Поля и свойства:

protected _image: HTMLImageElement - html элемент, отвечающий за отображение изображения товара
protected _category: HTMLSpanElement - html элемент, отвечающий за отображение категории товара.

Конструктор:

Card

Методы:

protected addCSSClassCategory(value: string): void - служебный метод, предназначенный для присваивания определенного css класса html элементу категории товара в зависимости от ее названия (установка фонового цвета)
set image(src: string): void - запись данных изображения товара
set category(value: string): void - запись данных категории товара
get category(): string - получение названия категории товара.


#### CardBasket
Класс CardBasket расширяет класс Card. Отображает карточки товара в корзине.

Поля и свойства:

_index: HTMLSpanElement - html элемент, отвечающий за отображение порядкового номера в корзине
buttonDelCard: HTMLButtonElement - иконка корзины, по клику на которую удаляется соответствующая карточка.

Конструктор:

Card

Методы:

set index(value: number): void - записывает порядковый номер карточки в корзине.
Класс CardPreview
Расширяет класс CardCatalog. Служит для предварительного просмотра карточки товара с более детальным описанием и возможностью добавления его в корзину.

Поля и свойства:

protected _description: HTMLParagraphElement - html элемент, отвечающий за отображение описания товара
protected buttonBuyDelete: HTMLButtonElement - кнопка для покупки товара или удаления товара из корзины в случае, если он уже был добавлен в нее.

Конструктор:

CardGallery

Методы:

set description(value: string): void - записвает описание товара
set priceCheck(value: boolean): void - записывает булево значение для блокировки/разблокировки кнопки добавления в корзину, если в модальном окне открыт бесценный товар: true - блокирует кнопку, false - разблокирует кнопку
get priceCheck(): boolean - возвращает булево значение для блокировки/разблокировки кнопки добавления в корзину
set state(value: boolean) - устанавливает состояние кнопки

### Modal
Класс `Modal` реализует модальное окно.

Поля и свойства:

`protected _content: HTMLElement` - содержимое модального окна

`protected buttonClose: HTMLButtonElement`- кнопка закрытия модального окна.

Параметры в конструкторе:

параметры View.

Методы:

`set content(value: HTMLElement): void` - для возможности изменения внутреннего 
содержимого модального окна

`open(): void` - метод отображения модального окна

`close(): void` - метод для закрытия модального окна.


### Form
Класс `Form` реализует формы.

Поля:

`protected container: HTMLFormElement` - соответствующая форма

`protected inputsList: HTMLInputElement[]` - массив input элементов формы

`protected submitButton: HTMLButtonElement` - кнопка отправки формы

`protected _errorMessage: HTMLSpanElement` - html элемент для отображения ошибок формы.

Параметры в конструкторе:

параметры View.

Методы:

`get valid(): boolean` - получения статуса валидности формы

`set valid(value: boolean):void` - запись для блокировки (true) / разблокировки (false)
кнопки submit

`set errorMessage(value: string)` - установка текста ошибок

`clear():void` - очистка формы

`render(data: Partial<T> & TForm ): HTMLElement` - модернизированный render View для форм: учитывает установку обязательных полей valid и errorMessage.



#### FormDelivery
Класс `FormDelivery` расширяет класс `Form`. Форма, содержащая данные доставки.

Поля:

`protected containerButtons: HTMLDivElement` - контейнер с кнопками 

`protected buttonCard: HTMLButtonElement` - кнопка "онлайн"

`protected buttonCash: HTMLButtonElement` - кнопка "при получении"

`protected inputAddress: HTMLInputElement` - поле для ввода адреса 

Конструктор:

параметры Form.

Методы:

`protected getButtonActive(): HTMLButtonElement | null` - возвращает кнопку, которая активна, либо null, если активных нет

`protected resetButtons(): void` - очищает класс активного состояния с кнопок 

`clear(): void` - Очищает форму и снимает класс активного состояния с кнопок

`get payment(): TPayment | null` - возвращает имя активной кнопки или null

`get address(): string` - возвращает адрес 

`get valid(): boolean` - возвращает валидность формы. 

`set valid(value: boolean):void` - запись для блокировки (true) / разблокировки (false) кнопки submit.



#### FormContacts 

Класс FormContacts расширяет класс `Form`. Форма для указания контактов.

Поля и свойства:

`protected inputEmail: HTMLInputElement` - поле для email

`protected inputPhone: HTMLInputElement` - поле для номера телефона.

Конструктор:

параметры Form.

Методы:

`get email(): string` - возвращает email

`get phone_number(): string` - возвращает номер телефона

`get valid(): boolean` - возвращает валидность формы. Также записывается текст ошибки

`set valid(value: boolean): void` - запись для блокировки (true) / разблокировки (false) кнопки submit.

### Success
Класс `Success` является уведомлением об успешной покупке, содержит кнопку

Поля и свойства:

`protected buttonUserOrderSuccess: HTMLButtonElement` - кнопка
`protected _description: HTMLParagraphElement` - HTML элемент, выводит общую стоимость

Конструктор:

параметры View

Методы:

`set description(total: string): void` - устанавливает количество потраченных средств в html элемент _description.




## Соединяющий слой Presenter

### ApiPresenter
Класс `ApiPresenter` расширяет класс Api и предоставляет методы взаимодействие с бэкендом.

Поля и свойства: 

`protected cdn: string` - базовый путь до изображений карточек, передаваемый в конструкторе.

Конструктор:

параметры Api
cdn: string - базовый путь до изображений карточек.

Методы:

`getItems(): Promise<IItem[]>` - получает с сервера массив объектов всех товаров
`getItemById(id: string): Promise<IItem>` - получает с сервера конкретный товар по id
`postItem(order: ICustomer): Promise<TSuccessData>`  - отправляет post запрос на сервер, содержащий данные о заказе и получает по итогу номер заказа (id) и общую сумму заказ (total).

Код, описывающий взаимодействие представления и данных между собой находится в файле index.ts, выполняющем роль презентера.
Взаимодействие происходит за счет событий, которые воспроизводятся с помощью брокера событий и обработчиков этих событий, описанных в index.ts. В index.ts сначала создаются экземпляры всех необходимых классов, а затем настраивается обработка событий.

Список событий, которые могут генерироваться в системе:


События изменения данных (генерируются классами моделями данных):

products:changed - изменение массива данных продуктов

purchases:changed - изменение массива покупок(добавленные товары покупателем в корзину)

success:changed - событие, возникающее при получении(изменении) данных успешного заказа.

События, возникающие при взаимодействии пользователя с интерфейсом (генерируются классами, отвечающими за представление):

modal:open - событие, срабатывающее при открытии модального окна

modal:close - событие, срабатывающее при закрытии модального окна

modal-card:open - выбор карточки для отображения в модальном окне

modal-basket:open - открытие модального окна для отображения корзины

purchases:add - событие при добавлении товара в покупки покупателя

purchases:delete - событие при удалении товара из покупок покупателя

modal-order:open - открытие модального окна с формой доставки

order:valid - событие, возникающее при действиях покупателя с полями формы доставки

order:submit - событие, возникающее при успешном прохождении формы доставки

contacts:valid - событие, возникающее при действиях покупателя с полями формы контактных данных

contacts:submit - событие, возникающее при успешном прохождении формы контактных данных.