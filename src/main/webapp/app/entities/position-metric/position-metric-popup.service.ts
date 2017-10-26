import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { DatePipe } from '@angular/common';
import { PositionMetric } from './position-metric.model';
import { PositionMetricService } from './position-metric.service';

@Injectable()
export class PositionMetricPopupService {
    private ngbModalRef: NgbModalRef;

    constructor(
        private datePipe: DatePipe,
        private modalService: NgbModal,
        private router: Router,
        private positionMetricService: PositionMetricService

    ) {
        this.ngbModalRef = null;
    }

    open(component: Component, id?: number | any): Promise<NgbModalRef> {
        return new Promise<NgbModalRef>((resolve, reject) => {
            const isOpen = this.ngbModalRef !== null;
            if (isOpen) {
                resolve(this.ngbModalRef);
            }

            if (id) {
                this.positionMetricService.find(id).subscribe((positionMetric) => {
                    positionMetric.createdAt = this.datePipe
                        .transform(positionMetric.createdAt, 'yyyy-MM-ddTHH:mm:ss');
                    positionMetric.updatedAt = this.datePipe
                        .transform(positionMetric.updatedAt, 'yyyy-MM-ddTHH:mm:ss');
                    this.ngbModalRef = this.positionMetricModalRef(component, positionMetric);
                    resolve(this.ngbModalRef);
                });
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    this.ngbModalRef = this.positionMetricModalRef(component, new PositionMetric());
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    positionMetricModalRef(component: Component, positionMetric: PositionMetric): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.positionMetric = positionMetric;
        modalRef.result.then((result) => {
            this.router.navigate([{ outlets: { popup: null }}], { replaceUrl: true });
            this.ngbModalRef = null;
        }, (reason) => {
            this.router.navigate([{ outlets: { popup: null }}], { replaceUrl: true });
            this.ngbModalRef = null;
        });
        return modalRef;
    }
}
