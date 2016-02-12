import thunkMiddleware from 'redux-thunk'
import createLogger from 'redux-logger'
import { createStore, applyMiddleware } from 'redux'
import { fetchPosts } from '../src/actions/Actions'
import rootReducer from '../src/reducers/EmtReducer'

const loggerMiddleware = createLogger();

const store = createStore(
    rootReducer,
    applyMiddleware(
        thunkMiddleware, // lets us dispatch() functions
        loggerMiddleware // neat middleware that logs actions
    )
);


store.dispatch(fetchPosts('572')).then(() =>
    console.log(store.getState()));