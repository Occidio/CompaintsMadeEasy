import { Component, Output, EventEmitter } from '@angular/core';

@Component({
    selector: 'marketingInfo-component',
    moduleId: module.id,
    templateUrl: 'marketingInfo.component.html'
})


export class MarketingInfoComponent {
    @Output() onUpdate: EventEmitter<any> = new EventEmitter<any>();
    marketingInfo: boolean;

    public update(): void {
        this.onUpdate.emit(this.marketingInfo);
    }
}