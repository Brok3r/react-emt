import { combineReducers } from 'redux'
import {requestPost} from '../actions/Actions'
import {RECEIVE_POSTS, REQUEST_POSTS} from '../constants/ActionTypes'



function post(state = {
    isFetching: false,
    didInvalidate: false,
    items: []
}, action) {
    switch (action.type) {
        case REQUEST_POSTS:
            return Object.assign({}, state, {
                isFetching: true,
                didInvalidate: false
            });
        case RECEIVE_POSTS:
            return Object.assign({}, state, {
                isFetching: false,
                didInvalidate: false,
                items: action.posts,
                lastUpdated: action.receivedAt
            });
        default:
            return state
    }
}

const rootReducer = combineReducers({
    post

});

export default rootReducer