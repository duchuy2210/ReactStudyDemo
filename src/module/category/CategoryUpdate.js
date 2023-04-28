import { Button } from 'components/button';
import { Radio } from 'components/checkbox';
import { Field, FieldCheckboxes } from 'components/field';
import { Input } from 'components/input';
import { Label } from 'components/label';
import { db } from 'firebase-app/firebase-config';
import { doc, getDoc, serverTimestamp, updateDoc } from 'firebase/firestore';

import DashboardHeading from 'module/dashboard/DashboardHeading';
import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import slugify from 'slugify';
import { categoryStatus } from 'utils/constants';
const CategoryUpdate = () => {
  const navigate = useNavigate();
  const [params] = useSearchParams();
  const categoryId = params.get('id');
  const {
    control,
    reset,
    formState: { isSubmitting, isValid },
    handleSubmit,
    watch,
  } = useForm({
    mode: 'onChange',
    //Khai báo giá trị ban đầu
  });

  //LẤY DỮ LIỆU TỪ DB THEO ID
  useEffect(() => {
    async function fetchData() {
      const docRef = doc(db, 'categories', categoryId);
      const singleDoc = await getDoc(docRef);
      console.log('singleDoc:', singleDoc.data());
      reset(singleDoc.data());
    }
    fetchData();
  }, [categoryId, reset]);
  const watchStatus = watch('status');
  const handleUpdateCategory = async values => {
    if (!isValid) return;
    //XỬ LÝ DỮ LIỆU
    const cloneValues = { ...values };
    cloneValues.slug = slugify(values.slug || values.name, { lower: true });
    cloneValues.status = Number(cloneValues.status);
    const docRef = doc(db, 'categories', categoryId);
    await updateDoc(docRef, {
      ...cloneValues,
      updateAt: serverTimestamp(),
    });
    toast.success('Update category successfully');
    navigate('/manage/category');
  };
  return (
    <div>
      <DashboardHeading
        title="Update category"
        desc={`Category: `}></DashboardHeading>
      <form onSubmit={handleSubmit(handleUpdateCategory)}>
        <div className="form-layout">
          <Field>
            <Label>Name</Label>
            <Input
              control={control}
              name="name"
              placeholder="Enter your category name"
              required></Input>
          </Field>
          <Field>
            <Label>Slug</Label>
            <Input
              control={control}
              name="slug"
              placeholder="Enter your slug"></Input>
          </Field>
        </div>
        <div className="form-layout">
          <Field>
            <Label>Status</Label>
            <FieldCheckboxes className="flex flex-wrap gap-x-5">
              <Radio
                name="status"
                control={control}
                checked={Number(watchStatus) === categoryStatus.APPROVED}
                value={categoryStatus.APPROVED}>
                Approved
              </Radio>
              <Radio
                name="status"
                control={control}
                checked={Number(watchStatus) === categoryStatus.UNAPPROVED}
                value={categoryStatus.UNAPPROVED}>
                Unapproved
              </Radio>
            </FieldCheckboxes>
          </Field>
        </div>
        <Button
          kind="primary"
          type="submit"
          className="mx-auto w-[250px]"
          isLoading={isSubmitting}
          disabled={isSubmitting}>
          Update category
        </Button>
      </form>
    </div>
  );
};

export default CategoryUpdate;
