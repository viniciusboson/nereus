import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Rx';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { Institution } from './institution.model';
import { InstitutionPopupService } from './institution-popup.service';
import { InstitutionService } from './institution.service';

@Component({
    selector: 'jhi-institution-dialog',
    templateUrl: './institution-dialog.component.html'
})
export class InstitutionDialogComponent implements OnInit {

    institution: Institution;
    isSaving: boolean;

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private institutionService: InstitutionService,
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
        if (this.institution.id !== undefined) {
            this.subscribeToSaveResponse(
                this.institutionService.update(this.institution));
        } else {
            this.subscribeToSaveResponse(
                this.institutionService.create(this.institution));
        }
    }

    private subscribeToSaveResponse(result: Observable<Institution>) {
        result.subscribe((res: Institution) =>
            this.onSaveSuccess(res), (res: Response) => this.onSaveError());
    }

    private onSaveSuccess(result: Institution) {
        this.eventManager.broadcast({ name: 'institutionListModification', content: 'OK'});
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
    selector: 'jhi-institution-popup',
    template: ''
})
export class InstitutionPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private institutionPopupService: InstitutionPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.institutionPopupService
                    .open(InstitutionDialogComponent as Component, params['id']);
            } else {
                this.institutionPopupService
                    .open(InstitutionDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
