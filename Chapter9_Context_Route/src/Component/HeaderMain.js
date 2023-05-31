import React from 'react';
import { useAuth } from '../contexts/auth-context';

const HeaderMain = () => {
  const { user, setUser } = useAuth();
  return (
    <div className="p-4 bg-white shadow-md flex items-center justify-center">
      {user ? (
        <div className="flex flex-col items-center justify-center">
          <div className="flex items-center gap-3">
            <img
              className="w-10 h-10 object-cover rounded-full"
              src={user.avatar}
              alt="avatar"
            />
            <span className="text-base font-medium">{user.name}</span>
          </div>
          <span className="text-xl font-bold tracking-widest">
            Welcome Back !!!
          </span>
        </div>
      ) : (
        <span className="text-xl font-bold tracking-widest">
          Sign in, please!!!
        </span>
      )}
      <button
        className="p-2 bg-gray-500 text-white ml-auto rounded-lg"
        onClick={() => setUser(null)}>
        {user ? 'Sign out' : 'Sign in'}
      </button>
    </div>
  );
};

export default HeaderMain;
