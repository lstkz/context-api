import React from 'react';
import { Modal, ModalBody, ModalHeader } from 'reactstrap';
import { useImmer } from 'use-immer';

interface State {
  isOpen: boolean;
  message: string;
}

interface Actions {
  show: (message: string) => void;
}

const ErrorModalContext = React.createContext<{
  state: State;
  actions: Actions;
} | null>(null);

interface ErrorModalModuleProps {
  children: React.ReactNode;
}

export function ErrorModalModule(props: ErrorModalModuleProps) {
  const { children } = props;
  const [state, setState] = useImmer<State>({
    isOpen: false,
    message: '',
  });

  const actions = React.useMemo<Actions>(() => {
    return {
      show: (message) => {
        setState((draft) => {
          draft.isOpen = true;
          draft.message = message;
        });
      },
    };
  }, []);

  return (
    <>
      <Modal
        isOpen={state.isOpen}
        toggle={() =>
          setState((draft) => {
            draft.isOpen = false;
          })
        }
      >
        <ModalHeader>Error</ModalHeader>
        <ModalBody>{state.message}</ModalBody>
      </Modal>
      <ErrorModalContext.Provider
        value={{
          state,
          actions,
        }}
      >
        {children}
      </ErrorModalContext.Provider>
    </>
  );
}

export function useErrorModalActions() {
  const context = React.useContext(ErrorModalContext);
  if (!context) {
    throw new Error('ErrorModalContext is not set');
  }
  return context.actions;
}
