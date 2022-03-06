import {
  query,
  orderBy,
  where,
  // types
  DocumentData,
  DocumentReference,
  FirestoreDataConverter,
  QueryConstraint,
  QueryDocumentSnapshot,
  SnapshotOptions,
  WithFieldValue,
} from 'firebase/firestore';
import { useCollectionData } from 'react-firebase-hooks/firestore';

import { getListsCollection } from '../firebase-config';

import { List } from '../types';

import { useUserContext } from '../contexts/UserContext';

const listConverter: FirestoreDataConverter<List> = {
  toFirestore(list: WithFieldValue<List>): DocumentData {
    return {
      createdAt: list.createdAt,
      updatedAt: list.updatedAt,

      userId: list.userId,

      name: list.name,
      itemsCount: list.itemsCount,
      totalValue: list.totalValue,
    };
  },
  fromFirestore(
    snapshot: QueryDocumentSnapshot,
    options: SnapshotOptions
  ): List & { ref: DocumentReference<DocumentData> } {
    const data = snapshot.data(options);
    return {
      ref: snapshot.ref,

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

export function useLists(...constraints: QueryConstraint[]) {
  const { user } = useUserContext();

  const collectionQuery = query(
    getListsCollection().withConverter(listConverter),
    ...[where('userId', '==', user?.uid || 'user_not_found'), ...(constraints || [])],
    orderBy('updatedAt', 'desc')
  );

  return useCollectionData(collectionQuery);
}
