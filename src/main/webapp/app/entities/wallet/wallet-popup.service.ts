import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { DatePipe } from '@angular/common';
import { Wallet } from './wallet.model';
import { WalletService } from './wallet.service';

@Injectable()
export class WalletPopupService {
    private ngbModalRef: NgbModalRef;

    constructor(
        private datePipe: DatePipe,
        private modalService: NgbModal,
        private router: Router,
        private walletService: WalletService

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
                this.walletService.find(id).subscribe((wallet) => {
                    wallet.createdAt = this.datePipe
                        .transform(wallet.createdAt, 'yyyy-MM-ddTHH:mm:ss');
                    wallet.updatedAt = this.datePipe
                        .transform(wallet.updatedAt, 'yyyy-MM-ddTHH:mm:ss');
                    this.ngbModalRef = this.walletModalRef(component, wallet);
                    resolve(this.ngbModalRef);
                });
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    this.ngbModalRef = this.walletModalRef(component, new Wallet());
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    walletModalRef(component: Component, wallet: Wallet): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.wallet = wallet;
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
