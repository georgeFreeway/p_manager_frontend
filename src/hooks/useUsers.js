import { useState, useEffect } from 'react';

export const useUsers = () => {
    const [ documents, setDocuments ] = useState([]);

    useEffect(() => {
        const getAllusers = async () => {
            const res = await fetch('http://localhost:8000/users/getallusers');

            const json = await res.json();

            if(res.ok){
                setDocuments(json);
            }
        }

        getAllusers();
    }, []);

    return { documents };
}