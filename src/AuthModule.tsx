import React from 'react';
import { useImmer } from 'use-immer';

interface User {
  username: string;
}

interface State {
  user: User | null;
}

interface Actions {
  loggedIn: (user: User) => void;
  logout: () => void;
}

const AuthModalContext = React.createContext<{
  state: State;
  actions: Actions;
} | null>(null);

interface AuthModuleProps {
  children: React.ReactNode;
}

export function AuthModule(props: AuthModuleProps) {
  const { children } = props;
  const [state, setState] = useImmer<State>({
    user: null,
  });

  const actions = React.useMemo<Actions>(() => {
    return {
      logout: () => {},
      loggedIn: (user) => {},
    };
  }, []);

  return (
    <AuthModalContext.Provider
      value={{
        state,
        actions,
      }}
    >
      {children}
    </AuthModalContext.Provider>
  );
}

export function useUser() {
  const context = React.useContext(AuthModalContext);
  if (!context) {
    throw new Error('AuthModalContext is not set');
  }
  return context.state.user;
}
