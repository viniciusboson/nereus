/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { DatePipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { JhiDateUtils, JhiDataUtils, JhiEventManager } from 'ng-jhipster';
import { NereusTestModule } from '../../../test.module';
import { MockActivatedRoute } from '../../../helpers/mock-route.service';
import { AccountsDetailComponent } from '../../../../../../main/webapp/app/entities/accounts/accounts-detail.component';
import { AccountsService } from '../../../../../../main/webapp/app/entities/accounts/accounts.service';
import { Accounts } from '../../../../../../main/webapp/app/entities/accounts/accounts.model';

describe('Component Tests', () => {

    describe('Accounts Management Detail Component', () => {
        let comp: AccountsDetailComponent;
        let fixture: ComponentFixture<AccountsDetailComponent>;
        let service: AccountsService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [NereusTestModule],
                declarations: [AccountsDetailComponent],
                providers: [
                    JhiDateUtils,
                    JhiDataUtils,
                    DatePipe,
                    {
                        provide: ActivatedRoute,
                        useValue: new MockActivatedRoute({id: 123})
                    },
                    AccountsService,
                    JhiEventManager
                ]
            }).overrideTemplate(AccountsDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(AccountsDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(AccountsService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
            // GIVEN

            spyOn(service, 'find').and.returnValue(Observable.of(new Accounts(10)));

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.find).toHaveBeenCalledWith(123);
            expect(comp.accounts).toEqual(jasmine.objectContaining({id: 10}));
            });
        });
    });

});
