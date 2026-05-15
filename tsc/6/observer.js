"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RetakePublisher = exports.DeanOffice = void 0;
class DeanOffice {
    update(message) {
        console.log(`Деканат получил уведомление: ${message}`);
    }
}
exports.DeanOffice = DeanOffice;
class RetakePublisher {
    constructor() {
        this.observers = [];
    }
    subscribe(observer) {
        this.observers.push(observer);
    }
    unsubscribe(observer) {
        this.observers = this.observers.filter((currentObserver) => currentObserver !== observer);
    }
    notify(message) {
        for (const observer of this.observers) {
            observer.update(message);
        }
    }
}
exports.RetakePublisher = RetakePublisher;
