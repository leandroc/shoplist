import { useEffect, useReducer } from 'react';
import {
  addDoc,
  // types
  FirestoreError,
} from 'firebase/firestore';
import dayjs from 'dayjs';

import { DocumentUUID, List, ListInput, Item, ItemInput } from '../types';

import { getListsCollection } from '../firebase-config';

import { useList } from './useList';
import { useItems } from './useItems';

import { useUserContext } from '../contexts/UserContext';

export type UseListEdit = [
  (input: ListInput) => Promise<List>,
  {
    list: List | null;
    items: Item[] | null;
    loading: boolean;
    error: FirestoreError | null;
  }
];

type State = {
  list: List | null;
  items: Item[] | null;
  loading: boolean;
  error: FirestoreError | null;
};

type Action =
  | {
      type: 'LOADING';
    }
  | {
      type: 'SUCCESS';
      payload: { list: List | null; items: Item[] | null };
    }
  | {
      type: 'ERROR';
      payload: FirestoreError;
    }
  | {
      type: 'RESET';
    };

const INITIAL_STATE: State = {
  list: null,
  items: null,
  loading: true,
  error: null,
};

const reducer = (state: State, action: Action) => {
  switch (action.type) {
    case 'LOADING': {
      return {
        ...state,
        loading: true,
      };
    }

    case 'SUCCESS': {
      return {
        ...state,
        loading: false,
        error: null,
        list: action.payload.list,
        items: action.payload.items,
      };
    }

    case 'ERROR': {
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    }

    case 'RESET': {
      return INITIAL_STATE;
    }

    default: {
      throw Error('you forgot to use an "action.type"');
    }
  }
};

export function useListEdit(listId: DocumentUUID): UseListEdit {
  // const { user } = useUserContext();
  const [list, loadingList, errorList] = useList(listId);
  const [items, loadingItems, errorItems] = useItems(listId);

  const [state, dispatch] = useReducer(reducer, INITIAL_STATE);

  useEffect(() => {
    let done = false;

    function fn() {
      if (!done) {
        dispatch({
          type: 'SUCCESS',
          payload: {
            list: list || null,
            items: list ? items || [] : null,
          },
        });

        done = true;
      }
    }

    fn();
  }, [list, items]);

  const mutate = (input: ListInput) => {
    dispatch({ type: 'LOADING' });

    throw Error('NOT YET');

    /*
    return new Promise<List>((resolve, reject) => {
      if (!user?.uid) {
        reject('user not found');
      }

      const createdAt = dayjs().format();

      const newData = {
        ...input,
        userId: user!.uid,
        createdAt,
        updatedAt: createdAt,
        itemsCount: 0,
        totalValue: 0,
      };

      addDoc(getListsCollection(), newData)
        .then((docRef) => {
          const returnData = { uid: docRef.id, ...newData };

          // dispatch({ type: 'SUCCESS', payload: returnData });

          resolve(returnData);
        })
        .catch((err) => {
          dispatch({ type: 'ERROR', payload: err });

          reject(err as FirestoreError);
        });
    });
    */
  };



  return [
    mutate,
    {
      ...state,
      loading: loadingList || loadingItems || state.loading,
      error: errorList || errorItems || state.error,
    },
  ];
}
