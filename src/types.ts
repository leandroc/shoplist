export type DocumentUID = string;

export type Currency = number;

export type User = {
  uid: DocumentUID;
  createdAt: string;
  updatedAt: string;

  displayName: string;
  email: string;
  photoURL: string;
  totalSpent: Currency;
};

export type MaybeUser = User | null;

export type List = {
  uid: DocumentUID;
  createdAt: string;
  updatedAt: string;

  userId: DocumentUID;

  name: string;
  itemsCount: number;
  totalValue: Currency;
};

export type MaybeList = List | null;

export type Item = {
  uid: string;
  createdAt: string;
  updatedAt: string;

  userId: DocumentUID;
  listId: DocumentUID;

  name: string;
  quantity: number;
  value: Currency;
};

export type MaybeItem = Item | null;
