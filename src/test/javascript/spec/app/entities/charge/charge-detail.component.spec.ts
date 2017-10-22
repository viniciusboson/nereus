/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { DatePipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { JhiDateUtils, JhiDataUtils, JhiEventManager } from 'ng-jhipster';
import { NereusTestModule } from '../../../test.module';
import { MockActivatedRoute } from '../../../helpers/mock-route.service';
import { ChargeDetailComponent } from '../../../../../../main/webapp/app/entities/charge/charge-detail.component';
import { ChargeService } from '../../../../../../main/webapp/app/entities/charge/charge.service';
import { Charge } from '../../../../../../main/webapp/app/entities/charge/charge.model';

describe('Component Tests', () => {

    describe('Charge Management Detail Component', () => {
        let comp: ChargeDetailComponent;
        let fixture: ComponentFixture<ChargeDetailComponent>;
        let service: ChargeService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [NereusTestModule],
                declarations: [ChargeDetailComponent],
                providers: [
                    JhiDateUtils,
                    JhiDataUtils,
                    DatePipe,
                    {
                        provide: ActivatedRoute,
                        useValue: new MockActivatedRoute({id: 123})
                    },
                    ChargeService,
                    JhiEventManager
                ]
            }).overrideTemplate(ChargeDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(ChargeDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ChargeService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
            // GIVEN

            spyOn(service, 'find').and.returnValue(Observable.of(new Charge(10)));

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.find).toHaveBeenCalledWith(123);
            expect(comp.charge).toEqual(jasmine.objectContaining({id: 10}));
            });
        });
    });

});
