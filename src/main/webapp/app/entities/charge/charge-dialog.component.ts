import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Rx';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { Charge } from './charge.model';
import { ChargePopupService } from './charge-popup.service';
import { ChargeService } from './charge.service';
import { Institution, InstitutionService } from '../institution';
import { Asset, AssetService } from '../asset';
import { ResponseWrapper } from '../../shared';

@Component({
    selector: 'jhi-charge-dialog',
    templateUrl: './charge-dialog.component.html'
})
export class ChargeDialogComponent implements OnInit {

    charge: Charge;
    isSaving: boolean;

    institutions: Institution[];

    assets: Asset[];

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private chargeService: ChargeService,
        private institutionService: InstitutionService,
        private assetService: AssetService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.institutionService.query()
            .subscribe((res: ResponseWrapper) => { this.institutions = res.json; }, (res: ResponseWrapper) => this.onError(res.json));
        this.assetService.query()
            .subscribe((res: ResponseWrapper) => { this.assets = res.json; }, (res: ResponseWrapper) => this.onError(res.json));
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.charge.id !== undefined) {
            this.subscribeToSaveResponse(
                this.chargeService.update(this.charge));
        } else {
            this.subscribeToSaveResponse(
                this.chargeService.create(this.charge));
        }
    }

    private subscribeToSaveResponse(result: Observable<Charge>) {
        result.subscribe((res: Charge) =>
            this.onSaveSuccess(res), (res: Response) => this.onSaveError());
    }

    private onSaveSuccess(result: Charge) {
        this.eventManager.broadcast({ name: 'chargeListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(error: any) {
        this.jhiAlertService.error(error.message, null, null);
    }

    trackInstitutionById(index: number, item: Institution) {
        return item.id;
    }

    trackAssetById(index: number, item: Asset) {
        return item.id;
    }

    getSelected(selectedVals: Array<any>, option: any) {
        if (selectedVals) {
            for (let i = 0; i < selectedVals.length; i++) {
                if (option.id === selectedVals[i].id) {
                    return selectedVals[i];
                }
            }
        }
        return option;
    }
}

@Component({
    selector: 'jhi-charge-popup',
    template: ''
})
export class ChargePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private chargePopupService: ChargePopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.chargePopupService
                    .open(ChargeDialogComponent as Component, params['id']);
            } else {
                this.chargePopupService
                    .open(ChargeDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
