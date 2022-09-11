import React, {useState, useEffect } from 'react';
import { useDataContext } from '../hooks/useDataContext';
import { useAuthContext } from '../hooks/useAuthContext';

//components project card
import ProjectCard from './ProjectCard';
import ProjectFilter from './ProjectFilter';

const Dashboard = () => {
  const { user } = useAuthContext();
  const { data, dispatch } = useDataContext();
  const [ loading, setIsLoading ] = useState(false);
  const [ error, setError ] = useState(null);

  //filter
  const [ filter, setFilter ] = useState('all');

  //filter function prop
  const changeFilter = (filteredProject) => {
    setFilter(filteredProject);
  }

  const filteredProper = data && data.filter((d) => {
    switch(filter){
      case "all":
        return true;
      case "mine":
        let assignedTome = false;
        d.assignedUsers.forEach((u) => {
          if(user.user._id === u.id){
            assignedTome = true;
          }
        });
        return assignedTome;
      case "development":
      case "marketing":
      case "design":
        return d.category === filter;
      default: 
        return true;
    };
  });

  useEffect(() => {
    const fetchProjects = async () => {
      setIsLoading(true);
      setError(null);

      try{
        const res = await fetch('http://localhost:8000/getprojects');
        if(!res.ok){
          throw new Error(res.statusText);
        }

        const json = await res.json();
        if(res.ok){
          dispatch({ type: 'GET_DATA', payload: json });
          setError(null)
          setIsLoading(false);
        }
      }catch(error){
        setError(error);
        setIsLoading(false);
      }
      
    }

    fetchProjects();
  }, [dispatch]);

  return (
    <div className='h-44 w-full mt-3'>
      {loading && <p className='font-semibold'>loading...</p>}
      {error && <p className='text-red-500 font-semibold'>{error.message} :(</p>}
      <h1 className='text-3xl font-semibold'>Dashboard</h1>
      {data && <ProjectFilter filter={filter} changeFilter={changeFilter} />}
      {filter && <p className='mt-2'>{filter} category</p>}
      {data.length < 1 && <p className='text-sm text-light'>Sorry :( No projects. Please click on
      <span className='font-bold'> Add New</span> at the left sidebar to create a project.</p>}
      {data && <ProjectCard projects={filteredProper} />}
    </div>
  )
}

export default Dashboard;