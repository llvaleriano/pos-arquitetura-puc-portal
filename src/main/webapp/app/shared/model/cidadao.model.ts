import { Moment } from 'moment';
import { IEndereco } from 'app/shared/model/endereco.model';
import { ITelefone } from 'app/shared/model/telefone.model';
import { Sexo } from 'app/shared/model/enumerations/sexo.model';

export interface ICidadao {
  id?: number;
  nome?: string;
  sexo?: Sexo;
  email?: string;
  nascimento?: Moment;
  endereco?: IEndereco;
  telefones?: ITelefone[];
}

export class Cidadao implements ICidadao {
  constructor(
    public id?: number,
    public nome?: string,
    public sexo?: Sexo,
    public email?: string,
    public nascimento?: Moment,
    public endereco?: IEndereco,
    public telefones?: ITelefone[]
  ) {}
}
