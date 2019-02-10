import React, { Component } from 'react';
import { connect } from 'react-redux';

import { getSociete, updateSociete, deleteSociete, getUsers } from '../actions';

import UserSelector from '../components/userSelector/userSelector.js';
import UserList from '../components/userSelector/userList.js';

 class SocieteContainer extends Component {

    constructor(props){
        super(props);
        this.state = {
            societe: {
                id: '',
                name: '',
                adresse: '',
                PDC: '',
                admins:[],
                users:[]
            }
        }
    }

    componentWillMount(){
        this.props.dispatch(getSociete(this.props.match.params.id)).then(() => {
            //console.log("DISPATCH ENDED SOCIETE: ");
            //console.log(this.props.societe);
        })

        this.props.dispatch(getUsers());
    }

    componentWillReceiveProps(nextProps){
        //console.log(nextProps);
        this.setState({societe:nextProps.societe});
    }

    handleInput = (event,name) => {
        /*let value = event.target.value;
        this.setState({[name]:value});*/

        let tmpState = this.state;
        tmpState.societe[name] = event.target.value;
        this.setState(tmpState);
    }

    submitForm = (e) => {
        e.preventDefault();
        this.props.dispatch(updateSociete(this.state.societe))
        this.props.history.push('/');
    }

    addSocAdmin = (user) => {
        //console.log("Try to add admin : " + JSON.stringify(user));
        if(!user || !this.state.societe){return null}

        //SI L'UTILISATEUR EST PAS ADMIN
        if(!this.state.societe.admins.some(adm => {return adm === user._id})){
            let tmpState = this.state;
            tmpState.societe.admins = tmpState.societe.admins.concat(user._id);

            //SI L'UTILISATEUR EST USER, LE RETIRER
            //if(this.state.societe.admins.some(usr => {return usr === user._id})){
                tmpState.societe.users = tmpState.societe.users.filter(u => {return u !== user._id});
            //}
            //console.log(tmpState);
            this.setState(tmpState);
        }
    }

    addSocUser = (user) => {
        //console.log("Try to add user : " + JSON.stringify(user));
        if(!user || !this.state.societe){return null}
        
        //SI L'UTILISATEUR EST NI ADMIN NI USER
        if(
            !(this.state.societe.users.some(usr => {return usr === user._id}))
            && !(this.state.societe.admins.some(adm => {return adm === user._id}))
            ){
            let tmpState = this.state;
            tmpState.societe.users = tmpState.societe.users.concat(user._id);
            //console.log(tmpState);
            this.setState(tmpState);
        }
    }

    getUsersById = (usersId) => {
        if(!this.props.user.users){return null}
        if(this.props.user.users.length){
            return(this.props.user.users.filter(usr => {
                return(
                    usersId.some(uid => uid === usr._id)
                );
            })
            );
        }
        else{
            return(usersId.some(uid => uid === this.props.user.users._id));
        }
    }

    deleteSociete = () => {
        if(window.confirm("La société et ses formulaires vont être supprimés. \nÊtes-vous sûr de votre choix? (ce changement est définitif)")){
            //console.log(this.props.societe)
            /*
            this.props.dispatch(deleteSociete(this.props.societe._id))
            redirect
            */
            this.props.dispatch(deleteSociete(this.props.societe._id));
            this.props.history.push('/');
        }
    }

    isUserSocAdmin = () => {
        //console.log(this.props.user)
        if(this.state.societe.admins.some(adm => {return adm === this.props.user.login.id})){
            //console.log("USER IS ADMIN")
            return true;
        }
        else{
            //console.log("USER IS USER")
            return false;
        }
    }

    render() {
        //console.log(...(!this.isUserSocAdmin() ? 'admin' : 'disabled'))
        //console.log(this.state)
        if(this.state.societe.name !== ''){
            return (
                <div className="PageContent">
                    <div className="rl_container EditFormContainer EditSociete">
                    <form onSubmit={this.submitForm}>
                        <div className="form_element">
                            <label>Nom : </label>
                            <input
                                type="text"
                                id="name"
                                value={this.state.societe.name}
                                onChange={(event)=>this.handleInput(event,'name')}
                                disabled={(this.isUserSocAdmin() ? '' : "disabled")}
                            />
                        </div>
                        <div className="form_element">
                            <label>Adresse : </label>
                            <input
                                type="text"
                                id="adresse"
                                value={this.state.societe.adresse}
                                onChange={(event)=>this.handleInput(event,'adresse')}
                                disabled={(this.isUserSocAdmin() ? '' : "disabled")}
                            />
                        </div>
                        <div className="form_element">
                            <label>Personne de contact : </label>
                            <input
                                type="text"
                                id="PDC"
                                value={this.state.societe.PDC}
                                onChange={(event)=>this.handleInput(event,'PDC')}
                                disabled={(this.isUserSocAdmin() ? '' : "disabled")}
                            />
                        </div>

                        {/* AJOUT D'ADMINS, AJOUT D'UTILISATEURS */}
                        {this.isUserSocAdmin() ? 
                        <UserSelector 
                            users={this.props.user.users} 
                            returnUser={this.addSocAdmin}>administrateur</UserSelector>
                        : null}
                        <UserList 
                            users={this.getUsersById(this.state.societe.admins)} 
                            header="Administrateurs"
                            disabled={(this.isUserSocAdmin() ? 'enabled' : "disabled")}/>
                        {this.isUserSocAdmin() ? 
                        <UserSelector 
                            users={this.props.user.users} 
                            returnUser={this.addSocUser}>utilisateur</UserSelector>
                        : null}
                        <UserList 
                            users={this.getUsersById(this.state.societe.users)} 
                            header="Utilisateurs"
                            disabled={(this.isUserSocAdmin() ? 'enabled' : "disabled")}/>

                        {this.isUserSocAdmin() ? 
                        <div className="Buttons">
                            <div className="Btn">
                                <a onClick={this.submitForm}>Enregistrer</a>
                            </div>

                            <div className="Btn">
                                <a onClick={this.deleteSociete}>Supprimer la société</a>
                            </div> 
                        </div>
                        : null}
                    </form>
                    </div>
                </div>
            )
        }
        else{return null}
    }
}

function mapStateToProps(state){
    return {
        //formulaires: state.formulaires
        societe: state.societes.societe
    }
}

export default connect(mapStateToProps)(SocieteContainer);