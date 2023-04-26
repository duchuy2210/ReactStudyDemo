import { ActionDelete, ActionEdit, ActionView } from 'components/action';
import { Table } from 'components/table';
import { db } from 'firebase-app/firebase-config';
import { collection, onSnapshot, query, where } from 'firebase/firestore';
import { debounce } from 'lodash';
import DashboardHeading from 'module/dashboard/DashboardHeading';
import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const UserManage = () => {
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

  //XOÁ USER
  const handleDeleteUser = () => {};
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
                      className="w-20 h-20 flex-shrink-0 object-cover rounded-sm"
                      src="https://mimosawedding.net/wp-content/uploads/2020/05/cach-cam-may-anh-chuyen-nghiep-4.jpg"
                      alt="avatar"
                    />
                    <div className="flex-1">
                      <h3>Đà Nẵng</h3>
                      <time className="text-sm text-gray-500">
                        {new Date().toLocaleDateString()}
                      </time>
                    </div>
                  </div>
                </td>
                <td>Status</td>
                <td>Role</td>
                <td>
                  <div className="flex items-center text-gray-500 gap-x-3">
                    <ActionView
                      onClick={() =>
                        navigate(`/category/${user.slug}`)
                      }></ActionView>
                    <ActionEdit
                      onClick={() =>
                        navigate(`/manage/update-category?id=${user.id}`)
                      }></ActionEdit>
                    <ActionDelete
                      onClick={() => handleDeleteUser(user.id)}></ActionDelete>
                  </div>
                </td>
              </tr>
            ))}
        </tbody>
      </Table>
    </div>
  );
};

export default UserManage;
