import { UF } from 'app/shared/model/enumerations/uf.model';

export interface IEndereco {
  id?: number;
  logradouro?: string;
  complemento?: string;
  bairro?: string;
  cidade?: string;
  estado?: UF;
  cep?: string;
}

export class Endereco implements IEndereco {
  constructor(
    public id?: number,
    public logradouro?: string,
    public complemento?: string,
    public bairro?: string,
    public cidade?: string,
    public estado?: UF,
    public cep?: string
  ) {}
}
