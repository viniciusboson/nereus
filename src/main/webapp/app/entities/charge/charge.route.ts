import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { JhiPaginationUtil } from 'ng-jhipster';

import { ChargeComponent } from './charge.component';
import { ChargeDetailComponent } from './charge-detail.component';
import { ChargePopupComponent } from './charge-dialog.component';
import { ChargeDeletePopupComponent } from './charge-delete-dialog.component';

export const chargeRoute: Routes = [
    {
        path: 'charge',
        component: ChargeComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Charges'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'charge/:id',
        component: ChargeDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Charges'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const chargePopupRoute: Routes = [
    {
        path: 'charge-new',
        component: ChargePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Charges'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'charge/:id/edit',
        component: ChargePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Charges'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'charge/:id/delete',
        component: ChargeDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Charges'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
