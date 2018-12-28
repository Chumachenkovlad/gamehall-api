import { BasePaginationQuery } from '../../common/interfaces/queries.interface';

export class CardsQuery extends BasePaginationQuery {
  'filter[id]': string;
  'filter[name]': string;
  'filter[categoryId]': string;
}
