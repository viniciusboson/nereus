import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Rx';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { Accounts } from './accounts.model';
import { AccountsPopupService } from './accounts-popup.service';
import { AccountsService } from './accounts.service';

@Component({
    selector: 'jhi-accounts-dialog',
    templateUrl: './accounts-dialog.component.html'
})
export class AccountsDialogComponent implements OnInit {

    accounts: Accounts;
    isSaving: boolean;

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private accountsService: AccountsService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.accounts.id !== undefined) {
            this.subscribeToSaveResponse(
                this.accountsService.update(this.accounts));
        } else {
            this.subscribeToSaveResponse(
                this.accountsService.create(this.accounts));
        }
    }

    private subscribeToSaveResponse(result: Observable<Accounts>) {
        result.subscribe((res: Accounts) =>
            this.onSaveSuccess(res), (res: Response) => this.onSaveError());
    }

    private onSaveSuccess(result: Accounts) {
        this.eventManager.broadcast({ name: 'accountsListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(error: any) {
        this.jhiAlertService.error(error.message, null, null);
    }
}

@Component({
    selector: 'jhi-accounts-popup',
    template: ''
})
export class AccountsPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private accountsPopupService: AccountsPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.accountsPopupService
                    .open(AccountsDialogComponent as Component, params['id']);
            } else {
                this.accountsPopupService
                    .open(AccountsDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
