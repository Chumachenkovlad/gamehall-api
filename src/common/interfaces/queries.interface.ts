export abstract class BasePaginationQuery {
  readonly limit: string;
  readonly offset: string;
}

export interface QueryObject {
  [key: string]: string | QueryObject;
}
