import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Rx';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { Position } from './position.model';
import { PositionPopupService } from './position-popup.service';
import { PositionService } from './position.service';
import { Asset, AssetService } from '../asset';
import { Accounts, AccountsService } from '../accounts';
import { ResponseWrapper } from '../../shared';

@Component({
    selector: 'jhi-position-dialog',
    templateUrl: './position-dialog.component.html'
})
export class PositionDialogComponent implements OnInit {

    position: Position;
    isSaving: boolean;

    assets: Asset[];

    accounts: Accounts[];

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private positionService: PositionService,
        private assetService: AssetService,
        private accountsService: AccountsService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.assetService.query()
            .subscribe((res: ResponseWrapper) => { this.assets = res.json; }, (res: ResponseWrapper) => this.onError(res.json));
        this.accountsService.query()
            .subscribe((res: ResponseWrapper) => { this.accounts = res.json; }, (res: ResponseWrapper) => this.onError(res.json));
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.position.id !== undefined) {
            this.subscribeToSaveResponse(
                this.positionService.update(this.position));
        } else {
            this.subscribeToSaveResponse(
                this.positionService.create(this.position));
        }
    }

    private subscribeToSaveResponse(result: Observable<Position>) {
        result.subscribe((res: Position) =>
            this.onSaveSuccess(res), (res: Response) => this.onSaveError());
    }

    private onSaveSuccess(result: Position) {
        this.eventManager.broadcast({ name: 'positionListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(error: any) {
        this.jhiAlertService.error(error.message, null, null);
    }

    trackAssetById(index: number, item: Asset) {
        return item.id;
    }

    trackAccountsById(index: number, item: Accounts) {
        return item.id;
    }
}

@Component({
    selector: 'jhi-position-popup',
    template: ''
})
export class PositionPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private positionPopupService: PositionPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.positionPopupService
                    .open(PositionDialogComponent as Component, params['id']);
            } else {
                this.positionPopupService
                    .open(PositionDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
