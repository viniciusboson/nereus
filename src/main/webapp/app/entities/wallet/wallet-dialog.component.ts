import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Rx';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { Wallet } from './wallet.model';
import { WalletPopupService } from './wallet-popup.service';
import { WalletService } from './wallet.service';
import { Accounts, AccountsService } from '../accounts';
import { Asset, AssetService } from '../asset';
import { Institution, InstitutionService } from '../institution';
import { ResponseWrapper } from '../../shared';

@Component({
    selector: 'jhi-wallet-dialog',
    templateUrl: './wallet-dialog.component.html'
})
export class WalletDialogComponent implements OnInit {

    wallet: Wallet;
    isSaving: boolean;

    accounts: Accounts[];

    assets: Asset[];

    institutions: Institution[];

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private walletService: WalletService,
        private accountsService: AccountsService,
        private assetService: AssetService,
        private institutionService: InstitutionService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.accountsService.query()
            .subscribe((res: ResponseWrapper) => { this.accounts = res.json; }, (res: ResponseWrapper) => this.onError(res.json));
        this.assetService.query()
            .subscribe((res: ResponseWrapper) => { this.assets = res.json; }, (res: ResponseWrapper) => this.onError(res.json));
        this.institutionService.query()
            .subscribe((res: ResponseWrapper) => { this.institutions = res.json; }, (res: ResponseWrapper) => this.onError(res.json));
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.wallet.id !== undefined) {
            this.subscribeToSaveResponse(
                this.walletService.update(this.wallet));
        } else {
            this.subscribeToSaveResponse(
                this.walletService.create(this.wallet));
        }
    }

    private subscribeToSaveResponse(result: Observable<Wallet>) {
        result.subscribe((res: Wallet) =>
            this.onSaveSuccess(res), (res: Response) => this.onSaveError());
    }

    private onSaveSuccess(result: Wallet) {
        this.eventManager.broadcast({ name: 'walletListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(error: any) {
        this.jhiAlertService.error(error.message, null, null);
    }

    trackAccountsById(index: number, item: Accounts) {
        return item.id;
    }

    trackAssetById(index: number, item: Asset) {
        return item.id;
    }

    trackInstitutionById(index: number, item: Institution) {
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
    selector: 'jhi-wallet-popup',
    template: ''
})
export class WalletPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private walletPopupService: WalletPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.walletPopupService
                    .open(WalletDialogComponent as Component, params['id']);
            } else {
                this.walletPopupService
                    .open(WalletDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
