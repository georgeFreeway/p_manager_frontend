import { useContext } from 'react';
import { ModeContext } from '../contexts/ModeContext';

export const useModeContext = () => {
    const context = useContext(ModeContext);

    if(!context){
        throw Error('context out of context');
    }

    return context;
}