import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import * as moment from 'moment';

import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { ICidadao } from 'app/shared/model/cidadao.model';

type EntityResponseType = HttpResponse<ICidadao>;
type EntityArrayResponseType = HttpResponse<ICidadao[]>;

@Injectable({ providedIn: 'root' })
export class CidadaoService {
  public resourceUrl = SERVER_API_URL + 'services/cidadao/api/cidadaos';
  public searchUrl = SERVER_API_URL + 'services/cidadao/api/_search/cidadaos';

  constructor(protected http: HttpClient) {}

  create(cidadao: ICidadao): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(cidadao);
    return this.http
      .post<ICidadao>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  update(cidadao: ICidadao): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(cidadao);
    return this.http
      .put<ICidadao>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<ICidadao>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<ICidadao[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  search(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<ICidadao[]>(this.searchUrl, { params: options, observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  protected convertDateFromClient(cidadao: ICidadao): ICidadao {
    const copy: ICidadao = Object.assign({}, cidadao, {
      nascimento: cidadao.nascimento && cidadao.nascimento.isValid() ? cidadao.nascimento.format(DATE_FORMAT) : undefined,
    });
    return copy;
  }

  protected convertDateFromServer(res: EntityResponseType): EntityResponseType {
    if (res.body) {
      res.body.nascimento = res.body.nascimento ? moment(res.body.nascimento) : undefined;
    }
    return res;
  }

  protected convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
    if (res.body) {
      res.body.forEach((cidadao: ICidadao) => {
        cidadao.nascimento = cidadao.nascimento ? moment(cidadao.nascimento) : undefined;
      });
    }
    return res;
  }
}
