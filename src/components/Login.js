import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuthContext } from '../hooks/useAuthContext';
import { useModeContext } from '../hooks/useModeContext';

const Login = () => {
  const { dispatch } = useAuthContext();
  const { mode } = useModeContext();

  const [ email, setEmail ] = useState('');
  const [ password, setPassword ] = useState('');
  const [ error, setError ] = useState(null);

  const resetForm = () => {
    setEmail('');
    setPassword('');
  }

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(null);

    const data = { email, password }

    const res = await fetch('http://localhost:8000/users/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    });

    const json = await res.json();

    if(!res.ok){
      setError(json.error)
    }

    if(res.ok){
      setError(null);
      localStorage.setItem('user', JSON.stringify(json));
      dispatch({ type: 'LOGIN', payload: json });
      resetForm();
    }

  }
  return (
    <div className= {`App ${mode} container mx-auto text-center p-6`}>
      <h1 className={`App ${mode} text-2xl font-semibold text-gray-900`}>Login to your account</h1>
      <p className='text-gray-400 mt-1 text-sm'>Don't have an account? <Link to='/signup' className='text-gray-600 font-bold text-sm'>Create an account today</Link></p>

      <form onSubmit={handleLogin}>
        <div>
          <input 
            type='text'
            placeholder=' Enter Your Email Address'
            className={`App ${mode} h-12 w-96 mt-2 rounded-md`}
            style={{ border : error ? '1px solid red' : '1px solid gray' }}
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
        </div>

        <div>
          <input 
            type='password'
            placeholder=' Enter Your Password'
            className={`App ${mode} h-12 w-96 mt-2 rounded-md`}
            style={{ border: error ? '1px solid red' : '1px solid gray' }}
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
        </div>

        <button className='mt-2 bg-gray-900 px-2 py-2 rounded-md text-white w-24 text-sm'>
            Login
        </button>
        {error && <p className='text-red-700'>{error}</p>}
      </form>
    </div>
  )
}

export default Login;