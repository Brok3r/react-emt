import {createStore} from 'redux';
import counter from '../reducers/EmtReducer'

let store = createStore(counter);

export default store;