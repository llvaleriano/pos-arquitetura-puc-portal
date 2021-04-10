import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { ICidadao } from 'app/shared/model/cidadao.model';
import { CidadaoService } from './cidadao.service';

@Component({
  templateUrl: './cidadao-delete-dialog.component.html',
})
export class CidadaoDeleteDialogComponent {
  cidadao?: ICidadao;

  constructor(protected cidadaoService: CidadaoService, public activeModal: NgbActiveModal, protected eventManager: JhiEventManager) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.cidadaoService.delete(id).subscribe(() => {
      this.eventManager.broadcast('cidadaoListModification');
      this.activeModal.close();
    });
  }
}
