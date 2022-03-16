import {
  query,
  orderBy,
  where,
  // types
  QueryConstraint,
} from 'firebase/firestore';
import { useCollectionData } from 'react-firebase-hooks/firestore';

import { getItemsCollection } from '../firebase-config';

import { useUserContext } from '../contexts/UserContext';

import { itemConverter } from '../utils/itemConverter';

export function useItems(listId: string, ...constraints: QueryConstraint[]) {
  const { user } = useUserContext();

  const collectionQuery = query(
    getItemsCollection().withConverter(itemConverter),
    ...[where('userId', '==', user?.uid), where('listId', '==', listId), ...(constraints || [])],
    orderBy('createdAt', 'asc')
  );

  return useCollectionData(collectionQuery);
}
