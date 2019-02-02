import React, { Component } from 'react';
import { connect } from 'react-redux';

import { getFormulaire, getFormulairesBySociete, addFormulaire, updateFormulaire } from '../actions';

import EditFormulaire from '../components/formulaires/editFormulaire.js';

 class EditFormulaireContainer extends Component {

    constructor(props){
        super(props);

        /*this.state = {
            
        }*/
    }

    componentWillMount(){
        //this.props.dispatch(getFormulairesBySociete(this.props.match.params.societeId));
        //console.log("Searching for formulaire: "+this.props.match.params.id);
        this.props.dispatch(getFormulaire(this.props.match.params.id)).then(() => {
            //console.log("Dispatch ended");
        });
        
    }

    componentWillReceiveProps(nextProps){
        //console.log(nextProps);
    }

    //FONCTION UPDATEFORMULAIRE(FORMULAIRE)
    sendUpdateFormulaire = (formulaire) => {
        //this.props.dispatch(updateBook(this.state.formdata))
        /*console.log(formulaire);
        let reqFormulaire = {...formulaire};
        reqFormulaire.date = new Date(reqFormulaire.date).toJSON();
        delete reqFormulaire._id;
        
        this.setState({jsonReq: reqFormulaire})

        if(formulaire._id === ""){
            this.props.dispatch(addFormulaire(reqFormulaire));
            console.log("SHOULD ADD FORMULAIRE");
        }
        else{
            this.props.dispatch(updateFormulaire(reqFormulaire));
            console.log("SHOULD UPDATE FORMULAIRE");
        }
        console.log(formulaire._id);*/

        formulaire._id ?
            this.props.dispatch(updateFormulaire(formulaire))
        :
            this.props.dispatch(addFormulaire(formulaire));

        //console.log(formulaire);
        this.props.history.push('/');
    }

    /*redirectUser = () => {
        setTimeout(()=>{
            this.props.history.push('/user/user-reviews')
        },1000)
    }*/

    SaveAllChanges(){

    }

    renderFormulaire(){
        return(
            this.props.formulaire ?

            /*this.props.formulaires.list.map( (item) => {
                return(
                    <EditFormulaire key={item._id}
                    societeId={this.props.match.params.societeId} 
                    saveFormulaire={this.sendUpdateFormulaire}
                    formulaire={item}/>
                );
            })*/
                <EditFormulaire key={this.props.formulaire._id}
                societeId={this.props.formulaire.societeId} 
                saveFormulaire={this.sendUpdateFormulaire}
                formulaire={this.props.formulaire}/>

            : null
        );
        //<EditFormulaire societeId={this.props.match.params.societeId} saveFormulaire={this.sendUpdateFormulaire}/>
    }

    render() {
        return (
            <div>
                {this.renderFormulaire()}   
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