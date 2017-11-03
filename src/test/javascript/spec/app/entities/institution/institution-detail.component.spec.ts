/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { DatePipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { JhiDateUtils, JhiDataUtils, JhiEventManager } from 'ng-jhipster';
import { NereusTestModule } from '../../../test.module';
import { MockActivatedRoute } from '../../../helpers/mock-route.service';
import { InstitutionDetailComponent } from '../../../../../../main/webapp/app/entities/institution/institution-detail.component';
import { InstitutionService } from '../../../../../../main/webapp/app/entities/institution/institution.service';
import { Institution } from '../../../../../../main/webapp/app/entities/institution/institution.model';

describe('Component Tests', () => {

    describe('Institution Management Detail Component', () => {
        let comp: InstitutionDetailComponent;
        let fixture: ComponentFixture<InstitutionDetailComponent>;
        let service: InstitutionService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [NereusTestModule],
                declarations: [InstitutionDetailComponent],
                providers: [
                    JhiDateUtils,
                    JhiDataUtils,
                    DatePipe,
                    {
                        provide: ActivatedRoute,
                        useValue: new MockActivatedRoute({id: 123})
                    },
                    InstitutionService,
                    JhiEventManager
                ]
            }).overrideTemplate(InstitutionDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(InstitutionDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(InstitutionService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
            // GIVEN

            spyOn(service, 'find').and.returnValue(Observable.of(new Institution(10)));

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.find).toHaveBeenCalledWith(123);
            expect(comp.institution).toEqual(jasmine.objectContaining({id: 10}));
            });
        });
    });

});
