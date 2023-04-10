import Input from 'Components/input';
import React from 'react';
import styled from 'styled-components';
import Label from 'Components/label';
import { useForm } from 'react-hook-form';
import { IconEyeOpen } from 'Components/icon';

const SignUpPageStyles = styled.div`
  width: 600px;
  margin: 50px auto;
  min-height: 80vh;
  padding: 40px;
  border: 5px solid ${props => props.theme.primary};
  border-radius: 50px;
  .logo {
    width: 20%;
    margin: 0 auto;
  }
  .title {
    text-align: center;
    color: ${props => props.theme.primary};
    font-weight: bold;
    font-size: 40px;
    margin-bottom: 40px;
  }
  .field {
    display: flex;
    flex-direction: column;
    row-gap: 10px;
    margin-bottom: 20px;
  }
`;
const SignUpPage = () => {
  const {
    control, //control chứa các phương thức để đăng kí component với hook
    handleSubmit, //handleSubmit sẽ thực hiện validate, nếu validate thành công sẽ gọi hàm thực thi bên trong nó
    formState: { errors, isValid, isSubmitting },
    watch,
  } = useForm();
  const handleSigUp = values => {
    console.log(values);
  };
  return (
    <SignUpPageStyles>
      <div className="container">
        <img src="./img/logo.png" alt="abc" className="logo" />
        <h2 className="title">Monkey Blogging</h2>
        <form action="" onSubmit={handleSubmit(handleSigUp)}>
          <div className="field">
            <Label htmlFor="fullname">Fullname</Label>
            <Input
              type="text"
              name="fullname"
              placeholder="Enter your fullname"
              control={control}
            />
          </div>
          <div className="field">
            <Label htmlFor="email">Email address</Label>
            <Input
              type="email"
              name="email"
              placeholder="Enter your email"
              control={control}
            />
          </div>
          <div className="field">
            <Label htmlFor="password">Password</Label>
            <Input
              type="password"
              name="password"
              placeholder="Enter your password"
              control={control}>
              <IconEyeOpen className="input-icon"></IconEyeOpen>
            </Input>
          </div>
        </form>
      </div>
    </SignUpPageStyles>
  );
};

export default SignUpPage;
