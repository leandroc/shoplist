import React from 'react';

import {
  useAuthState,
  useSignInWithGoogle,
  useSignInWithEmailAndPassword,
  SignInWithPopupHook,
  EmailAndPasswordActionHook,
} from 'react-firebase-hooks/auth';

import { auth, logout } from '../firebase-config';

const Context = React.createContext({});

type AuthStateReturnType = ReturnType<typeof useAuthState>;
type UseSignInWithGoogleReturnType = ReturnType<typeof useSignInWithGoogle>;
type UseSignInWithEmailAndPasswordReturnType = ReturnType<typeof useSignInWithEmailAndPassword>;

export type UserContext = {
  user: ReturnType<typeof useAuthState>[0];
  loading: boolean;
  error?: AuthStateReturnType[2] | UseSignInWithGoogleReturnType[3] | UseSignInWithEmailAndPasswordReturnType[3];
  logout: typeof logout;

  signInWithGoogle: SignInWithPopupHook[0];
  signInWithEmailAndPassword: EmailAndPasswordActionHook[0];
};

export type UserContextProviderProps = React.ComponentProps<any>;

export function UserContextProvider({ children }: UserContextProviderProps) {
  const [user, loadingAuthState, errorAuthState] = useAuthState(auth);
  const [signInWithGoogle, , loadingSignInWithGoogle, errorSignInWithGoogle] =
    useSignInWithGoogle(auth);
  const [
    signInWithEmailAndPassword,
    ,
    loadingSignInWithEmailAndPassword,
    errorSignInWithEmailAndPassword,
  ] = useSignInWithEmailAndPassword(auth);

  const value: UserContext = {
    user,
    loading: loadingSignInWithGoogle || loadingSignInWithEmailAndPassword || loadingAuthState,
    error: errorSignInWithGoogle || errorSignInWithEmailAndPassword || errorAuthState,
    logout,

    signInWithGoogle,
    signInWithEmailAndPassword,
  };

  return <Context.Provider value={value}>{children}</Context.Provider>;
}

export const useUserContext = () => {
  const context = React.useContext(Context);

  if (!context) {
    throw Error('useUserContext must be wrapped in a UserContextProvider');
  }

  return context as UserContext;
};
