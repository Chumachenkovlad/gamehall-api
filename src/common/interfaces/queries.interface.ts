export abstract class BasePaginationQuery {
  readonly limit: string;
  readonly offset: string;
}

export abstract class BaseFilterQuery<T> {
  readonly filter: T;
}

type Sort = 'ASC' | 'DESC';

export interface BaseSortQuery<T> {
  sort: { [P in keyof T]: Sort };
}
