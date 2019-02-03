import React, { Component } from 'react';
import { connect } from 'react-redux';

import { getSociete } from '../actions';

import { updateSociete } from '../actions';

 class SocieteContainer extends Component {

    constructor(props){
        super(props);
        this.state = {
            id: '',
            name: '',
            adresse: '',
            PDC: '',
            admins:[],
            users:[]
        }
    }

    componentWillMount(){
        this.props.dispatch(getSociete(this.props.match.params.id)).then(() => {
            //console.log("DISPATCH ENDED SOCIETE: ");
            //console.log(this.props.societe);
        })
    }

    componentWillReceiveProps(nextProps){
        console.log(nextProps.societe.societe);
        this.setState({...nextProps.societe.societe});
    }

    handleInput = (event,name) => {
        let value = event.target.value;
        this.setState({[name]:value});
    }

    submitForm = (e) => {
        e.preventDefault();
        this.props.dispatch(updateSociete(this.state))
        this.props.history.push('/');
    }

    render() {
        if(this.state.name !== ''){
            return (
                <div className="PageContent">
                    <div className="EditSocietePageContent">
                    <form onSubmit={this.submitForm}>
                        <div className="form_element">
                            <label>Nom : </label>
                            <input
                                id="name"
                                value={this.state.name}
                                onChange={(event)=>this.handleInput(event,'name')}
                            />
                        </div>
                        <div className="form_element">
                            <label>Adresse : </label>
                            <input
                                id="adresse"
                                value={this.state.adresse}
                                onChange={(event)=>this.handleInput(event,'adresse')}
                            />
                        </div>
                        <div className="form_element">
                            <label>Personne de contact : </label>
                            <input
                                id="PDC"
                                value={this.state.PDC}
                                onChange={(event)=>this.handleInput(event,'PDC')}
                            />
                        </div>
                        <div className="Btn">
                            <a onClick={this.submitForm}>Enregistrer</a>
                        </div>
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
        societe: state.societes
    }
}

export default connect(mapStateToProps)(SocieteContainer);