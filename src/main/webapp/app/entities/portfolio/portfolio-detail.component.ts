import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { JhiEventManager } from 'ng-jhipster';

import { Portfolio } from './portfolio.model';
import { PortfolioService } from './portfolio.service';

@Component({
    selector: 'jhi-portfolio-detail',
    templateUrl: './portfolio-detail.component.html'
})
export class PortfolioDetailComponent implements OnInit, OnDestroy {

    portfolio: Portfolio;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private portfolioService: PortfolioService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInPortfolios();
    }

    load(id) {
        this.portfolioService.find(id).subscribe((portfolio) => {
            this.portfolio = portfolio;
        });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInPortfolios() {
        this.eventSubscriber = this.eventManager.subscribe(
            'portfolioListModification',
            (response) => this.load(this.portfolio.id)
        );
    }
}
