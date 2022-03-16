import { doc } from 'firebase/firestore';
import { useDocumentData } from 'react-firebase-hooks/firestore';

import { db } from '../firebase-config';

import { listConverter } from '../utils/listConverter';

export function useList(listId: string) {
  const docRef = doc(db, 'lists', listId).withConverter(listConverter)

  return useDocumentData(docRef);
}
