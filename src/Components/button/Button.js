import { LoadingSpinner } from 'Components/loading';
import React from 'react';
import styled from 'styled-components';
import PropTypes from "prop-types";

const ButtonStyle = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 50px auto 0;
  height: ${props => props.height || "60px"};
  line-height: 1;
  border-radius: 10px;
  background-image: linear-gradient(107.61deg, #00a7b4 15.59%, #a4d96c 87.25%);
  color: #fff;
  :hover {
    cursor: pointer;
  }
  &:disabled {
    background-image: none;
    background-color: #c0c0c0;
    pointer-events: none;
  }
`;
const Button = ({
  type = 'button',
  children,
  onclick = () => {},
  ...props
}) => {
  const child = !!props.isLoading ? (
    <LoadingSpinner></LoadingSpinner>
  ) : (
    children
  );
  return (
    <ButtonStyle type={type} onclick={onclick} {...props}>
      {child}
    </ButtonStyle>
  );
};

//Tạo các propsTpe cho component Button để có thể gợi ý code
Button.propTypes = {
  type: PropTypes.oneOf(["button", "submit"]),
  isLoading: PropTypes.bool,
  onClick: PropTypes.func,
  children: PropTypes.node,
  kind: PropTypes.oneOf(["primary", "secondary", "ghost"]),
};
export default Button;
