import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { JhiEventManager } from 'ng-jhipster';

import { PositionMetric } from './position-metric.model';
import { PositionMetricService } from './position-metric.service';

@Component({
    selector: 'jhi-position-metric-detail',
    templateUrl: './position-metric-detail.component.html'
})
export class PositionMetricDetailComponent implements OnInit, OnDestroy {

    positionMetric: PositionMetric;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private positionMetricService: PositionMetricService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInPositionMetrics();
    }

    load(id) {
        this.positionMetricService.find(id).subscribe((positionMetric) => {
            this.positionMetric = positionMetric;
        });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInPositionMetrics() {
        this.eventSubscriber = this.eventManager.subscribe(
            'positionMetricListModification',
            (response) => this.load(this.positionMetric.id)
        );
    }
}
