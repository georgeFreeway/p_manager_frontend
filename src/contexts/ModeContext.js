import { createContext, useReducer } from 'react';

export const ModeContext = createContext();

const myModeReducer = (state, action) => {
    switch(action.type){
        case 'CHANGE_MODE':
        return{
            mode: action.payload
        }
        default:
        return state;
    }
}

export const ModeContextWrappper = ({ children }) => {

    const [state, dispatch] = useReducer(myModeReducer, {
        mode: 'dark'
    });

    const changeMode = (mode) => {
        dispatch({ type: 'CHANGE_MODE', payload: mode})
    };

    return (
        <ModeContext.Provider value={{ ...state, dispatch, changeMode }}>
            { children }
        </ModeContext.Provider>
    )
}

export default ModeContextWrappper;