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
    <div className={`App ${mode} hidden mt-3 md:h-96 md:w-44 bg-gray-100 md:flex flex-col border-l-2 border-gray-300`}>
      <div className='flex px-2 space-x-1 mb-2'>
        <UserGroupIcon className='h-5'/>
        <h1>Members</h1>
      </div>

      {documents && documents.map((user) => (
        <div key={user._id} className='px-2 mb-2 text-sm'>
          <p>{user.userName}</p>
        </div>
      ))}
    </div>
  )
}

export default Users;