export type CrudQuery<T> = {
  where?: InputMaybe<WhereInput<T>>;
  joins?: string[];
  select?: {
    only?: string[];
    except?: string[];
  };
  orderBy?: Array<{ [K in keyof T]: 'asc' | 'desc' }>;
  page?: number;
  pageSize?: number;
};

export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type WhereInput<T> = {
  AND?: InputMaybe<Array<T>>;
  OR?: InputMaybe<Array<T>>;
  // NOT?: InputMaybe<Array<T>>;
};

export type SortOrder = 'asc' | 'desc';

export type StringFilter = {
  contains?: InputMaybe<string>;
  endsWith?: InputMaybe<string>;
  equals?: InputMaybe<string>;
  gt?: InputMaybe<string>;
  gte?: InputMaybe<string>;
  in?: InputMaybe<Array<string>>;
  lt?: InputMaybe<string>;
  lte?: InputMaybe<string>;
  not?: InputMaybe<NestedStringFilter>;
  notIn?: InputMaybe<Array<string>>;
  startsWith?: InputMaybe<string>;
};

export type NestedIntNullableFilter = {
  equals?: InputMaybe<number>;
  gt?: InputMaybe<number>;
  gte?: InputMaybe<number>;
  in?: InputMaybe<Array<number>>;
  lt?: InputMaybe<number>;
  lte?: InputMaybe<number>;
  not?: InputMaybe<NestedIntNullableFilter>;
  notIn?: InputMaybe<Array<number>>;
};

export type NestedStringFilter = {
  contains?: InputMaybe<string>;
  endsWith?: InputMaybe<string>;
  equals?: InputMaybe<string>;
  gt?: InputMaybe<string>;
  gte?: InputMaybe<string>;
  in?: InputMaybe<Array<string>>;
  lt?: InputMaybe<string>;
  lte?: InputMaybe<string>;
  not?: InputMaybe<NestedStringFilter>;
  notIn?: InputMaybe<Array<string>>;
  startsWith?: InputMaybe<string>;
};

export type ConvertToOptional<T> = {
  [P in keyof Partial<T>]: Pick<T, P> extends Partial<Pick<T, P>> ? T[P] : T[P] | undefined;
};

export type DTOFilter<T> = {
  [K in keyof T]?: T[K] extends string | undefined ? StringFilter : T[K];
  //(T[K] extends string ? StringFilter : T[K]);
};

export type CrudMode = 'add' | 'edit' | 'view' | 'verify';
