import {
  query,
  orderBy,
  where,
  // types
  QueryConstraint,
} from 'firebase/firestore';
import { useCollectionData } from 'react-firebase-hooks/firestore';

import { getListsCollection } from '../firebase-config';

import { useUserContext } from '../contexts/UserContext';

import { listConverter } from '../utils/listConverter';

export function useLists(...constraints: QueryConstraint[]) {
  const { user } = useUserContext();

  const collectionQuery = query(
    getListsCollection().withConverter(listConverter),
    ...[where('userId', '==', user?.uid || 'user_not_found'), ...(constraints || [])],
    orderBy('updatedAt', 'desc')
  );

  return useCollectionData(collectionQuery);
}
