import { BasePaginationQuery } from 'common/interfaces/queries.interface';

export class CardsQuery implements BasePaginationQuery {
  offset: string;
  limit: string;
  'filter[id]': string;
  'filter[name]': string;
  'filter[category][id]': string;
}
