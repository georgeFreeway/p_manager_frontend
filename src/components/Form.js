import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Select from 'react-select';

//user hook
import { useUsers } from '../hooks/useUsers';
import { useAuthContext } from '../hooks/useAuthContext';
import { useDataContext } from '../hooks/useDataContext';
import { useModeContext } from '../hooks/useModeContext';
//category array
const categories = [
  {value: "development", label: "development"},
  {value: "design", label: "design"},
  {value: "marketing", label: "marketing"}
];



const Form = () => {
  const { user } = useAuthContext();
  const { mode } = useModeContext();

  const { dispatch } = useDataContext();
  const { documents } = useUsers();
  const [users, setUsers] = useState([]);

  const navigate = useNavigate();

  const [name, setName] = useState('');
  const [details, setDetails] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [category, setCategory] = useState('');
  const [assignedUsers, setAssignedUsers] = useState([]);
  const [ loading, setIsLoading ] = useState(false);
  const [error, setError] = useState(null);

  //map documents to produce a new array
  useEffect(() => {
    if(documents){
      const options = documents.map((user) => {
        return { value: user, label: user.userName }
      });
      setUsers(options);
    }
  }, [documents]);

  //reset function
  const reset = () => {
    setError(null);
    setName('');
    setDetails('');
    setDueDate('');
    setCategory('');
    setAssignedUsers([]);
  }

  const handleForm = async (e) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    //assigned users new array
    const assignedUsersList = assignedUsers.map((aUser) => {
      return {
        username: aUser.value.userName,
        id: aUser.value._id
      }
    });

    const createdBy = {
      userName: user.user.userName,
      id: user.user._id
    }

    if(!name || !details || !dueDate){
      setError('Please fill the required fields!!');
      setIsLoading(false);
      return;
    }

    if(!category){
      setError('Please chose a category');
      setIsLoading(false);
      return;
    }

    if(assignedUsers.length < 1){
      setError('Please assign users');
      setIsLoading(false);
      return;
    }

    //project object
    const data = { 
      name, 
      details, 
      dueDate, 
      category: category.value,
      comment: [],
      createdBy, 
      assignedUsers: assignedUsersList
    };

    //posting the project object
    const res = await fetch('https://team-project-manager.herokuapp.com/postprojects', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data)
    });

    const json = await res.json();

    if(!res.ok){
      setError(json.error);
      setIsLoading(false);
    }

    if(res.ok){
      setIsLoading(false);
      setError(null);
      dispatch({ type: 'POST_DATA', payload: json });
      navigate('/');
    }
    reset();
  }

  return (
    <div className='mt-3 text-center'>
        <h1 className='text-2xl font-semibold'>Add New Project</h1>

        <form onSubmit={handleForm}>
          <div className='px-2 py-1 mt-2'>
          <span className='font-semibold text-sm'>Project Name</span>
            <input 
              type='text'
              placeholder=' Project Name'
              className={`App ${mode} h-12 w-full rounded-md`}
              style={{ border: error ? '1px solid red' : '1px solid gray' }}
              onChange={(e) => setName(e.target.value)}
              value={name}
            />
          </div>
          
          <div className='px-2 py-1'>
          <span className='font-semibold text-sm'>Project Details</span>
            <textarea
              type="text"
              className={`App ${mode} h-12 w-full rounded-md`}
              style={{ border: error ? '1px solid red' : '1px solid gray' }}
              placeholder=' Project Details'
              onChange={(e) => setDetails(e.target.value)}
              value={details}>
              
            </textarea>
          </div>

          <div className='px-2 py-1'>
          <span className='font-semibold text-sm'>Deadline</span>
            <input 
              type='date'
              className={`App ${mode} h-12 w-full rounded-md`}
              style={{ border: error ? '1px solid red' : '1px solid gray' }}
              onChange={(e) => setDueDate(e.target.value)}
              value={dueDate}
            />
          </div>

          <div className='px-2 py-1 mt-3'>
            <span className='font-semibold text-sm'>Select Project Category</span>
            <Select 
              options={categories}
              onChange={(option) => setCategory(option)}
              style={{ border: error ? '1px solid red' : '1px solid gray', background: 'bg-gray-900' }}
              value={category}
            />
          </div>


          <div className='px-2 py-1 mt-3'>
          <span className='font-semibold text-sm'>Assign Users</span>
            <Select 
              options={users}
              onChange={(option) => setAssignedUsers(option)}
              style={{ border: error ? '1px solid red' : '1px solid gray' }}
              className={`App ${mode}`}
              value={assignedUsers}
              isMulti
            />
          </div>

          {!loading && <button className='px-2 py-2 bg-green-900 text-white text-sm rounded-md mt-3 mb-3'>
            Add Project
          </button>}

          {loading && <button disabled className='px-2 py-2 bg-green-900 text-white text-sm rounded-md mt-3 mb-3'>
            Add Project
          </button>}
          {error && <p className='text-red-400'>{error}</p>}
        </form>
    </div>
  )
}

export default Form;