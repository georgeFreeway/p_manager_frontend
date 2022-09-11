import React from 'react';
import { Link } from 'react-router-dom';
import { useAuthContext } from '../hooks/useAuthContext';
import { useModeContext } from '../hooks/useModeContext';

//icons
import { HomeIcon, DocumentAddIcon, UserIcon } from '@heroicons/react/solid';

const Sidebar = () => {
  const { user } = useAuthContext();
  const { mode } = useModeContext();

  return (
    <div className={`App ${mode} h-80 w-44 bg-gray-100 mt-3 flex flex-col border-r-2 border-gray-300`}>
      <div className='flex items-center px-2 py-2 space-x-1 hover:bg-gray-900 hover:text-gray-100'>
        <UserIcon className='h-5'/>
        {user && <p className='text-sm'>{user.user.userName}</p>}
      </div>

      <div className='flex items-center px-2 py-2 space-x-1 hover:bg-gray-900 hover:text-gray-100'>
        <HomeIcon className='h-5'/>
        <Link to='/' className='text-sm'>Dashboard</Link>
      </div>

      <div className='flex items-center px-2 py-2 space-x-1 hover:bg-gray-900 hover:text-gray-100'>
        <DocumentAddIcon className='h-5'/>
        <Link to='/form' className='text-sm'>Add New</Link>
      </div>
    </div>
  )
}

export default Sidebar;