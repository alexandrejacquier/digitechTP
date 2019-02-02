export default function(state={},action){
    switch(action.type){
        case 'GET_FORMULAIRESBYSOCIETE':
            return {...state, list:action.payload}
        case 'GET_FORMULAIRE':
            return {...state, formulaire:action.payload}
        case 'CLEAR_FORMULAIRE':
            return {...state, list:action.payload};
        case 'ADD_FORMULAIRE':
            return {...state, newFormulaire:action.payload};
        case 'CLEAR_NEWFORMULAIRE':
            return {...state, newFormulaire:action.payload};
        case 'UPDATE_FORMULAIRE':
            return {
                    ...state,
                    updateFormulaire:action.payload.success,
                    formulaire:action.payload.doc
                    };
        case 'DELETE_FORMULAIRE':
            return {...state, deleted:action.payload};
        default:
            return state;
    }
}