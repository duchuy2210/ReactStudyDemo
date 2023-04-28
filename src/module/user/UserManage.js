import { ActionDelete, ActionEdit, ActionView } from 'components/action';
import { LabelStatus } from 'components/label';
import { Table } from 'components/table';
import { useAuth } from 'contexts/auth-context';
import { db } from 'firebase-app/firebase-config';
import {
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  query,
  where,
} from 'firebase/firestore';
import { debounce } from 'lodash';
import DashboardHeading from 'module/dashboard/DashboardHeading';
import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { userRole, userStatus } from 'utils/constants';

const UserManage = () => {
  const { userInfo } = useAuth();
  const navigate = useNavigate();
  const [userList, setUserList] = useState([]);
  const [filter, setFilter] = useState('');

  //LẤY DỮ LIỆU USER
  useEffect(() => {
    async function fetchData() {
      const colRef = collection(db, 'users');
      const newRef = filter
        ? query(
            colRef,
            where('fullname', '>=', filter),
            where('fullname', '<=', filter + 'utf8')
          )
        : colRef;

      onSnapshot(newRef, snapshot => {
        let results = [];
        snapshot.forEach(doc => {
          results.push({
            id: doc.id,
            ...doc.data(),
          });
        });
        setUserList(results);
      });
    }
    fetchData();
  }, [filter]);

  //Sử dụng debounce Lodash để không bị re-render nhiều lần vì dùng onchange
  const handleInputFilter = debounce(e => {
    setFilter(e.target.value);
  }, 500);

  //HANDLE SHOW ROLE USER
  const userRoleLabel = role => {
    switch (role) {
      case userRole.ADMIN:
        return 'ADMIN';
      case userRole.MOD:
        return 'MOD';
      case userRole.USER:
        return 'USER';
      default:
        break;
    }
  };
  //HANDLE SHOW STATUS USER
  const userStatusLabel = status => {
    switch (status) {
      case userStatus.ACTIVE:
        return <LabelStatus type="success">Active</LabelStatus>;
      case userStatus.PENDING:
        return <LabelStatus type="warning">Active</LabelStatus>;
      case userStatus.BAN:
        return <LabelStatus type="danger">Active</LabelStatus>;
      default:
        break;
    }
  };

  //XOÁ USER
  const handleDeleteUser = user => {
    const singleDoc = doc(db, 'users', user.id);
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
      <DashboardHeading
        title="Users"
        desc="Manage your user"></DashboardHeading>
      <div className="flex justify-end mb-10">
        <input
          type="text"
          placeholder="Search category..."
          className="px-5 py-4 border border-gray-300 rounded-lg outline-none"
          onChange={handleInputFilter}
        />
      </div>
      <Table>
        <thead>
          <tr>
            <th>Id</th>
            <th>Full Name</th>
            <th>Email</th>
            <th>Info</th>
            <th>Status</th>
            <th>Role</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {userList?.length > 0 &&
            userList.map(user => (
              <tr key={user.id}>
                <td title={user.id}>{user.id.slice(0, 5) + '...'}</td>
                <td>{user.fullname}</td>
                <td>{user.email}</td>
                <td>
                  <div className="flex gap-2 items-center justify-center">
                    <img
                      className="w-20 h-20 flex-shrink-0 object-cover rounded-xl"
                      src={
                        user?.avatar ||
                        'https://media.istockphoto.com/id/1196083861/vi/vec-to/b%E1%BB%99-bi%E1%BB%83u-t%C6%B0%E1%BB%A3ng-%C4%91%E1%BA%A7u-ng%C6%B0%E1%BB%9Di-%C4%91%C3%A0n-%C3%B4ng-%C4%91%C6%A1n-gi%E1%BA%A3n.jpg?s=612x612&w=0&k=20&c=7juGotIovn0c2KFGhZ_DcEqpfiSyYl-zz2ty9XYnYNs='
                      }
                      alt="avatar"
                    />
                    <div className="flex-1">
                      <h3 className="font-medium">{user?.country}</h3>
                      <time className="text-sm text-gray-500">
                        {new Date(
                          user?.createdAt?.seconds * 1000
                        ).toLocaleDateString('vi-VI')}
                      </time>
                    </div>
                  </div>
                </td>
                <td>{userStatusLabel(user?.status)}</td>
                <td>{userRoleLabel(user?.role)}</td>
                <td>
                  {userInfo.role !== userRole.ADMIN ? (
                    ''
                  ) : (
                    <div className="flex items-center text-gray-500 gap-x-3">
                      <ActionEdit
                        onClick={() =>
                          navigate(`/manage/update-user?id=${user?.id}`)
                        }></ActionEdit>
                      <ActionDelete
                        onClick={() => handleDeleteUser(user)}></ActionDelete>
                    </div>
                  )}
                </td>
              </tr>
            ))}
        </tbody>
      </Table>
    </div>
  );
};

export default UserManage;
