import { Timestamp, GeoPoint } from 'firebase/firestore';

/**
 * the result of dayjs().format()
 *
 * ex: 2022-03-11T17:08:58-04:00
 */
type DayJSFormat = string;

export type Scalars<T = any> = {
  String: string;
  Number: number;
  Boolean: boolean;
  Map: T[];
  Array: Array<T>;
  Timestamp: Timestamp;
  Geopoint: GeoPoint;
  /**
   * Document path
   */
  Reference: string;
};

export type DocumentUUID = Scalars['String'];

export type Currency = Scalars['Number'];

export type UserInput = {
  displayName: Scalars['String'];
  email: Scalars['String'];
  photoURL: Scalars['String'];
};

export type User = UserInput & {
  uid: DocumentUUID;
  createdAt: DayJSFormat;
  updatedAt: DayJSFormat;

  // displayName: Scalars['String'];
  // email: Scalars['String'];
  // photoURL: Scalars['String'];
  totalSpent: Currency;
};

export type MaybeUser = User | null;

export type ListInput = {
  name: Scalars['String'];
};

export type List = ListInput & {
  uid: DocumentUUID;
  createdAt: DayJSFormat;
  updatedAt: DayJSFormat;

  userId: DocumentUUID;

  itemsCount: Scalars['Number'];
  totalValue: Currency;
};

export type MaybeList = List | null;

export type ItemInput = {
  name: Scalars['String'];
  quantity: Scalars['Number'];
  value: Currency;
};

export type Item = ItemInput & {
  uid: DocumentUUID;
  createdAt: Scalars['String'];
  updatedAt: Scalars['String'];

  userId: DocumentUUID;
  listId: DocumentUUID;
};

export type MaybeItem = Item | null;
