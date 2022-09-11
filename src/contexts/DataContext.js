import { createContext, useReducer } from 'react';

export const DataContext = createContext();

const myDataContextReducer = (state, action) => {
    switch (action.type) {
        case 'GET_DATA':
        return{
            data: action.payload
        }
        case 'POST_DATA':
        return{
            data: [ ...state.data, action.payload ],

        }
        default:
        return state;
    }
}

export const DataContextWrapper = ({ children }) => {

    const [state, dispatch] = useReducer(myDataContextReducer, {
        data: [],
    });
    
    return (
        <DataContext.Provider value={{ ...state, dispatch }}>
            {children}
        </DataContext.Provider>
    )
}