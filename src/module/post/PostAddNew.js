import { Button } from 'components/button';
import { Radio } from 'components/checkbox';
import { Field } from 'components/field';
import { Input } from 'components/input';
import { Label } from 'components/label';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import slugify from 'slugify';
import styled from 'styled-components';
import { postStatus } from 'utils/constants';
import ImageUpload from 'components/image/ImageUpload';
import useFirebaseImage from 'hooks/useFirebaseImage';
import Toggle from 'components/toggle/Toggle';
import {
  addDoc,
  collection,
  getDocs,
  query,
  serverTimestamp,
  where,
} from 'firebase/firestore';
import { db } from 'firebase-app/firebase-config';
import { Dropdown } from 'components/dropdown';
import { useAuth } from 'contexts/auth-context';
import { toast } from 'react-toastify';
const PostAddNewStyles = styled.div``;

const PostAddNew = () => {
  //Kết nối đến collection posts
  // const colRef = collection(db, 'posts');
  const { userInfo } = useAuth();
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [loading, setLoading] = useState(false);

  const { control, watch, setValue, handleSubmit, getValues, reset } = useForm({
    mode: 'onChange',
    defaultValues: {
      title: '',
      slug: '',
      status: 2,
      hot: false,
      image_name: '',
      categoryId: '',
      image: '',
      userId: '',
      //note bug: serverTimestamp là 1 func
      createdAt: new Date(),
    },
  });

  //Theo giỏi sự thay đổi
  const watchStatus = watch('status');
  const watchHot = watch('hot');
  // const watchCategory = watch('category');

  //handle upload image and render UI when post image
  let {
    image,
    progress,
    handleSelectImage,
    handleDeleteImage,
    handleResetImage,
  } = useFirebaseImage(setValue, getValues);

  //Lấy collection categories từ db
  useEffect(() => {
    async function getData() {
      const colRef = collection(db, 'categories');
      //query lấy ra status
      const q = query(colRef, where('status', '==', 1));
      const querySnapshot = await getDocs(q);
      let result = [];
      querySnapshot.forEach(doc => {
        // doc.data() is never undefined for query doc snapshots
        // console.log(doc.id, ' => ', doc.data());
        result.push({
          id: doc.id,
          ...doc.data(),
        });
        setCategories(result);
      });
    }
    getData();
  }, []);

  //
  useEffect(() => {
    document.title = 'Add new posts';
  },[])

  //Handle add new posts
  const addPostHandler = async values => {
    //set lại các giá trị vào cloneValues để kh ảnh hưởng tới values
    setLoading(true);
    try {
      const cloneValues = { ...values };
      cloneValues.slug = slugify(values.slug || values.title, { lower: true });
      cloneValues.status = Number(values.status);
      const colRef = collection(db, 'posts');
      await addDoc(colRef, {
        ...cloneValues,
        image,
        userId: userInfo.uid,
        createdAt: serverTimestamp(),
      });
      console.log('cloneValues:', cloneValues);
      toast.success('created new post successfully');
      //Sau khi post thành công sẽ reset lại các giá trị
      reset({
        title: '',
        slug: '',
        status: 2,
        hot: false,
        image_name: '',
        categoryId: '',
        image: '',
      });
      handleResetImage();
      setSelectedCategory('');
    } catch (error) {
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };
  const handleCategoryDisplay = category => {
    setValue('categoryId', category.id);
    setSelectedCategory(category.name);
  };
  return (
    <PostAddNewStyles>
      <h1 className="dashboard-heading">Add new post</h1>
      <form onSubmit={handleSubmit(addPostHandler)}>
        <div className="grid grid-cols-2 gap-x-10 mb-10">
          <Field>
            <Label>Title</Label>
            <Input
              control={control}
              placeholder="Enter your title"
              name="title"></Input>
          </Field>
          <Field>
            <Label>Slug</Label>
            <Input
              control={control}
              placeholder="Enter your slug"
              name="slug"></Input>
          </Field>
        </div>
        <div className="grid grid-cols-2 gap-x-10 mb-10">
          <Field>
            <Label>Image</Label>
            <ImageUpload
              onChange={handleSelectImage}
              handleDeleteImage={handleDeleteImage}
              className="h-[250px] bg-gray-100"
              progress={progress}
              image={image}></ImageUpload>
          </Field>
          <Field>
            <Label>Category</Label>
            {/* Sử dụng làm dropdown theo kiểu pattern compound components */}
            <Dropdown>
              <Dropdown.Select
                placeholder={
                  selectedCategory
                    ? selectedCategory
                    : 'Please select an option'
                }></Dropdown.Select>
              <Dropdown.List>
                {categories.length > 0 &&
                  categories.map((category, index) => (
                    <Dropdown.Option
                      key={index}
                      onClick={() => handleCategoryDisplay(category)}>
                      {category.name}
                    </Dropdown.Option>
                  ))}
              </Dropdown.List>
            </Dropdown>
          </Field>
          {/* <Field>
            <Label>Author</Label>
            <Input control={control} placeholder="Find the author"></Input>
          </Field> */}
        </div>
        <div className="grid grid-cols-2 gap-x-10 mb-10">
          <Field>
            <Label>Feature</Label>
            <Toggle
              on={watchHot === true}
              onClick={() => setValue('hot', !watchHot)}></Toggle>
          </Field>
          <Field>
            <Label>Status</Label>
            <div className="flex items-center gap-x-5">
              <Radio
                name="status"
                control={control}
                checked={Number(watchStatus) === postStatus.APPROVER}
                value={postStatus.APPROVER}>
                Approved
              </Radio>
              <Radio
                name="status"
                control={control}
                checked={Number(watchStatus) === postStatus.PENDING}
                value={postStatus.PENDING}>
                Pending
              </Radio>
              <Radio
                name="status"
                control={control}
                checked={Number(watchStatus) === postStatus.REJECTED}
                value={postStatus.REJECTED}>
                Reject
              </Radio>
            </div>
          </Field>
        </div>
        <Button
          type="submit"
          className="mx-auto w-[250px]"
          isLoading={loading}
          disable={loading}>
          Add new post
        </Button>
      </form>
    </PostAddNewStyles>
  );
};

export default PostAddNew;
