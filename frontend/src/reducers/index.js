import { combineReducers } from 'redux';

import user from './user_reducer.js';
import societes from './societes_reducer.js';
import formulaires from './formulaires_reducer.js';

const rootReducers = combineReducers({
    user,
    societes,
    formulaires
})

export default rootReducers;