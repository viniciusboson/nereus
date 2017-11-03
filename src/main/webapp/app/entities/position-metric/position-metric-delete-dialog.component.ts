import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { PositionMetric } from './position-metric.model';
import { PositionMetricPopupService } from './position-metric-popup.service';
import { PositionMetricService } from './position-metric.service';

@Component({
    selector: 'jhi-position-metric-delete-dialog',
    templateUrl: './position-metric-delete-dialog.component.html'
})
export class PositionMetricDeleteDialogComponent {

    positionMetric: PositionMetric;

    constructor(
        private positionMetricService: PositionMetricService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.positionMetricService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'positionMetricListModification',
                content: 'Deleted an positionMetric'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-position-metric-delete-popup',
    template: ''
})
export class PositionMetricDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private positionMetricPopupService: PositionMetricPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.positionMetricPopupService
                .open(PositionMetricDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
