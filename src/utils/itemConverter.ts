import {
  DocumentData,
  DocumentReference,
  FirestoreDataConverter,
  QueryDocumentSnapshot,
  SnapshotOptions,
  WithFieldValue,
} from 'firebase/firestore';

import { Item } from '../types';

export const itemConverter: FirestoreDataConverter<Item> = {
  toFirestore(item: WithFieldValue<Item>): DocumentData {
    const newItem = {
      createdAt: item.createdAt,
      updatedAt: item.updatedAt,

      userId: item.userId,
      listId: item.listId,

      name: item.name,
      quantity: item.quantity,
      value: item.value,
    };

    return JSON.parse(JSON.stringify(newItem));
  },
  fromFirestore(
    snapshot: QueryDocumentSnapshot,
    options: SnapshotOptions
  ): Item & { ref: DocumentReference<DocumentData> } {
    const data = snapshot.data(options);

    return {
      ref: snapshot.ref,

      uid: snapshot.id,
      createdAt: data.createdAt,
      updatedAt: data.updatedAt,

      userId: data.userId,
      listId: data.listId,

      name: data.name,
      quantity: data.quantity,
      value: data.value,
    };
  },
};
