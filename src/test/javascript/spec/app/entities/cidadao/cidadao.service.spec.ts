import { TestBed, getTestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import * as moment from 'moment';
import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { CidadaoService } from 'app/entities/cidadao/cidadao.service';
import { ICidadao, Cidadao } from 'app/shared/model/cidadao.model';
import { Sexo } from 'app/shared/model/enumerations/sexo.model';

describe('Service Tests', () => {
  describe('Cidadao Service', () => {
    let injector: TestBed;
    let service: CidadaoService;
    let httpMock: HttpTestingController;
    let elemDefault: ICidadao;
    let expectedResult: ICidadao | ICidadao[] | boolean | null;
    let currentDate: moment.Moment;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
      });
      expectedResult = null;
      injector = getTestBed();
      service = injector.get(CidadaoService);
      httpMock = injector.get(HttpTestingController);
      currentDate = moment();

      elemDefault = new Cidadao(0, 'AAAAAAA', Sexo.MASCULINO, 'AAAAAAA', currentDate);
    });

    describe('Service methods', () => {
      it('should find an element', () => {
        const returnedFromService = Object.assign(
          {
            nascimento: currentDate.format(DATE_FORMAT),
          },
          elemDefault
        );

        service.find(123).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'GET' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(elemDefault);
      });

      it('should create a Cidadao', () => {
        const returnedFromService = Object.assign(
          {
            id: 0,
            nascimento: currentDate.format(DATE_FORMAT),
          },
          elemDefault
        );

        const expected = Object.assign(
          {
            nascimento: currentDate,
          },
          returnedFromService
        );

        service.create(new Cidadao()).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'POST' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should update a Cidadao', () => {
        const returnedFromService = Object.assign(
          {
            nome: 'BBBBBB',
            sexo: 'BBBBBB',
            email: 'BBBBBB',
            nascimento: currentDate.format(DATE_FORMAT),
          },
          elemDefault
        );

        const expected = Object.assign(
          {
            nascimento: currentDate,
          },
          returnedFromService
        );

        service.update(expected).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'PUT' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should return a list of Cidadao', () => {
        const returnedFromService = Object.assign(
          {
            nome: 'BBBBBB',
            sexo: 'BBBBBB',
            email: 'BBBBBB',
            nascimento: currentDate.format(DATE_FORMAT),
          },
          elemDefault
        );

        const expected = Object.assign(
          {
            nascimento: currentDate,
          },
          returnedFromService
        );

        service.query().subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'GET' });
        req.flush([returnedFromService]);
        httpMock.verify();
        expect(expectedResult).toContainEqual(expected);
      });

      it('should delete a Cidadao', () => {
        service.delete(123).subscribe(resp => (expectedResult = resp.ok));

        const req = httpMock.expectOne({ method: 'DELETE' });
        req.flush({ status: 200 });
        expect(expectedResult);
      });
    });

    afterEach(() => {
      httpMock.verify();
    });
  });
});
