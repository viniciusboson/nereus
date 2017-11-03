import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Rx';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { PositionMetric } from './position-metric.model';
import { PositionMetricPopupService } from './position-metric-popup.service';
import { PositionMetricService } from './position-metric.service';
import { Position, PositionService } from '../position';
import { Asset, AssetService } from '../asset';
import { ResponseWrapper } from '../../shared';

@Component({
    selector: 'jhi-position-metric-dialog',
    templateUrl: './position-metric-dialog.component.html'
})
export class PositionMetricDialogComponent implements OnInit {

    positionMetric: PositionMetric;
    isSaving: boolean;

    positions: Position[];

    assets: Asset[];

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private positionMetricService: PositionMetricService,
        private positionService: PositionService,
        private assetService: AssetService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.positionService.query()
            .subscribe((res: ResponseWrapper) => { this.positions = res.json; }, (res: ResponseWrapper) => this.onError(res.json));
        this.assetService.query()
            .subscribe((res: ResponseWrapper) => { this.assets = res.json; }, (res: ResponseWrapper) => this.onError(res.json));
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.positionMetric.id !== undefined) {
            this.subscribeToSaveResponse(
                this.positionMetricService.update(this.positionMetric));
        } else {
            this.subscribeToSaveResponse(
                this.positionMetricService.create(this.positionMetric));
        }
    }

    private subscribeToSaveResponse(result: Observable<PositionMetric>) {
        result.subscribe((res: PositionMetric) =>
            this.onSaveSuccess(res), (res: Response) => this.onSaveError());
    }

    private onSaveSuccess(result: PositionMetric) {
        this.eventManager.broadcast({ name: 'positionMetricListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(error: any) {
        this.jhiAlertService.error(error.message, null, null);
    }

    trackPositionById(index: number, item: Position) {
        return item.id;
    }

    trackAssetById(index: number, item: Asset) {
        return item.id;
    }
}

@Component({
    selector: 'jhi-position-metric-popup',
    template: ''
})
export class PositionMetricPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private positionMetricPopupService: PositionMetricPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.positionMetricPopupService
                    .open(PositionMetricDialogComponent as Component, params['id']);
            } else {
                this.positionMetricPopupService
                    .open(PositionMetricDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
