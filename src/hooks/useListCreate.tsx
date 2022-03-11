import { useReducer } from 'react';
import { addDoc } from 'firebase/firestore';
import dayjs from 'dayjs';

import { List, ListInput } from '../types';

import { getListsCollection } from '../firebase-config';

import { useUserContext } from '../contexts/UserContext';

export type UseListCreate = [
  (input: ListInput) => Promise<List>,
  {
    data: List | null;
    loading: boolean;
    error: Error | null;
  }
];

type State = {
  data: List | null;
  loading: boolean;
  error: Error | null;
};

type Action =
  | {
      type: 'LOADING';
    }
  | {
      type: 'SUCCESS';
      payload: List;
    }
  | {
      type: 'ERROR';
      payload: Error;
    }
  | {
      type: 'RESET';
    };

const INITIAL_STATE: State = {
  data: null,
  loading: false,
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
        data: action.payload,
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

export function useListCreate(): UseListCreate {
  const { user } = useUserContext();

  const [state, dispatch] = useReducer(reducer, INITIAL_STATE);

  const mutate = (input: ListInput) => {
    dispatch({ type: 'LOADING' });

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

          dispatch({ type: 'SUCCESS', payload: returnData });

          resolve(returnData);
        })
        .catch((err) => {
          dispatch({ type: 'ERROR', payload: err });

          reject(err as Error);
        });
    });
  };

  return [mutate, state];
}
