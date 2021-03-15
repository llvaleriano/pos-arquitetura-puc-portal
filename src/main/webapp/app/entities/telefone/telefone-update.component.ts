import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { ITelefone, Telefone } from 'app/shared/model/telefone.model';
import { TelefoneService } from './telefone.service';
import { ICidadao } from 'app/shared/model/cidadao.model';
import { CidadaoService } from 'app/entities/cidadao/cidadao.service';

@Component({
  selector: 'jhi-telefone-update',
  templateUrl: './telefone-update.component.html',
})
export class TelefoneUpdateComponent implements OnInit {
  isSaving = false;
  cidadaos: ICidadao[] = [];

  editForm = this.fb.group({
    id: [],
    ddd: [null, [Validators.required]],
    numero: [null, [Validators.required]],
    cidadao: [],
  });

  constructor(
    protected telefoneService: TelefoneService,
    protected cidadaoService: CidadaoService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ telefone }) => {
      this.updateForm(telefone);

      this.cidadaoService.query().subscribe((res: HttpResponse<ICidadao[]>) => (this.cidadaos = res.body || []));
    });
  }

  updateForm(telefone: ITelefone): void {
    this.editForm.patchValue({
      id: telefone.id,
      ddd: telefone.ddd,
      numero: telefone.numero,
      cidadao: telefone.cidadao,
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const telefone = this.createFromForm();
    if (telefone.id !== undefined) {
      this.subscribeToSaveResponse(this.telefoneService.update(telefone));
    } else {
      this.subscribeToSaveResponse(this.telefoneService.create(telefone));
    }
  }

  private createFromForm(): ITelefone {
    return {
      ...new Telefone(),
      id: this.editForm.get(['id'])!.value,
      ddd: this.editForm.get(['ddd'])!.value,
      numero: this.editForm.get(['numero'])!.value,
      cidadao: this.editForm.get(['cidadao'])!.value,
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ITelefone>>): void {
    result.subscribe(
      () => this.onSaveSuccess(),
      () => this.onSaveError()
    );
  }

  protected onSaveSuccess(): void {
    this.isSaving = false;
    this.previousState();
  }

  protected onSaveError(): void {
    this.isSaving = false;
  }

  trackById(index: number, item: ICidadao): any {
    return item.id;
  }
}
