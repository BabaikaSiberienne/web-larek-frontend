import { IEvents } from "./../base/events";
import { Model } from "./Model"
import { ISuccessData, TSuccessData } from "../../types"

export class SuccessModel extends Model implements ISuccessData {
    protected _orderSuccess: TSuccessData;

    constructor (events: IEvents) {
        super(events)
    }

    set orderSuccess (value: TSuccessData) {
        this._orderSuccess = value;
        this.events.emit('success:changed', this._orderSuccess)
    }
    
    get orderSuccess() {
        return this._orderSuccess;
    }
}

