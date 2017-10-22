import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { JhiEventManager, JhiParseLinks, JhiAlertService } from 'ng-jhipster';

import { Institution } from './institution.model';
import { InstitutionService } from './institution.service';
import { ITEMS_PER_PAGE, Principal, ResponseWrapper } from '../../shared';

@Component({
    selector: 'jhi-institution',
    templateUrl: './institution.component.html'
})
export class InstitutionComponent implements OnInit, OnDestroy {
institutions: Institution[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private institutionService: InstitutionService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {
    }

    loadAll() {
        this.institutionService.query().subscribe(
            (res: ResponseWrapper) => {
                this.institutions = res.json;
            },
            (res: ResponseWrapper) => this.onError(res.json)
        );
    }
    ngOnInit() {
        this.loadAll();
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });
        this.registerChangeInInstitutions();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: Institution) {
        return item.id;
    }
    registerChangeInInstitutions() {
        this.eventSubscriber = this.eventManager.subscribe('institutionListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }
}
