import React from 'react';
import styled from 'styled-components';

const LabelStyle = styled.label`
  color: #292d32;
  font-weight: 600;
  font-size: 20px;
  line-height: 30px;
`;

const Label = ({ htmlFor, children, ...props }) => {
  return (
    <LabelStyle htmlFor={htmlFor} {...props}>
      {children}
    </LabelStyle>
  );
};

export default Label;
