import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { Authority } from 'app/shared/constants/authority.constants';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { ICidadao, Cidadao } from 'app/shared/model/cidadao.model';
import { CidadaoService } from './cidadao.service';
import { CidadaoComponent } from './cidadao.component';
import { CidadaoDetailComponent } from './cidadao-detail.component';
import { CidadaoUpdateComponent } from './cidadao-update.component';

@Injectable({ providedIn: 'root' })
export class CidadaoResolve implements Resolve<ICidadao> {
  constructor(private service: CidadaoService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<ICidadao> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((cidadao: HttpResponse<Cidadao>) => {
          if (cidadao.body) {
            return of(cidadao.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new Cidadao());
  }
}

export const cidadaoRoute: Routes = [
  {
    path: '',
    component: CidadaoComponent,
    data: {
      authorities: [Authority.USER],
      pageTitle: 'Cidadaos',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: CidadaoDetailComponent,
    resolve: {
      cidadao: CidadaoResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'Cidadaos',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: CidadaoUpdateComponent,
    resolve: {
      cidadao: CidadaoResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'Cidadaos',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: CidadaoUpdateComponent,
    resolve: {
      cidadao: CidadaoResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'Cidadaos',
    },
    canActivate: [UserRouteAccessService],
  },
];
