import React from 'react';
import { Link } from 'react-router-dom';

const ProjectCard = ({ projects }) => {
  
  return (
    <div className='md:flex md:items-center md:space-x-4 mt-5'>
      {projects.map((project) => (
        <div className='border-2 border-gray-200 rounded-md mt-2 px-3 py-3 shadow-lg' key={project._id}>
            <h1 className='font-bold text-1xl'>{project.name.toUpperCase()}</h1>
            <hr />
            <p className='font-semibold text-sm mb-2'>Deadline - {project.dueDate}</p>
            <Link to={`/project/${project._id}`} className='text-sm px-1.5 py-1.5 bg-gray-900 rounded-md text-white'>More details...</Link>
        </div>
    ))}
    </div>
  )
}

export default ProjectCard;