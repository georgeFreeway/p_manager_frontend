import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuthContext } from '../hooks/useAuthContext';

//project comments
import ProjectComments from './ProjectComments';

const ProjectDetails = () => {
  const { id } = useParams();
  const { user } = useAuthContext();

  const navigate = useNavigate();

  const [ loading, setIsLoading ] = useState(false);
  const [ error, setError ] = useState(null);
  const [ project, setProject ] = useState(null);

  useEffect(() => {
    const getSingleProject = async () => {

      setIsLoading(true);
      setError(null);

      try{
        const res = await fetch(`https://team-project-manager.herokuapp.com/getprojects/${id}`);
        if(!res.ok){
          throw new Error(res.statusText);
        }

        const json = await res.json();
        if(res.ok){
          setProject(json);
          setError(null)
          setIsLoading(false);
        }
      }catch(error){
        setError(error);
        setIsLoading(false);
      }
      
    }

    getSingleProject();
  }, [id]);

  const handleDelete = async (id) => {
    
    const res = await fetch(`https://team-project-manager.herokuapp.com/projects/${id}`, {
      method: 'DELETE'
    });

    const json = await res.json();

    if(!res.ok){
      console.log(json);
    }

    if(res.ok){
      navigate('/');
    }
  }

  return (
    <div>
      {loading && <p>loading...</p>}
      {error && <p>{error.message}</p>}
      <div className='xl:flex items-start justify-between p-1.5'>

        {project && <div>
          {/* project name */}
          <h1 className='text-2xl md:text-3xl font-semibold mt-4'>{project.name.toUpperCase()}</h1>
          
          {user.user._id === project.createdBy.id && <button 
            className='px-2 py-2 border-2 border-red-500 bg-red-300 rounded-sm mt-2'
            onClick={() => handleDelete(project._id)}>
            Mark As Completed
          </button>}

          {/* project details */}
          <h2 className='md:text-2xl font-semibold mt-3'>Details</h2>
          <p className='text-sm text-light mb-3'> {'.'} {project.details}</p>

          {/* project duedate */}
          <h2 className='md:text-2xl font-semibold'>Deadline</h2>
          <p className='text-sm text-light mb-3'> {'.'} {project.dueDate}. Please take deadline serious :)</p>

          {/* project category */}
          <h2 className='md:text-2xl font-semibold'>Category</h2>
          <p className='text-sm text-light mb-3'> {'.'} {project.category.toUpperCase()}</p>

          {/* assigned users */}
          <h2 className='md:text-2xl font-semibold'>Assigned Users</h2>
          <p className='text-sm text-light mb-3'>This project is assigned to</p>
          {project.assignedUsers.map((user) => (
            <p key={user.id} className='text-sm text-light mb-3'> {'.'} {user.username}</p>
          ))}

          {/* project creator */}
          <h2 className='md:text-2xl font-semibold'>Project Created By</h2>
          <p className='text-sm text-light mb-10'> {'.'} {project.createdBy.userName}</p>

          {/* project comments */}
          <h2 className='md:text-2xl font-semibold'>Comments</h2>
          {project.comment && project.comment.map((comment) => (
            <div key={comment.id} className='border-2 border-gray-100 px-2 py-2 rounded-md mb-2'>
              <p className='text-sm font-bold'>{comment.commentor}</p>
              <p className='text-sm'>{comment.comment}</p>
            </div>
          ))}

        </div>}
        <ProjectComments />
      </div>
    </div>
  )
}

export default ProjectDetails;