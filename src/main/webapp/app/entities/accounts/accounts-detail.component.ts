import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { JhiEventManager } from 'ng-jhipster';

import { Accounts } from './accounts.model';
import { AccountsService } from './accounts.service';

@Component({
    selector: 'jhi-accounts-detail',
    templateUrl: './accounts-detail.component.html'
})
export class AccountsDetailComponent implements OnInit, OnDestroy {

    accounts: Accounts;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private accountsService: AccountsService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInAccounts();
    }

    load(id) {
        this.accountsService.find(id).subscribe((accounts) => {
            this.accounts = accounts;
        });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInAccounts() {
        this.eventSubscriber = this.eventManager.subscribe(
            'accountsListModification',
            (response) => this.load(this.accounts.id)
        );
    }
}
