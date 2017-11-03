import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { Asset } from './asset.model';
import { AssetPopupService } from './asset-popup.service';
import { AssetService } from './asset.service';

@Component({
    selector: 'jhi-asset-delete-dialog',
    templateUrl: './asset-delete-dialog.component.html'
})
export class AssetDeleteDialogComponent {

    asset: Asset;

    constructor(
        private assetService: AssetService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.assetService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'assetListModification',
                content: 'Deleted an asset'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-asset-delete-popup',
    template: ''
})
export class AssetDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private assetPopupService: AssetPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.assetPopupService
                .open(AssetDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
