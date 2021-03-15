import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ICidadao } from 'app/shared/model/cidadao.model';

@Component({
  selector: 'jhi-cidadao-detail',
  templateUrl: './cidadao-detail.component.html',
})
export class CidadaoDetailComponent implements OnInit {
  cidadao: ICidadao | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ cidadao }) => (this.cidadao = cidadao));
  }

  previousState(): void {
    window.history.back();
  }
}
