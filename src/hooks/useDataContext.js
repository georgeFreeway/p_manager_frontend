import { useContext } from 'react';
import { DataContext } from '../contexts/DataContext';

export const useDataContext = () => {
    const context = useContext(DataContext);

    if(!context){
        throw Error('context out of context');
    }

    return context;
}