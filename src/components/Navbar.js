import { Link } from 'react-router-dom';
import { useAuthContext } from '../hooks/useAuthContext';
import { useModeContext } from '../hooks/useModeContext';
import { LightBulbIcon } from '@heroicons/react/solid';

const Navbar = () => {
  const { user, dispatch } = useAuthContext();
  const { changeMode, mode } = useModeContext();

  const handleOpen = () => {
   changeMode(mode === "dark" ? "light" : "dark");
  }

  const handleLogOut = () => {
    localStorage.removeItem('user');
    dispatch({ type: 'LOGOUT' });
  }
 
  return (
    <nav className={`navbar p-6 flex justify-around App ${mode} border-b-2 border-gray-300`}> 
        <Link to='/' className={`App ${mode} text-black hover:border-b-2 hover:border-gray-900 font-semibold`}>Project.io</Link>

        <div className={`App ${mode} space-x-4 flex items-center`}>
          {!user && <Link to='/signup' className={`App ${mode} text-black hover:border-b-2 hover:border-gray-900 text-sm font-semibold`}>Signup</Link>}
          {!user && <Link to='/login' className={`App ${mode} text-black hover:border-b-2 hover:border-gray-900 text-sm font-semibold`}>Login</Link>}
          {user && <p className='text-sm font-semibold'>Welcome, {user.user.userName.toUpperCase()}</p>}
          {user && <button className={`App ${mode} text-black border-2 px-1 py-1 border-gray-300 rounded-md text-sm`} onClick={handleLogOut}>Logout</button>}
          <div>
            <LightBulbIcon 
              className='h-5 cursor-pointer' 
              onClick={handleOpen}
              style={{ filter: mode === "dark" ? "invert(10%)" : "invert(100%)" }}/>
          </div>
        </div>
    </nav>
  )
}

export default Navbar;