import React from 'react';
import { useController } from 'react-hook-form';
import styled from 'styled-components';

const InputStyle = styled.div`
  position: relative;
  width: 100%;
  input {
    width: 100%;
    border: 2px solid transparent;
    font-size: 16px;
    border-radius: 10px;
    background-color: #e7ecf3;
    padding: ${props => (props.hasIcon ? '15px 60px 15px 15px' : '15px')};
  }
  input:focus {
    border: 2px solid ${props => props.theme.primary};
    background-color: #fff;
  }
  input::-webkit-input-placeholder {
    color: #84878b;
  }
  input::-moz-input-placeholder {
    color: #84878b;
  }
  .input-icon {
    position: absolute;
    right: 20px;
    top: 50%;
    transform: translateY(-50%);
    cursor: pointer;
    padding: 5px;
  }
`;

const Input = ({
  name,
  type,
  children, //children để khi handle việc icon cho xem password
  control, //control chứa các phương thức để đăng kí component với hook
  ...props
}) => {
  const { field } = useController({
    control,
    name,
    defaultValue: '',
  });
  console.log(control);
  return (
    <InputStyle hasIcon={children ? true : false}>
      <input id={name} type={type} {...field} {...props} />
      {children}
    </InputStyle>
  );
};

export default Input;
