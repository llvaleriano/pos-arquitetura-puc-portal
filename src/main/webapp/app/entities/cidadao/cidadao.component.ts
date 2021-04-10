import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpHeaders, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiParseLinks } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { ICidadao } from 'app/shared/model/cidadao.model';

import { ITEMS_PER_PAGE } from 'app/shared/constants/pagination.constants';
import { CidadaoService } from './cidadao.service';
import { CidadaoDeleteDialogComponent } from './cidadao-delete-dialog.component';

@Component({
  selector: 'jhi-cidadao',
  templateUrl: './cidadao.component.html',
})
export class CidadaoComponent implements OnInit, OnDestroy {
  cidadaos: ICidadao[];
  eventSubscriber?: Subscription;
  itemsPerPage: number;
  links: any;
  page: number;
  predicate: string;
  ascending: boolean;

  constructor(
    protected cidadaoService: CidadaoService,
    protected eventManager: JhiEventManager,
    protected modalService: NgbModal,
    protected parseLinks: JhiParseLinks
  ) {
    this.cidadaos = [];
    this.itemsPerPage = ITEMS_PER_PAGE;
    this.page = 0;
    this.links = {
      last: 0,
    };
    this.predicate = 'id';
    this.ascending = true;
  }

  loadAll(): void {
    this.cidadaoService
      .query({
        page: this.page,
        size: this.itemsPerPage,
        sort: this.sort(),
      })
      .subscribe((res: HttpResponse<ICidadao[]>) => this.paginateCidadaos(res.body, res.headers));
  }

  reset(): void {
    this.page = 0;
    this.cidadaos = [];
    this.loadAll();
  }

  loadPage(page: number): void {
    this.page = page;
    this.loadAll();
  }

  ngOnInit(): void {
    this.loadAll();
    this.registerChangeInCidadaos();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: ICidadao): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  registerChangeInCidadaos(): void {
    this.eventSubscriber = this.eventManager.subscribe('cidadaoListModification', () => this.reset());
  }

  delete(cidadao: ICidadao): void {
    const modalRef = this.modalService.open(CidadaoDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.cidadao = cidadao;
  }

  sort(): string[] {
    const result = [this.predicate + ',' + (this.ascending ? 'asc' : 'desc')];
    if (this.predicate !== 'id') {
      result.push('id');
    }
    return result;
  }

  protected paginateCidadaos(data: ICidadao[] | null, headers: HttpHeaders): void {
    const headersLink = headers.get('link');
    this.links = this.parseLinks.parse(headersLink ? headersLink : '');
    if (data) {
      for (let i = 0; i < data.length; i++) {
        this.cidadaos.push(data[i]);
      }
    }
  }
}
