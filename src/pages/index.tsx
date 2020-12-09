import { Button, Container, Modal, ModalBody, ModalHeader } from 'reactstrap';
import React from 'react';
import { useErrorModalActions } from '../ErrorModalModule';
import { useUser } from '../AuthModule';

export default function IndexPage() {
  const errorModalActions = useErrorModalActions();
  const user = useUser();

  return (
    <div>
      <Container style={{ marginTop: 50 }}>
        <Button
          onClick={() => {
            errorModalActions.show('foo');
          }}
        >
          Show error
        </Button>
      </Container>
    </div>
  );
}
