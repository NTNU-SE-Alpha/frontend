import React from 'react';
import styled from 'styled-components';
import ButtonIcon from './ButtonIcon';
import { Ellipsis } from 'lucide-react';
const Container = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  border: 1px solid teal;
  border-radius: 5px;
  padding: 1rem;
  gap: 1rem;

  div.children {
  }
`;

const Dialog = ({ children, ...rest }) => {
  return (
    <Container {...rest}>
      <div className="children">{children}</div>
      <ButtonIcon>
        <Ellipsis />
      </ButtonIcon>
    </Container>
  );
};

export default Dialog;
