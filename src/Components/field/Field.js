import React from 'react';
import styled from 'styled-components';
const FieldStyles = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 10px;
  margin-bottom: 20px;
`;
const Field = props => {
  return <FieldStyles>{props.children}</FieldStyles>;
};

export default Field;
