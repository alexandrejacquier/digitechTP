import React, { Component } from 'react';
import { connect } from 'react-redux';

import { getSocietes, getFormulairesBySociete } from '../actions';

import FormulairesQuickView from '../components/societeQuickView/formulairesQuickView.js';

 class HomeContainer extends Component {

    constructor(props){
        super(props);

        this.state = {
            selectedSocieteId: ''
        }
    }

    componentWillMount(){
    //componentWillReceiveProps(nextProps){
        if(this.props.user){
            this.props.dispatch(getSocietes(this.props.user.login.id));
            //console.log("USERS ID: "+this.props.user.login.id);
        }
        //this.props.dispatch(getSocietes(''));
    }

    handleSelectSociete = (event) => {
        this.setState({selectedSocieteId: event.target.value});
        //console.log(this.state.selectedSociete);
        this.props.dispatch(getFormulairesBySociete(event.target.value, 'desc'));


    }

    renderSocietes = (societes) => {
        return(
        societes.list ?

        societes.list.map( (item) => {
            //return(<p key={item._id}>{item.name}</p>);
            return(
                <option key={item._id} value={item._id}>
                    {item.name}
                </option>
            );
        })

        : null);
    }

    getSelectedSociete = () => {
        return(
            this.props.societes.list ?
    
            this.props.societes.list.filter( (item) => {
                return item._id === this.state.selectedSocieteId;
            })
    
            : null);
    }

    render() {
        return (
            <div className="PageContent">
                <form>
                    <div className="SS">
                    <label htmlFor="societeSelect">Choisissez la société</label>
                    <select id='societeSelect' value={this.state.selectedSocieteId} onChange={this.handleSelectSociete}>
                        <option value='' />
                        {this.renderSocietes(this.props.societes)}
                    </select>
                    </div>
                </form>
                { 
                    this.state.selectedSocieteId !== '' ?
                        <FormulairesQuickView formulaires={this.props.formulaires} societe={this.getSelectedSociete()} {...this.props}/>
                    :
                        null
                }
            </div>
        )
    }
}

function mapStateToProps(state){
    return {
        societes: state.societes,
        formulaires: state.formulaires
    }
}

export default connect(mapStateToProps)(HomeContainer);