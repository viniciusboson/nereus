import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { Accounts } from './accounts.model';
import { AccountsPopupService } from './accounts-popup.service';
import { AccountsService } from './accounts.service';

@Component({
    selector: 'jhi-accounts-delete-dialog',
    templateUrl: './accounts-delete-dialog.component.html'
})
export class AccountsDeleteDialogComponent {

    accounts: Accounts;

    constructor(
        private accountsService: AccountsService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.accountsService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'accountsListModification',
                content: 'Deleted an accounts'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-accounts-delete-popup',
    template: ''
})
export class AccountsDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private accountsPopupService: AccountsPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.accountsPopupService
                .open(AccountsDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
