import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: 'cidadao',
        loadChildren: () => import('./cidadao/cidadao.module').then(m => m.PortalCidadaoModule),
      },
      {
        path: 'telefone',
        loadChildren: () => import('./telefone/telefone.module').then(m => m.PortalTelefoneModule),
      },
      {
        path: 'endereco',
        loadChildren: () => import('./endereco/endereco.module').then(m => m.PortalEnderecoModule),
      },
      /* jhipster-needle-add-entity-route - JHipster will add entity modules routes here */
    ]),
  ],
})
export class PortalEntityModule {}
