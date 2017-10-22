import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { JhiPaginationUtil } from 'ng-jhipster';

import { WalletComponent } from './wallet.component';
import { WalletDetailComponent } from './wallet-detail.component';
import { WalletPopupComponent } from './wallet-dialog.component';
import { WalletDeletePopupComponent } from './wallet-delete-dialog.component';

export const walletRoute: Routes = [
    {
        path: 'wallet',
        component: WalletComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'nereusApp.wallet.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'wallet/:id',
        component: WalletDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'nereusApp.wallet.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const walletPopupRoute: Routes = [
    {
        path: 'wallet-new',
        component: WalletPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'nereusApp.wallet.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'wallet/:id/edit',
        component: WalletPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'nereusApp.wallet.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'wallet/:id/delete',
        component: WalletDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'nereusApp.wallet.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
