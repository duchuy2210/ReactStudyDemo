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
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from 'firebase-app/firebase-config';
import { Dropdown } from 'components/dropdown';
const PostAddNewStyles = styled.div``;

const PostAddNew = () => {
  //Kết nối đến collection posts
  // const colRef = collection(db, 'posts');

  const { control, watch, setValue, handleSubmit, getValues } = useForm({
    mode: 'onChange',
    defaultValues: {
      title: '',
      slug: '',
      status: 2,
      hot: false,
      image: '',
      categoryId: '',
      user: {},
    },
  });

  //Theo giỏi sự thay đổi
  const watchStatus = watch('status');
  const watchHot = watch('hot');
  // const watchCategory = watch('category');

  const [categories, setCategories] = useState([]);
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

  const { image, progress, handleSelectImage, handleDeleteImage } =
    useFirebaseImage(setValue, getValues);

  //Handle add new posts
  const addPostHandler = values => {
    const cloneValues = { ...values };
    cloneValues.slug = slugify(values.slug || values.title);
    cloneValues.status = Number(values.status);
    console.log('cloneValues:', cloneValues);
    // handleUploadImage(cloneValues.image);
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
              <Dropdown.Select></Dropdown.Select>
              <Dropdown.List>
                {categories.length > 0 &&
                  categories.map((category, index) => (
                    <Dropdown.Option key={index} onClick={()=>setValue("categoryId",category.id)}>
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
        <Button type="submit" className="mx-auto">
          Add new post
        </Button>
      </form>
    </PostAddNewStyles>
  );
};

export default PostAddNew;
