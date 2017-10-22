import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { DatePipe } from '@angular/common';
import { Transaction } from './transaction.model';
import { TransactionService } from './transaction.service';

@Injectable()
export class TransactionPopupService {
    private ngbModalRef: NgbModalRef;

    constructor(
        private datePipe: DatePipe,
        private modalService: NgbModal,
        private router: Router,
        private transactionService: TransactionService

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
                this.transactionService.find(id).subscribe((transaction) => {
                    transaction.createdAt = this.datePipe
                        .transform(transaction.createdAt, 'yyyy-MM-ddTHH:mm:ss');
                    transaction.updatedAt = this.datePipe
                        .transform(transaction.updatedAt, 'yyyy-MM-ddTHH:mm:ss');
                    this.ngbModalRef = this.transactionModalRef(component, transaction);
                    resolve(this.ngbModalRef);
                });
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    this.ngbModalRef = this.transactionModalRef(component, new Transaction());
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    transactionModalRef(component: Component, transaction: Transaction): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.transaction = transaction;
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
