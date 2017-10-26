import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { JhiEventManager } from 'ng-jhipster';

import { Institution } from './institution.model';
import { InstitutionService } from './institution.service';

@Component({
    selector: 'jhi-institution-detail',
    templateUrl: './institution-detail.component.html'
})
export class InstitutionDetailComponent implements OnInit, OnDestroy {

    institution: Institution;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private institutionService: InstitutionService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInInstitutions();
    }

    load(id) {
        this.institutionService.find(id).subscribe((institution) => {
            this.institution = institution;
        });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInInstitutions() {
        this.eventSubscriber = this.eventManager.subscribe(
            'institutionListModification',
            (response) => this.load(this.institution.id)
        );
    }
}
