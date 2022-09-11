import React from 'react';
//users hook
import { useUsers } from '../hooks/useUsers';
import { useModeContext } from '../hooks/useModeContext';
//icons
import { UserGroupIcon } from '@heroicons/react/solid';

const Users = () => {
  const { documents } = useUsers();
  const { mode } = useModeContext();

  return (
    <div className={`App ${mode} h-80 w-44 mt-3 border-l-2 border-gray-300`}>
      <div className={`App ${mode} flex items-center p-3 space-x-1`}>
        <UserGroupIcon className={`App ${mode} h-5`}/>
        <h1 className={`App ${mode} text-gray-900 font-semibold text-2xl`}>Users</h1>
      </div>

      {documents && documents.map((document) => (
          <div className='flex flex-col px-3' key={document._id}>
            <p className='text-sm'>{document.userName}</p>
          </div>
      ))}
    </div>
  )
}

export default Users;