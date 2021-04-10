import { ICidadao } from 'app/shared/model/cidadao.model';

export interface ITelefone {
  id?: number;
  ddd?: string;
  numero?: string;
  cidadao?: ICidadao;
}

export class Telefone implements ITelefone {
  constructor(public id?: number, public ddd?: string, public numero?: string, public cidadao?: ICidadao) {}
}
