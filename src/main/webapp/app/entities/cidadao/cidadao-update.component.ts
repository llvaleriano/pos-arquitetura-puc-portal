import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { ICidadao, Cidadao } from 'app/shared/model/cidadao.model';
import { CidadaoService } from './cidadao.service';
import { IEndereco } from 'app/shared/model/endereco.model';
import { EnderecoService } from 'app/entities/endereco/endereco.service';

@Component({
  selector: 'jhi-cidadao-update',
  templateUrl: './cidadao-update.component.html',
})
export class CidadaoUpdateComponent implements OnInit {
  isSaving = false;
  enderecos: IEndereco[] = [];
  nascimentoDp: any;

  editForm = this.fb.group({
    id: [],
    nome: [null, [Validators.required]],
    sexo: [],
    email: [null, [Validators.required]],
    nascimento: [],
    endereco: [],
  });

  constructor(
    protected cidadaoService: CidadaoService,
    protected enderecoService: EnderecoService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ cidadao }) => {
      this.updateForm(cidadao);

      this.enderecoService
        .query({ filter: 'cidadao-is-null' })
        .pipe(
          map((res: HttpResponse<IEndereco[]>) => {
            return res.body || [];
          })
        )
        .subscribe((resBody: IEndereco[]) => {
          if (!cidadao.endereco || !cidadao.endereco.id) {
            this.enderecos = resBody;
          } else {
            this.enderecoService
              .find(cidadao.endereco.id)
              .pipe(
                map((subRes: HttpResponse<IEndereco>) => {
                  return subRes.body ? [subRes.body].concat(resBody) : resBody;
                })
              )
              .subscribe((concatRes: IEndereco[]) => (this.enderecos = concatRes));
          }
        });
    });
  }

  updateForm(cidadao: ICidadao): void {
    this.editForm.patchValue({
      id: cidadao.id,
      nome: cidadao.nome,
      sexo: cidadao.sexo,
      email: cidadao.email,
      nascimento: cidadao.nascimento,
      endereco: cidadao.endereco,
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const cidadao = this.createFromForm();
    if (cidadao.id !== undefined) {
      this.subscribeToSaveResponse(this.cidadaoService.update(cidadao));
    } else {
      this.subscribeToSaveResponse(this.cidadaoService.create(cidadao));
    }
  }

  private createFromForm(): ICidadao {
    return {
      ...new Cidadao(),
      id: this.editForm.get(['id'])!.value,
      nome: this.editForm.get(['nome'])!.value,
      sexo: this.editForm.get(['sexo'])!.value,
      email: this.editForm.get(['email'])!.value,
      nascimento: this.editForm.get(['nascimento'])!.value,
      endereco: this.editForm.get(['endereco'])!.value,
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ICidadao>>): void {
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

  trackById(index: number, item: IEndereco): any {
    return item.id;
  }
}
