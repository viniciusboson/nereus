import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { JhiPaginationUtil } from 'ng-jhipster';

import { AccountsComponent } from './accounts.component';
import { AccountsDetailComponent } from './accounts-detail.component';
import { AccountsPopupComponent } from './accounts-dialog.component';
import { AccountsDeletePopupComponent } from './accounts-delete-dialog.component';

export const accountsRoute: Routes = [
    {
        path: 'accounts',
        component: AccountsComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Accounts'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'accounts/:id',
        component: AccountsDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Accounts'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const accountsPopupRoute: Routes = [
    {
        path: 'accounts-new',
        component: AccountsPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Accounts'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'accounts/:id/edit',
        component: AccountsPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Accounts'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'accounts/:id/delete',
        component: AccountsDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Accounts'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
