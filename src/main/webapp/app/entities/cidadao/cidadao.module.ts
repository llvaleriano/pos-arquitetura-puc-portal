import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { PortalSharedModule } from 'app/shared/shared.module';
import { CidadaoComponent } from './cidadao.component';
import { CidadaoDetailComponent } from './cidadao-detail.component';
import { CidadaoUpdateComponent } from './cidadao-update.component';
import { CidadaoDeleteDialogComponent } from './cidadao-delete-dialog.component';
import { cidadaoRoute } from './cidadao.route';

@NgModule({
  imports: [PortalSharedModule, RouterModule.forChild(cidadaoRoute)],
  declarations: [CidadaoComponent, CidadaoDetailComponent, CidadaoUpdateComponent, CidadaoDeleteDialogComponent],
  entryComponents: [CidadaoDeleteDialogComponent],
})
export class PortalCidadaoModule {}
