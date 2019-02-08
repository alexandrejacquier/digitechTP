import axios from 'axios';

//USER
export function loginUser({email,password}){
    const request = axios.post('/api/login',{email,password})
                .then(response => response.data);

    return {
        type:'USER_LOGIN',
        payload:request
    }
}

export function auth(){
    const request = axios.get('/api/auth')
                .then(response => response.data);

    return {
        type:'USER_AUTH',
        payload:request
    }

}

export function getUsers(){
    const request = axios.get(`/api/users`)
                    .then(response => response.data);
        
    return {
        type:'GET_USER',
        payload:request
    }
}


export function userRegister(user,userList){
    const request = axios.post(`/api/register`,user);

    return (dispatch) =>{
        request.then(({data})=>{
            let users = data.success ? [...userList,data.user]:userList;
            let response = {
                success:data.success,
                users
            }

            dispatch({
                type:'USER_REGISTER',
                payload:response
            })
        })
    }
}

//SOCIETE
export function getSocietes(){
    const request = axios.get('/api/societesByUser').then(response => response.data);
    //console.log(`/api/societesByUser?id=${userId}`);

    return {
        type: 'GET_SOCIETES',
        payload: request
    }
}
export function clearSocietes(){
    return {
        type: 'CLEAR_SOCIETES',
        payload: {}
    }
}

export function getSociete(Id){
    const request = axios.get('/api/getSociete', {
        params: {
            id: Id
        }
    }).then(response => response.data);

    return {
        type: 'GET_SOCIETE',
        payload: request
    }
}

export function addSociete(societe){
    const request = axios.post('/api/societe',societe)
        .then(response => response.data);

    return {
        type:'ADD_SOCIETE',
        payload:request
    }
}
export function clearNewSociete(){
    return {
        type: 'CLEAR_NEWSOCIETE',
        payload: {}
    }
}

export function updateSociete(data){
    const request = axios.post(`/api/updateSociete`,data)
                .then(response => response.data);

    return {
        type:'UPDATE_SOCIETE',
        payload:request
    }
}

export function deleteSociete(id){
    const request = axios.delete(`/api/deleteSociete?id=${id}`)
                    .then(response => response.data);

    return {
        type:'DELETE_SOCIETE',
        payload:request
    }
}

//FORMULAIRE
export function getFormulairesBySociete(societeId, order){
    const request = axios.get('/api/formulairesBySociete', {
        params: {
            id: societeId,
            order: order
        }
    }).then(response => {
        return( response.data.map(fData => {
            return({
                ...fData,
                EBITDA: fData.CA - fData.FA - fData.CS - fData.FG - fData.AF
            })
        }))
    });

    return {
        type: 'GET_FORMULAIRESBYSOCIETE',
        payload: request
    }
}

export function getFormulaire(id){
    const request = axios.get('/api/getFormulaire', {
        params: {
            id: id
        }
    }).then(response => {
        const fData = response.data;
            return({
                ...fData,
                EBITDA: fData.CA - fData.FA - fData.CS - fData.FG - fData.AF
            })
    });

    return {
        type: 'GET_FORMULAIRE',
        payload: request
    }
}

export function clearFormulaires(){
    return {
        type: 'CLEAR_FORMULAIRES',
        payload: {}
    }
}

export function addFormulaire(formulaire){
    const request = axios.post('/api/formulaire',formulaire)
        .then(response => response.data);

    return {
        type:'ADD_FORMULAIRE',
        payload:request
    }
}
export function clearNewFormulaire(){
    return {
        type: 'CLEAR_NEWFORMULAIRE',
        payload: {}
    }
}

export function updateFormulaire(data){
    const request = axios.post(`/api/updateFormulaire`,data)
                .then(response => response.data);

    return {
        type:'UPDATE_FORMULAIRE',
        payload:request
    }
}

export function deleteFormulaire(id){
    const request = axios.delete(`/api/deleteFormulaire?id=${id}`)
                    .then(response => response.data);

    return {
        type:'DELETE_FORMULAIRE',
        payload:request
    }
}