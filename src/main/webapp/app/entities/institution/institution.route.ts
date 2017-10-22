import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { JhiPaginationUtil } from 'ng-jhipster';

import { InstitutionComponent } from './institution.component';
import { InstitutionDetailComponent } from './institution-detail.component';
import { InstitutionPopupComponent } from './institution-dialog.component';
import { InstitutionDeletePopupComponent } from './institution-delete-dialog.component';

export const institutionRoute: Routes = [
    {
        path: 'institution',
        component: InstitutionComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'nereusApp.institution.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'institution/:id',
        component: InstitutionDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'nereusApp.institution.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const institutionPopupRoute: Routes = [
    {
        path: 'institution-new',
        component: InstitutionPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'nereusApp.institution.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'institution/:id/edit',
        component: InstitutionPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'nereusApp.institution.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'institution/:id/delete',
        component: InstitutionDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'nereusApp.institution.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
