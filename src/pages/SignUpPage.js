import Input from 'Components/input';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Label from 'Components/label';
import { useForm } from 'react-hook-form';
import { IconEyeOpen, IconEyeClose } from 'Components/icon';
import Field from 'Components/field';
import Button from 'Components/button';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { toast } from 'react-toastify';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { auth, dataBase } from 'database/firebase-config';
import { useNavigate } from 'react-router-dom';
import { addDoc, collection } from 'firebase/firestore';
import AuthenticationPage from './AuthenticationPage';

const SignUpPageStyles = styled.div`

`;
//Tạo schema validate cho từng giá trị
const schema = yup.object({
  fullname: yup.string().required('Please enter your full name'),
  email: yup
    .string()
    .email('Please enter valid email address')
    .required('Please enter your email address'),
  password: yup
    .string()
    .min(8, 'Your password must be at least 8 character')
    .required('Please enter your password'),
});

const SignUpPage = () => {
  const [togglePassword, setTogglePassword] = useState(false);
  const colRef = collection(dataBase, 'users');
  const navigate = useNavigate();
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

  //Khi submit
  const handleSignUp = async values => {
    if (!isValid) return;
    console.log('values:', values);
    //Tạo user Authenticate mới khi bấm Sign Up
    await createUserWithEmailAndPassword(auth, values.email, values.password);
    //Thêm vào firestore db
    await addDoc(colRef, {
      userName: values.fullname,
      email: values.email,
      password: values.password,
    });
    //Hiển thị display name
    await updateProfile(auth.currentUser, {
      displayName: values.fullname,
    });
    toast.success('Sign Up Success');
    //chuyển đến trang sign in
    navigate('/sign-in');
  };
  return (
    <AuthenticationPage>
        <form action="" onSubmit={handleSubmit(handleSignUp)}>
          <Field>
            <Label htmlFor="fullname">Fullname</Label>
            <Input
              type="text"
              name="fullname"
              placeholder="Enter your fullname"
              control={control}
            />
          </Field>
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

export default SignUpPage;
