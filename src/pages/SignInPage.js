/* eslint-disable react-hooks/exhaustive-deps */
import { yupResolver } from '@hookform/resolvers/yup';
import Button from 'Components/button';
import Field from 'Components/field';
import { IconEyeClose, IconEyeOpen } from 'Components/icon';
import Input from 'Components/input';
import Label from 'Components/label';
import { useAuth } from 'context/auth-context';
import { auth } from 'database/firebase-config';
import { signInWithEmailAndPassword } from 'firebase/auth';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { NavLink, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import * as yup from 'yup';
import AuthenticationPage from './AuthenticationPage';

const SignInPage = () => {
  //Khai baó sử dụng auth để phân quyền cho hiện thông tin không
  const { userInfo } = useAuth();
  const navigate = useNavigate();
  const [togglePassword, setTogglePassword] = useState(false);

  useEffect(() => {
    document.title = "Login Page"
    if (userInfo?.email) navigate('/');
  }, []);

  //Tạo schema validate cho từng giá trị
  const schema = yup.object({
    email: yup
      .string()
      .email('Please enter valid email address')
      .required('Please enter your email address'),
    password: yup
      .string()
      .min(8, 'Your password must be at least 8 character')
      .required('Please enter your password'),
  });

  //Sử dụng useForm với form trong component này
  const {
    control, //control chứa các phương thức để đăng kí component với hook
    handleSubmit, //handleSubmit sẽ thực hiện validate, nếu validate thành công sẽ gọi hàm thực thi bên trong nó
    formState: { errors, isValid, isSubmitting },
  } = useForm({
    mode: 'onchange',
    // Khai báo validate vào trong form
    resolver: yupResolver(schema),
  });

   //Xử lý hiện message validation
  useEffect(() => {
    const arrErrors = Object.values(errors);
    if (arrErrors.length > 0) {
      toast.error(arrErrors[0]?.message, {
        pauseOnHover: false,
        delay: 0,
      });
    }
  }, [errors]);

  //Khi sign in
  const handleSignIn = async values => {
    if (!isValid) return;
  await signInWithEmailAndPassword(auth,values.email,values.password)
    toast.success('Sign in Success');
    navigate("/")
  };
  return (
    <AuthenticationPage>
      <form action="" onSubmit={handleSubmit(handleSignIn)}>
        <Field>
          <Label htmlFor="email">Email address</Label>
          <Input
            type="email"
            name="email"
            placeholder="Enter your email"
            control={control}
          />
        </Field>
        <Field>
          <Label htmlFor="password">Password</Label>
          <Input
            type={togglePassword ? 'text' : 'password'}
            name="password"
            placeholder="Enter your password"
            control={control}>
            {togglePassword ? (
              <IconEyeClose
                className="input-icon"
                onClick={() => setTogglePassword(false)}></IconEyeClose>
            ) : (
              <IconEyeOpen
                className="input-icon"
                onClick={() => setTogglePassword(true)}></IconEyeOpen>
            )}
          </Input>
        </Field>
        <div className='have-account'><NavLink to={"/sign-up"}>Don't have an account yet?</NavLink></div>
        <Button
          type="submit"
          style={{ width: 300 }}
          disabled={isSubmitting}
          isLoading={isSubmitting}>
          Sign Up
        </Button>
      </form>
    </AuthenticationPage>
  );
};

export default SignInPage;
