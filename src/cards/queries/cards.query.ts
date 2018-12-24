import { BasePaginationQuery } from 'common';

export class CardsQuery extends BasePaginationQuery {
  'filter[id]': string;
  'filter[name]': string;
  'filter[categoryId]': string;
}
