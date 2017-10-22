import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { JhiEventManager } from 'ng-jhipster';

import { Wallet } from './wallet.model';
import { WalletService } from './wallet.service';

@Component({
    selector: 'jhi-wallet-detail',
    templateUrl: './wallet-detail.component.html'
})
export class WalletDetailComponent implements OnInit, OnDestroy {

    wallet: Wallet;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private walletService: WalletService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInWallets();
    }

    load(id) {
        this.walletService.find(id).subscribe((wallet) => {
            this.wallet = wallet;
        });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInWallets() {
        this.eventSubscriber = this.eventManager.subscribe(
            'walletListModification',
            (response) => this.load(this.wallet.id)
        );
    }
}
