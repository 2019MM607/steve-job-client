import {createStore, combineReducers, applyMiddleware, compose} from 'redux'
import {authReducer} from './reducers/auth'
import {docentesReducer} from './reducers/docentesReducer'
import {alumnosReducer} from './reducers/alumnosReducer'



import thunk from 'redux-thunk'


const composeEnhancers = (typeof window !== 'undefined' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;
const reducers = combineReducers({
    authReducer,
    docentesReducer,
    alumnosReducer
    
})


export const store = createStore(reducers, composeEnhancers(
applyMiddleware(thunk)
))