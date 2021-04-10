import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { PortalTestModule } from '../../../test.module';
import { CidadaoUpdateComponent } from 'app/entities/cidadao/cidadao-update.component';
import { CidadaoService } from 'app/entities/cidadao/cidadao.service';
import { Cidadao } from 'app/shared/model/cidadao.model';

describe('Component Tests', () => {
  describe('Cidadao Management Update Component', () => {
    let comp: CidadaoUpdateComponent;
    let fixture: ComponentFixture<CidadaoUpdateComponent>;
    let service: CidadaoService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [PortalTestModule],
        declarations: [CidadaoUpdateComponent],
        providers: [FormBuilder],
      })
        .overrideTemplate(CidadaoUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(CidadaoUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(CidadaoService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new Cidadao(123);
        spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
        comp.updateForm(entity);
        // WHEN
        comp.save();
        tick(); // simulate async

        // THEN
        expect(service.update).toHaveBeenCalledWith(entity);
        expect(comp.isSaving).toEqual(false);
      }));

      it('Should call create service on save for new entity', fakeAsync(() => {
        // GIVEN
        const entity = new Cidadao();
        spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
        comp.updateForm(entity);
        // WHEN
        comp.save();
        tick(); // simulate async

        // THEN
        expect(service.create).toHaveBeenCalledWith(entity);
        expect(comp.isSaving).toEqual(false);
      }));
    });
  });
});
