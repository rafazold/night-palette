import React, { useContext, useEffect, useState } from 'react';
import context from '../../context/context';
import Button from '../shared/Button';
import { checkIsAdmin } from '../../api/api';

const Admin = () => {
  const { user, isAdmin, setIsAdmin } = useContext(context);
  useEffect(() => {
    user
      ? checkIsAdmin(user.uid).then((user) => {
          user.role === 'admin' ? setIsAdmin(true) : setIsAdmin(false);
        })
      : setIsAdmin(false);
  }, [user]);
  return (
    <div className="comp-admin bg-black text-white container mx-auto pt-10">
      {!user ? (
        <div>Please log in to get to the Admin area</div>
      ) : (
        <div className="flex flex-col justify-center items-center">
          <div>Hello {user.displayName}</div>
          <div className="flex items-center mt-10">
            <Button
              className="mr-10"
              secondary={!isAdmin}
              onClick={() => {
                setIsAdmin(true);
              }}
            >
              view admin
            </Button>
            <Button
              onClick={() => {
                setIsAdmin(false);
              }}
              secondary={isAdmin}
            >
              view user
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Admin;
