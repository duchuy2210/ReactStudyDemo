import { Button } from 'components/button';
import { Radio } from 'components/checkbox';
import { Field, FieldCheckboxes } from 'components/field';
import ImageUpload from 'components/image/ImageUpload';
import { Input } from 'components/input';
import InputPasswordToggle from 'components/input/InputPasswordToggle';
import { Label } from 'components/label';
import { db } from 'firebase-app/firebase-config';
import { doc, getDoc, serverTimestamp, updateDoc } from 'firebase/firestore';
import useFirebaseImage from 'hooks/useFirebaseImage';
import DashboardHeading from 'module/dashboard/DashboardHeading';
import React from 'react';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { userRole, userStatus } from 'utils/constants';

const UserUpdate = () => {
  const {
    control,
    watch,
    reset,
    setValue,
    handleSubmit,
    getValues,
    formState: { isSubmitting, isValid },
  } = useForm({
    mode: 'onChange',
  });

  //XOÁ AVATAR KHI XOÁ ẢNH TRÊN FIREBASE
  const deleteAvatar = async () => {
    const colRef = doc(db, 'users', userId);
    await updateDoc(colRef, {
      avatar: '',
    });
  };

  const { image,progress, handleSelectImage, handleDeleteImage } =
    useFirebaseImage(setValue, getValues, deleteAvatar);
  const [params] = useSearchParams();
  const navigate = useNavigate();
  const userId = params.get('id');
  const watchStatus = watch('status');
  const watchRole = watch('role');
  const avatarUrl = getValues('avatar');

  //LẤY DỮ LIỆU TỪ DB THEO ID
  useEffect(() => {
    async function fetchData() {
      const docRef = doc(db, 'users', userId);
      const singleDoc = await getDoc(docRef);
      console.log('singleDoc:', singleDoc.data());
      reset({ ...singleDoc.data() });
    }
    fetchData();
  }, [userId, reset]);
  if (!userId) return;

  //HANDLE WHEN SUBMIT UPDATE DATA
  const handleUpdateUser = async values => {
    if (!isValid) return;
    //XỬ LÝ DỮ LIỆU
    const cloneValues = { ...values };
    cloneValues.status = Number(cloneValues.status);
    cloneValues.role = Number(cloneValues.role);
    cloneValues.avatar = image;
    const docRef = doc(db, 'users', userId);
    await updateDoc(docRef, {
      ...cloneValues,
      updateAt: serverTimestamp(),
    });
    toast.success('Update category successfully');
    navigate('/manage/user');
  };
  return (
    <div>
      <DashboardHeading
        title="Update user"
        desc="Update user information"></DashboardHeading>
      <form onSubmit={handleSubmit(handleUpdateUser)}>
        <div className="w-[200px] h-[200px] mx-auto rounded-full mb-10">
          <ImageUpload
            className="!rounded-full h-full"
            onChange={handleSelectImage}
            handleDeleteImage={handleDeleteImage}
            progress={progress}
            image={image || avatarUrl || ''}></ImageUpload>
        </div>
        <div className="form-layout">
          <Field>
            <Label>Fullname</Label>
            <Input
              name="fullname"
              placeholder="Enter your fullname"
              control={control}></Input>
          </Field>
          <Field>
            <Label>Username</Label>
            <Input
              name="username"
              placeholder="Enter your username"
              control={control}></Input>
          </Field>
        </div>
        <div className="form-layout">
          <Field>
            <Label>Email</Label>
            <Input
              name="email"
              placeholder="Enter your email"
              control={control}
              type="email"></Input>
          </Field>
          <Field>
            <Label>Password</Label>
            <InputPasswordToggle
              name="password"
              placeholder="Enter your password"
              control={control}></InputPasswordToggle>
          </Field>
        </div>
        <div className="form-layout">
          <Field>
            <Label>Status</Label>
            <FieldCheckboxes>
              <Radio
                name="status"
                control={control}
                checked={Number(watchStatus) === userStatus.ACTIVE}
                value={userStatus.ACTIVE}>
                Active
              </Radio>
              <Radio
                name="status"
                control={control}
                checked={Number(watchStatus) === userStatus.PENDING}
                value={userStatus.PENDING}>
                Pending
              </Radio>
              <Radio
                name="status"
                control={control}
                checked={Number(watchStatus) === userStatus.BAN}
                value={userStatus.BAN}>
                Banned
              </Radio>
            </FieldCheckboxes>
          </Field>
          <Field>
            <Label>Role</Label>
            <FieldCheckboxes>
              <Radio
                name="role"
                control={control}
                checked={Number(watchRole) === userRole.ADMIN}
                value={userRole.ADMIN}>
                Admin
              </Radio>
              <Radio
                name="role"
                control={control}
                checked={Number(watchRole) === userRole.MOD}
                value={userRole.MOD}>
                Moderator
              </Radio>
              <Radio
                name="role"
                control={control}
                checked={Number(watchRole) === userRole.USER}
                value={userRole.USER}>
                User
              </Radio>
            </FieldCheckboxes>
          </Field>
        </div>
        <div className="form-layout">
          <Field>
            <Label>Description</Label>
            {/* <Textarea name="description" control={control}></Textarea> */}
          </Field>
        </div>
        <Button
          kind="primary"
          type="submit"
          className="mx-auto w-[200px]"
          isLoading={isSubmitting}
          disabled={isSubmitting}>
          Update
        </Button>
      </form>
    </div>
  );
};

export default UserUpdate;
