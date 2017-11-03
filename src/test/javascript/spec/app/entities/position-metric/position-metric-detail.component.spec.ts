/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { DatePipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { JhiDateUtils, JhiDataUtils, JhiEventManager } from 'ng-jhipster';
import { NereusTestModule } from '../../../test.module';
import { MockActivatedRoute } from '../../../helpers/mock-route.service';
import { PositionMetricDetailComponent } from '../../../../../../main/webapp/app/entities/position-metric/position-metric-detail.component';
import { PositionMetricService } from '../../../../../../main/webapp/app/entities/position-metric/position-metric.service';
import { PositionMetric } from '../../../../../../main/webapp/app/entities/position-metric/position-metric.model';

describe('Component Tests', () => {

    describe('PositionMetric Management Detail Component', () => {
        let comp: PositionMetricDetailComponent;
        let fixture: ComponentFixture<PositionMetricDetailComponent>;
        let service: PositionMetricService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [NereusTestModule],
                declarations: [PositionMetricDetailComponent],
                providers: [
                    JhiDateUtils,
                    JhiDataUtils,
                    DatePipe,
                    {
                        provide: ActivatedRoute,
                        useValue: new MockActivatedRoute({id: 123})
                    },
                    PositionMetricService,
                    JhiEventManager
                ]
            }).overrideTemplate(PositionMetricDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(PositionMetricDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(PositionMetricService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
            // GIVEN

            spyOn(service, 'find').and.returnValue(Observable.of(new PositionMetric(10)));

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.find).toHaveBeenCalledWith(123);
            expect(comp.positionMetric).toEqual(jasmine.objectContaining({id: 10}));
            });
        });
    });

});
