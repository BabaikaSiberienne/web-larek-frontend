import { IEvents } from "./base/events";
export class Model {
    protected events: IEvents;

    constructor (events: IEvents) {
        this.events = events
    }
}