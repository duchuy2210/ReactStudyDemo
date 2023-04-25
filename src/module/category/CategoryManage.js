import Swal from 'sweetalert2';
import { ActionDelete, ActionEdit, ActionView } from 'components/action';
import { Button } from 'components/button';
import { LabelStatus } from 'components/label';
import { Table } from 'components/table';
import { db } from 'firebase-app/firebase-config';
import {
  collection,
  deleteDoc,
  doc,
  getDoc,
  onSnapshot,
} from 'firebase/firestore';
import DashboardHeading from 'module/dashboard/DashboardHeading';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { categoryStatus } from 'utils/constants';

const CategoryManage = () => {
  const navigate = useNavigate();
  const [categoryList, setCategoryList] = useState([]);
  useEffect(() => {
    const docRef = collection(db, 'categories');
    //Lấy dữ liệu realtime
    onSnapshot(docRef, snapshot => {
      let results = [];
      snapshot.forEach(doc => {
        results.push({
          id: doc.id,
          ...doc.data(),
        });
      });
      setCategoryList(results);
    });
  }, []);
  const handleDeleteCategory = docId => {
    const singleDoc = doc(db, 'categories', docId);
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    }).then(async result => {
      if (result.isConfirmed) {
        await deleteDoc(singleDoc);
        Swal.fire('Deleted!', 'Your file has been deleted.', 'success');
      }
    });
  };
  return (
    <div>
      <DashboardHeading title="Categories" desc="Manage your category">
        <Button kind="ghost" height="60px" to="/manage/add-category">
          Create Category
        </Button>
      </DashboardHeading>
      <Table>
        <thead>
          <tr>
            <th>Id</th>
            <th>Name</th>
            <th>Slug</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {categoryList?.length > 0 &&
            categoryList.map(category => (
              <tr key={category.id}>
                <td>{category.id}</td>
                <td>{category.name}</td>
                <td>
                  <span className="italic text-gray-400">{category.slug}</span>
                </td>
                <td>
                  {Number(category.status) === categoryStatus.APPROVED && (
                    <LabelStatus type="success">Approved</LabelStatus>
                  )}
                  {Number(category.status) === categoryStatus.UNAPPROVED && (
                    <LabelStatus type="warning">Unapproved</LabelStatus>
                  )}
                </td>
                <td>
                  <div className="flex items-center text-gray-500 gap-x-3">
                    <ActionView
                      onClick={() =>
                        navigate(`/category/${category.slug}`)
                      }></ActionView>
                    <ActionEdit
                      onClick={() =>
                        navigate(`/manage/update-category?id=${category.id}`)
                      }></ActionEdit>
                    <ActionDelete
                      onClick={() =>
                        handleDeleteCategory(category.id)
                      }></ActionDelete>
                  </div>
                </td>
              </tr>
            ))}
        </tbody>
      </Table>
    </div>
  );
};

export default CategoryManage;
