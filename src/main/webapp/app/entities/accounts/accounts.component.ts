import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { JhiEventManager, JhiParseLinks, JhiAlertService } from 'ng-jhipster';

import { Accounts } from './accounts.model';
import { AccountsService } from './accounts.service';
import { ITEMS_PER_PAGE, Principal, ResponseWrapper } from '../../shared';

@Component({
    selector: 'jhi-accounts',
    templateUrl: './accounts.component.html'
})
export class AccountsComponent implements OnInit, OnDestroy {
accounts: Accounts[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private accountsService: AccountsService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {
    }

    loadAll() {
        this.accountsService.query().subscribe(
            (res: ResponseWrapper) => {
                this.accounts = res.json;
            },
            (res: ResponseWrapper) => this.onError(res.json)
        );
    }
    ngOnInit() {
        this.loadAll();
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });
        this.registerChangeInAccounts();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: Accounts) {
        return item.id;
    }
    registerChangeInAccounts() {
        this.eventSubscriber = this.eventManager.subscribe('accountsListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }
}
