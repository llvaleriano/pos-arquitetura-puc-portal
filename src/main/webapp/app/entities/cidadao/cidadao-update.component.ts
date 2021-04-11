import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { ICidadao, Cidadao } from 'app/shared/model/cidadao.model';
import { CidadaoService } from './cidadao.service';
import {Endereco, IEndereco} from 'app/shared/model/endereco.model';
import {Telefone, ITelefone} from 'app/shared/model/telefone.model';
import { EnderecoService } from 'app/entities/endereco/endereco.service';
import {logsRoute} from "../../admin/logs/logs.route";

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
    ddd: [],
    numeroTelefone: [],
    cep: [],
    logradouro: [],
    complemento: [],
    bairro: [],
    cidade: [],
    estado: []
  });

  constructor(
    protected cidadaoService: CidadaoService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ cidadao }) => {
      this.updateForm(cidadao);
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
    const endereco = {
      ...new Endereco(),
      cep: this.editForm.get(['cep'])!.value,
      logradouro: this.editForm.get(['logradouro'])!.value,
      complemento: this.editForm.get(['complemento'])!.value,
      bairro: this.editForm.get(['bairro'])!.value,
      cidade: this.editForm.get(['cidade'])!.value,
      estado: this.editForm.get(['estado'])!.value,
    };

    const telefone = {
      ...new Telefone(),
      ddd: this.editForm.get(['ddd'])!.value,
      numeroTelefone: this.editForm.get(['numeroTelefone'])!.value,
    };

    return {
      ...new Cidadao(),
      id: this.editForm.get(['id'])!.value,
      nome: this.editForm.get(['nome'])!.value,
      sexo: this.editForm.get(['sexo'])!.value,
      email: this.editForm.get(['email'])!.value,
      nascimento: this.editForm.get(['nascimento'])!.value,
      endereco,
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
