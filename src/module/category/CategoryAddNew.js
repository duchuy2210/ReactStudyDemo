import { Button } from 'components/button';
import { Radio } from 'components/checkbox';
import { Field, FieldCheckboxes } from 'components/field';
import { Input } from 'components/input';
import { Label } from 'components/label';
import { db } from 'firebase-app/firebase-config';
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import DashboardHeading from 'module/dashboard/DashboardHeading';
import React from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import slugify from 'slugify';
import { categoryStatus } from 'utils/constants';

const CategoryAddNew = () => {
  const {
    control,
    reset,
    formState: { isSubmitting, isValid },
    handleSubmit,
    watch,
  } = useForm({
    mode: 'onChange',
    //Khai báo giá trị ban đầu
    defaultValues: {
      name: '',
      slug: '',
      status: 1,
      createdAt: new Date(),
    },
  });
  const watchStatus = watch('status');
  const handleAddNewCategory = async values => {
    if (!isValid) return;
    //XỬ LÝ DỮ LIỆU
    const cloneValues = { ...values };
    cloneValues.slug = slugify(values.slug || values.name, { lower: true });
    cloneValues.status = Number(cloneValues.status);
    console.log('values:', cloneValues);

    //POST LÊN DB
    const colRef = collection(db, 'categories');
    try {
      await addDoc(colRef, {
        ...cloneValues,
        createdAt: serverTimestamp(),
      });
      toast.success('Created new category successfully');
    } catch (error) {
      console.log(error);
    } finally {
      reset({
        name: '',
        slug: '',
        status: 1,
        createdAt: new Date(),
      });
    }
  };
  return (
    <div>
      <DashboardHeading
        title="New category"
        desc="Add new category"></DashboardHeading>
      <form onSubmit={handleSubmit(handleAddNewCategory)}>
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
          Add new category
        </Button>
      </form>
    </div>
  );
};

export default CategoryAddNew;
