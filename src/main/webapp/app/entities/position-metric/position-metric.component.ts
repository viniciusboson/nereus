import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { JhiEventManager, JhiParseLinks, JhiAlertService } from 'ng-jhipster';

import { PositionMetric } from './position-metric.model';
import { PositionMetricService } from './position-metric.service';
import { ITEMS_PER_PAGE, Principal, ResponseWrapper } from '../../shared';

@Component({
    selector: 'jhi-position-metric',
    templateUrl: './position-metric.component.html'
})
export class PositionMetricComponent implements OnInit, OnDestroy {
positionMetrics: PositionMetric[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private positionMetricService: PositionMetricService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {
    }

    loadAll() {
        this.positionMetricService.query().subscribe(
            (res: ResponseWrapper) => {
                this.positionMetrics = res.json;
            },
            (res: ResponseWrapper) => this.onError(res.json)
        );
    }
    ngOnInit() {
        this.loadAll();
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });
        this.registerChangeInPositionMetrics();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: PositionMetric) {
        return item.id;
    }
    registerChangeInPositionMetrics() {
        this.eventSubscriber = this.eventManager.subscribe('positionMetricListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }
}
