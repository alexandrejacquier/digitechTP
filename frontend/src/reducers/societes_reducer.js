export default function(state={},action){
    switch(action.type){
        case 'GET_SOCIETES':
            return {...state, list:action.payload};
        case 'CLEAR_SOCIETES':
            return {...state, list:action.payload};
        case 'GET_SOCIETE':
            return {...state, societe:action.payload};
        case 'ADD_SOCIETE':
            return {...state, newSociete:action.payload};
        case 'CLEAR_NEWSOCIETE':
            return {...state, newSociete:action.payload};
        case 'UPDATE_SOCIETE':
            return {
                    ...state,
                    updateSociete:action.payload.success,
                    societe:action.payload.doc
                    };
        case 'DELETE_SOCIETE':
            return {...state, deleted:action.payload};
        default:
            return state;
    }
}