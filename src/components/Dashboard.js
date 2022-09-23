import React, {useState, useEffect } from 'react';
import { useDataContext } from '../hooks/useDataContext';

//components project card
import ProjectCard from './ProjectCard';
import ProjectFilter from './ProjectFilter';

const Dashboard = () => {
  const { data, dispatch } = useDataContext();
  const [ loading, setIsLoading ] = useState(false);
  const [ error, setError ] = useState(null);

  //filter
  const [ filter, setFilter ] = useState('all');
  //filter function prop
  const changeFilter = (filteredProject) => {
    setFilter(filteredProject);
  }

  useEffect(() => {
    const fetchProjects = async () => {
      setIsLoading(true);
      setError(null);

      try{
        const res = await fetch('https://team-project-manager.herokuapp.com/getprojects');
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

  const filteredProper = data && data.filter((d) => {
    switch(filter){
      case "all":
        return true;
      case "development":
        return d.category === filter;
      case "marketing":
        return d.category === filter;
      case "design":
        return d.category === filter;
      default: 
        return true;
    };
  });

  return (
    <div className='h-full'>
      {loading && <p className='font-semibold text-sm'>loading...</p>}
      {error && <p className='text-red-500 font-semibold text-sm'>{error.message} :(</p>}
      <h1 className='text-3xl font-semibold'>Dashboard</h1>
      <p className='text-sm font-semibold mt-2 mb-1'>Filter by:</p>
      {data && <ProjectFilter filter={filter} changeFilter={changeFilter} />}
      {data.length < 1 && <p className='text-sm text-light'>Sorry :( No projects. Please click on the menu button or 
      <span className='font-bold'> Add New</span> at the left sidebar to create a project.</p>}
      {data && <ProjectCard projects={filteredProper} />}
    </div>
  )
}

export default Dashboard;