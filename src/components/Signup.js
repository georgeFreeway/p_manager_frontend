import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuthContext } from '../hooks/useAuthContext';
import { useModeContext } from '../hooks/useModeContext';

const Signup = () => {
  const { dispatch } = useAuthContext();
  const { mode } = useModeContext();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [userName, setUserName] = useState('');
  const [error, setError] = useState(null);

  const resetForm = () => {
    setEmail('');
    setPassword('');
    setUserName('');
  }
 
  //form submitting
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    const data = { email, password, userName };
    // console.log(data);

    const res = await fetch('https://team-project-manager.herokuapp.com/users/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    });

    const json = await res.json();
    if(!res.ok){
      setError(json.error);
    }
    
    if(res.ok){
      setError(null);
      localStorage.setItem('user', JSON.stringify(json));
      dispatch({ type: 'LOGIN', payload: json });
      resetForm();
    }

  }

  return (
    <div className='container mx-auto text-center pb-96 pt-10'>
      <h1 className='text-2xl font-semibold'>Start working remotely with friends today</h1>
      <p className='text-gray-400 mt-1 text-sm'>Already have an account? <Link to='/login' className='text-gray-600 font-bold text-sm'>Log in to your account</Link></p>

      <form onSubmit={handleSubmit} encType='multipart/form-data'>
        <div>
          <input 
            type='text'
            placeholder=' Enter A Valid Email Address'
            className={`App ${mode} h-12 w-full lg:w-96 mt-2 rounded-md`}
            style={{ border: error ? '1px solid red' : '1px solid gray' }}
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
        </div>

        <div>
          <input 
            type='password'
            placeholder=' Enter A Secured Password'
            className={`App ${mode} h-12 w-full lg:w-96 mt-2 rounded-md`}
            style={{ border: error ? '1px solid red' : '1px solid gray' }}
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
        </div>

        <div>
          <input 
            type='text'
            placeholder=' Enter A User Name'
            className={`App ${mode} h-12 w-full lg:w-96 mt-2 rounded-md`}
            style={{ border: error ? '1px solid red' : '1px solid gray' }}
            onChange={(e) => setUserName(e.target.value)}
            value={userName}
          />
        </div>

        <button className='mt-2 bg-gray-900 px-2 py-2 rounded-md text-white text-sm'>
            Create Account
        </button>
        {error && <p className='text-red-700'>{error}</p>}
      </form>
    </div>
  )
}

export default Signup;