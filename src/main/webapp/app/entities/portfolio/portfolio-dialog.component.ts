import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Rx';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { Portfolio } from './portfolio.model';
import { PortfolioPopupService } from './portfolio-popup.service';
import { PortfolioService } from './portfolio.service';

@Component({
    selector: 'jhi-portfolio-dialog',
    templateUrl: './portfolio-dialog.component.html'
})
export class PortfolioDialogComponent implements OnInit {

    portfolio: Portfolio;
    isSaving: boolean;

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private portfolioService: PortfolioService,
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
        if (this.portfolio.id !== undefined) {
            this.subscribeToSaveResponse(
                this.portfolioService.update(this.portfolio));
        } else {
            this.subscribeToSaveResponse(
                this.portfolioService.create(this.portfolio));
        }
    }

    private subscribeToSaveResponse(result: Observable<Portfolio>) {
        result.subscribe((res: Portfolio) =>
            this.onSaveSuccess(res), (res: Response) => this.onSaveError());
    }

    private onSaveSuccess(result: Portfolio) {
        this.eventManager.broadcast({ name: 'portfolioListModification', content: 'OK'});
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
    selector: 'jhi-portfolio-popup',
    template: ''
})
export class PortfolioPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private portfolioPopupService: PortfolioPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.portfolioPopupService
                    .open(PortfolioDialogComponent as Component, params['id']);
            } else {
                this.portfolioPopupService
                    .open(PortfolioDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
