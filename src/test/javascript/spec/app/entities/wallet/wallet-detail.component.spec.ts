/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { DatePipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { JhiDateUtils, JhiDataUtils, JhiEventManager } from 'ng-jhipster';
import { NereusTestModule } from '../../../test.module';
import { MockActivatedRoute } from '../../../helpers/mock-route.service';
import { WalletDetailComponent } from '../../../../../../main/webapp/app/entities/wallet/wallet-detail.component';
import { WalletService } from '../../../../../../main/webapp/app/entities/wallet/wallet.service';
import { Wallet } from '../../../../../../main/webapp/app/entities/wallet/wallet.model';

describe('Component Tests', () => {

    describe('Wallet Management Detail Component', () => {
        let comp: WalletDetailComponent;
        let fixture: ComponentFixture<WalletDetailComponent>;
        let service: WalletService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [NereusTestModule],
                declarations: [WalletDetailComponent],
                providers: [
                    JhiDateUtils,
                    JhiDataUtils,
                    DatePipe,
                    {
                        provide: ActivatedRoute,
                        useValue: new MockActivatedRoute({id: 123})
                    },
                    WalletService,
                    JhiEventManager
                ]
            }).overrideTemplate(WalletDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(WalletDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(WalletService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
            // GIVEN

            spyOn(service, 'find').and.returnValue(Observable.of(new Wallet(10)));

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.find).toHaveBeenCalledWith(123);
            expect(comp.wallet).toEqual(jasmine.objectContaining({id: 10}));
            });
        });
    });

});
