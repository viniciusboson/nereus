import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { JhiEventManager, JhiParseLinks, JhiAlertService } from 'ng-jhipster';

import { Charge } from './charge.model';
import { ChargeService } from './charge.service';
import { ITEMS_PER_PAGE, Principal, ResponseWrapper } from '../../shared';

@Component({
    selector: 'jhi-charge',
    templateUrl: './charge.component.html'
})
export class ChargeComponent implements OnInit, OnDestroy {
charges: Charge[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private chargeService: ChargeService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {
    }

    loadAll() {
        this.chargeService.query().subscribe(
            (res: ResponseWrapper) => {
                this.charges = res.json;
            },
            (res: ResponseWrapper) => this.onError(res.json)
        );
    }
    ngOnInit() {
        this.loadAll();
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });
        this.registerChangeInCharges();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: Charge) {
        return item.id;
    }
    registerChangeInCharges() {
        this.eventSubscriber = this.eventManager.subscribe('chargeListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }
}
