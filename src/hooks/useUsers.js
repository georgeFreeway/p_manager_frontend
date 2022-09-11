import { useState, useEffect } from 'react';

export const useUsers = () => {
    const [ documents, setDocuments ] = useState([]);

    useEffect(() => {
        const getAllusers = async () => {
            const res = await fetch('https://team-project-manager.herokuapp.com/users/getallusers');

            const json = await res.json();

            if(res.ok){
                setDocuments(json);
            }
        }

        getAllusers();
    }, []);

    return { documents };
}