import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { DatePipe } from '@angular/common';
import { Accounts } from './accounts.model';
import { AccountsService } from './accounts.service';

@Injectable()
export class AccountsPopupService {
    private ngbModalRef: NgbModalRef;

    constructor(
        private datePipe: DatePipe,
        private modalService: NgbModal,
        private router: Router,
        private accountsService: AccountsService

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
                this.accountsService.find(id).subscribe((accounts) => {
                    accounts.createdAt = this.datePipe
                        .transform(accounts.createdAt, 'yyyy-MM-ddTHH:mm:ss');
                    accounts.updatedAt = this.datePipe
                        .transform(accounts.updatedAt, 'yyyy-MM-ddTHH:mm:ss');
                    this.ngbModalRef = this.accountsModalRef(component, accounts);
                    resolve(this.ngbModalRef);
                });
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    this.ngbModalRef = this.accountsModalRef(component, new Accounts());
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    accountsModalRef(component: Component, accounts: Accounts): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.accounts = accounts;
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
