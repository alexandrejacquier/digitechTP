import React, { Component } from 'react';
import { connect } from 'react-redux';

import { getFormulaire, getSociete, addFormulaire, updateFormulaire, deleteFormulaire } from '../actions';

import EditFormulaire from '../components/formulaires/editFormulaire.js';

 class EditFormulaireContainer extends Component {

    constructor(props){
        super(props);
    }

    componentWillMount(){
        this.props.dispatch(getFormulaire(this.props.match.params.id)).then((res) => {
            //console.log(res);
            this.props.dispatch(getSociete(res.payload.societeId))
        });
        
    }

    //FONCTION UPDATEFORMULAIRE(FORMULAIRE)
    sendUpdateFormulaire = (formulaire) => {
        formulaire._id ?
            this.props.dispatch(updateFormulaire(formulaire))
        :
            this.props.dispatch(addFormulaire(formulaire));

        //console.log(formulaire);
        this.props.history.push('/');
    }

    deleteFormulaire = () => {
        if(window.confirm("Le formulaire va être supprimé. \nÊtes-vous sûr de votre choix? (ce changement est définitif)")){
            //console.log(this.props.formulaire)
            /*
            this.props.dispatch(deleteSociete(this.props.formulaire._id))
            redirect
            */
           this.props.dispatch(deleteFormulaire(this.props.formulaire._id));
           this.props.history.push('/');
        }
    }

    isUserSocAdmin = () => {
        if(!this.props.societe){return false}
        if(this.props.societe.admins.some(adm => {return adm === this.props.user.login.id})){
            //console.log("USER IS ADMIN")
            return true;
        }
        else{
            //console.log("USER IS USER")
            return false;
        }
    }

    renderFormulaire(){
        return(
            this.props.formulaire ?

                <EditFormulaire key={this.props.formulaire._id}
                societeId={this.props.formulaire.societeId} 
                saveFormulaire={this.sendUpdateFormulaire}
                deleteFormulaire={this.deleteFormulaire}
                formulaire={this.props.formulaire}
                disabled={(this.isUserSocAdmin() ? '' : "disabled")}/>

            : null
        );
    }

    render() {
        //console.log(this.props)
        return (
            <div className="PageContent">
                <div className="EditFormContainer">
                    {this.renderFormulaire()}
                    {/*this.isUserSocAdmin() ? 
                    <div className="Btn">
                        <a onClick={this.sendUpdateFormulaire}>Enregistrer</a> 
                    </div>
                    : null}
                    {this.isUserSocAdmin() ? 
                    <div className="Btn">
                            <a onClick={this.deleteFormulaire}>Supprimer le formulaire</a>
                    </div>
                    : null*/}
                </div>
        </div>
        )
    }
}

function mapStateToProps(state){
    return {
        formulaire: state.formulaires.formulaire,
        societe: state.societes.societe
    }
}

export default connect(mapStateToProps)(EditFormulaireContainer);