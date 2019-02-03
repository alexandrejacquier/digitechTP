import React, { Component } from 'react';
import { connect } from 'react-redux';

import { getFormulaire, getFormulairesBySociete, addFormulaire, updateFormulaire } from '../actions';

import EditFormulaire from '../components/formulaires/editFormulaire.js';

 class EditFormulaireContainer extends Component {

    constructor(props){
        super(props);
    }

    componentWillMount(){
        this.props.dispatch(getFormulaire(this.props.match.params.id)).then(() => {
            //console.log("Dispatch ended");
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

    renderFormulaire(){
        return(
            this.props.formulaire ?

                <EditFormulaire key={this.props.formulaire._id}
                societeId={this.props.formulaire.societeId} 
                saveFormulaire={this.sendUpdateFormulaire}
                formulaire={this.props.formulaire}/>

            : null
        );
    }

    render() {
        return (
            <div className="PageContent">
                <div className="EditFormContainer">
                    {this.renderFormulaire()}   
                </div>
            </div>
        )
    }
}

function mapStateToProps(state){
    return {
        formulaire: state.formulaires.formulaire
    }
}

export default connect(mapStateToProps)(EditFormulaireContainer);