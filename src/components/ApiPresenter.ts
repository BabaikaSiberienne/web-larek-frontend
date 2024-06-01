import { Api, ApiListResponse } from "./base/api";
import { IApiPresenter, IUserData, TSuccessData, IItem } from "../types"

export class ApiPresenter extends Api implements IApiPresenter {
    protected cdn: string; 

    constructor(cdn: string, baseUrl: string, options: RequestInit = {}) {
    super(baseUrl, options);
    this.cdn = cdn;
    }

getItems(): Promise<IItem[]> {
    return this.get('/product').then((list: ApiListResponse<IItem>) => {
        return list.items.map((item) => { return {...item, image: this.cdn + item._image}})
    })
}

getItemById(id: string): Promise<IItem> {
    return this.get('/product/' + id).then((item: IItem) => {
        return {...item, image: this.cdn + item._image}
    })
}

postItem(order: IUserData): Promise<TSuccessData> {
    return this.post('/order', order).then((success: TSuccessData) => {
        return success
        })
    }
}  