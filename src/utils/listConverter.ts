import {
  DocumentData,
  DocumentReference,
  FirestoreDataConverter,
  QueryDocumentSnapshot,
  SnapshotOptions,
  WithFieldValue,
} from 'firebase/firestore';

import { List } from '../types';

export const listConverter: FirestoreDataConverter<List> = {
  toFirestore(list: WithFieldValue<List>): DocumentData {
    const newList = {
      createdAt: list.createdAt,
      updatedAt: list.updatedAt,

      userId: list.userId,

      name: list.name,
      itemsCount: list.itemsCount,
      totalValue: list.totalValue,
    };

    return JSON.parse(JSON.stringify(newList));
  },
  fromFirestore(
    snapshot: QueryDocumentSnapshot,
    options: SnapshotOptions
  ): List & { ref: DocumentReference<DocumentData> } {
    const data = snapshot.data(options);

    return {
      // ref: snapshot.ref,
      ref: {} as any,

      uid: snapshot.id,
      createdAt: data.createdAt,
      updatedAt: data.updatedAt,

      userId: data.userId,

      name: data.name,
      itemsCount: data.itemsCount,
      totalValue: data.totalValue,
    };
  },
};
