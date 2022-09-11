import { useModeContext } from '../hooks/useModeContext';


const ProjectFilter = ({ filter, changeFilter }) => {
    const { mode } = useModeContext()
    //array filters
    const projects = [ "all", "development", "marketing", "design" ];

    //filter button handler
    const handleFilter = (filteredProject) => {
        changeFilter(filteredProject);
    }

    return (
        <nav className={`App ${mode} flex space-x-3 border-2 border-gray-300 px-2 py-2 rounded-md items-center`}>
            <p className='p-1'>Filter by: </p>
            {projects.map((p) => (
                <button 
                    className={`App ${mode} px-1 py-1`}
                    style={{ background: filter === p ? 'black': '' }}
                    key={p}
                    onClick={() => handleFilter(p)}>
                        <p className={`text-gray-400 font-semibold rounded-md`}>{p}</p>
                </button>
            ))}
        </nav>
    )
}

export default ProjectFilter;