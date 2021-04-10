import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { PortalTestModule } from '../../../test.module';
import { CidadaoDetailComponent } from 'app/entities/cidadao/cidadao-detail.component';
import { Cidadao } from 'app/shared/model/cidadao.model';

describe('Component Tests', () => {
  describe('Cidadao Management Detail Component', () => {
    let comp: CidadaoDetailComponent;
    let fixture: ComponentFixture<CidadaoDetailComponent>;
    const route = ({ data: of({ cidadao: new Cidadao(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [PortalTestModule],
        declarations: [CidadaoDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }],
      })
        .overrideTemplate(CidadaoDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(CidadaoDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load cidadao on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.cidadao).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
