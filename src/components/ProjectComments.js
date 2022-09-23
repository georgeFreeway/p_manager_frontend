import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuthContext } from '../hooks/useAuthContext';
import { useModeContext } from '../hooks/useModeContext';

const ProjectComments = () => {
  const { user } = useAuthContext();
  const { mode } = useModeContext();
  const [ comment, setComment ] = useState('');
  const [ error, setError ] = useState(null);
  const [ loading, setIsLoading ] = useState(false);

  const { id } = useParams();
  const navigate = useNavigate();

  const handleComment = async () => {
    setError(null);
    setIsLoading(true)

    if(!comment){
      setError('Please add a Comment!!');
      setIsLoading(false);
      return;
    }

    const commentToAdd = {
      comment: comment,
      commentor: user.user.userName,
      id: Math.floor(Math.random() * 1000)
    }

    const res = await fetch(`https://team-project-manager.herokuapp.com/projects/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(commentToAdd)
    });

    if(!res.ok){
      setError('An Error Occurred :(');
      setIsLoading(false);
    }

    if(res.ok){
      setIsLoading(false);
      setComment('');
      navigate('/');
    }
  }

  return (
    <div className='py-5'>
        <span className='font-semibold text-2xl'>Project Comments</span>
        <textarea
            type="text"
            className={`App ${mode} h-44 w-full rounded-md p-1`}
            style={{ border: error ? '1px solid red': '1px solid gray' }}
            placeholder=' Project Comments'
            onChange={(e) => setComment(e.target.value)}
            value={comment}
            >   
        </textarea>
        {!loading && <button 
          className='bg-gray-900 px-2 py-2 rounded-md text-white text-sm'
          onClick={handleComment}>
          Add Comment
        </button>}

        {loading && <button disabled
          className='bg-gray-900 px-2 py-2 rounded-md text-white text-sm'
          >
          Add Comment
        </button>}
        {error && <p className='text-red-700'>{error}</p>}
    </div>
  )
}

export default ProjectComments;