

import { useReducer } from 'react'
import tareaContext from './tareaContext-'
import tareaReducer from './tareaReducer'


const TareaState = props => {
    const initialState = {
        tareas: [],

    }

    // crear state y dispatch
    const [state, dispatch] = useReducer( tareaReducer, initialState );

    return (
        <tareaContext.Provider
            value={{
                tareas: state.tareas,
            }}
        >
            {props.children}
        </tareaContext.Provider>
    )
}

export default TareaState;


