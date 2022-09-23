import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuthContext } from '../hooks/useAuthContext';
import { useModeContext } from '../hooks/useModeContext';
import { LightBulbIcon, MenuAlt1Icon, HomeIcon, DocumentAddIcon, LogoutIcon, XIcon } from '@heroicons/react/solid';

const Navbar = () => {
  const { user, dispatch } = useAuthContext();
  const { changeMode, mode } = useModeContext();

  const [ isOpen, setIsOpen ] = useState(false);

  const handleOpen = () => {
   changeMode(mode === "dark" ? "light" : "dark");
  }

  const handleLogOut = () => {
    localStorage.removeItem('user');
    dispatch({ type: 'LOGOUT' });
  }

  const handleMenuOpen = () => {
    setIsOpen(true);
  }

  const handleMenuClose = () => {
    setIsOpen(false);
  }
 
  return (
    <div>
      <nav className={`navbar p-3 flex justify-between App ${mode} border-b-2 border-gray-300 items-center`}> 
        <Link to='/' className={`App ${mode} text-black font-semibold`}>Project Manager</Link>

        <div className={`App ${mode} space-x-2 flex items-center`}>

          {!user && <Link to='/signup' className={`App ${mode} text-black text-sm font-semibold`}>Signup</Link>}
          {!user && <Link to='/login' className={`App ${mode} text-black text-sm font-semibold`}>Login</Link>}
          {user && <p className='hidden md:block text-sm font-semibold'>Welcome, {user.user.userName.toUpperCase()}</p>}
          {user && <button className={`App ${mode} hidden md:block text-black border-2 px-1 py-1 border-gray-300 rounded-md text-sm`} onClick={handleLogOut}>Logout</button>}

          {!isOpen &&  <div className='block md:hidden'>
            {user && <MenuAlt1Icon className='h-5 cursor-pointer' onClick={handleMenuOpen}/>}
          </div>}

          {isOpen && <div className='block md:hidden'>
            <XIcon className='h-5 cursor-pointer' onClick={handleMenuClose}/>
          </div>}

          <div className='hidden md:block'>
            <LightBulbIcon 
              className='h-5 cursor-pointer' 
              onClick={handleOpen}
              style={{ filter: mode === "dark" ? "invert(10%)" : "invert(20%)" }}/>
          </div>

        </div>
      </nav>

      {isOpen && <div className={`App ${mode} px-3 py-3 border-b-2 border-gray-300`}>
        {user && <p className='text-sm font-semibold mt-2'>Welcome, {user.user.userName.toUpperCase()}</p>}

        <div className='flex items-center space-x-1 mt-5'>
          <HomeIcon className='h-5'/>
          <Link to='/' className='text-sm'>Dashboard</Link>
        </div>

        <div className='flex items-center space-x-1 mt-5'>
          <DocumentAddIcon className='h-5'/>
          <Link to='/form' className='text-sm'>Add New</Link>
        </div>
        
        <div className='flex items-center space-x-1 mt-5'>
          <LogoutIcon className='h-5'/>
          {user && <button className={`App ${mode} text-black text-sm`} onClick={handleLogOut}>Logout</button>}
        </div>

        <div className='mt-5 flex items-center'>
            <LightBulbIcon 
              className='h-5 cursor-pointer' 
              onClick={handleOpen}
              style={{ filter: mode === "dark" ? "invert(10%)" : "invert(20%)" }}/>
              <span className='cursor-pointer text-sm' onClick={handleOpen}>Toggle mode</span>
        </div>
      </div>}

    </div>
  )
}

export default Navbar;