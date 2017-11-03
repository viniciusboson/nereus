import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { JhiPaginationUtil } from 'ng-jhipster';

import { PositionMetricComponent } from './position-metric.component';
import { PositionMetricDetailComponent } from './position-metric-detail.component';
import { PositionMetricPopupComponent } from './position-metric-dialog.component';
import { PositionMetricDeletePopupComponent } from './position-metric-delete-dialog.component';

export const positionMetricRoute: Routes = [
    {
        path: 'position-metric',
        component: PositionMetricComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'PositionMetrics'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'position-metric/:id',
        component: PositionMetricDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'PositionMetrics'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const positionMetricPopupRoute: Routes = [
    {
        path: 'position-metric-new',
        component: PositionMetricPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'PositionMetrics'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'position-metric/:id/edit',
        component: PositionMetricPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'PositionMetrics'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'position-metric/:id/delete',
        component: PositionMetricDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'PositionMetrics'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
