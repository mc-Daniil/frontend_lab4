export interface RetakeObserver {
  update(message: string): void;
}

export class DeanOffice implements RetakeObserver {
  update(message: string): void {
    console.log(`Деканат получил уведомление: ${message}`);
  }
}

export class RetakePublisher {
  private observers: RetakeObserver[];

  constructor() {
    this.observers = [];
  }

  subscribe(observer: RetakeObserver): void {
    this.observers.push(observer);
  }

  unsubscribe(observer: RetakeObserver): void {
    this.observers = this.observers.filter(
      (currentObserver: RetakeObserver): boolean => currentObserver !== observer
    );
  }

  notify(message: string): void {
    for (const observer of this.observers) {
      observer.update(message);
    }
  }
}