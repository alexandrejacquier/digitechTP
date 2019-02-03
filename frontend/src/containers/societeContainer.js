import React, { Component } from 'react';
import { connect } from 'react-redux';

import { getSociete } from '../actions';

//import { getFormulairesBySociete } from '../actions';

 class SocieteContainer extends Component {

    constructor(props){
        super(props);
        this.state = {
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
        //console.log(nextProps.societe.societe);
        this.setState({...nextProps.societe.societe});
    }

    render() {
        if(this.state.name !== ''){
            return (
                <div className="PageContent">
                    <h1>{this.state.name}</h1>
                    <p>Adresse : {(this.state.adresse && this.state.adresse !== '') ? this.state.adresse : 'Non renseignée'}</p>
                    <p>Personne de contact : {(this.state.PDC && this.state.PDC !== '') ? this.state.PDC : 'Non renseignée'}</p>
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