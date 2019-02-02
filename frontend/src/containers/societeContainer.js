import React, { Component } from 'react';
import { connect } from 'react-redux';

//import { getFormulairesBySociete } from '../actions';

 class SocieteContainer extends Component {

    componentWillMount(){
        //this.props.dispatch(getFormulairesBySociete('5c4f28897e19e41c4c4fc80d'));
    }

    /*renderFormulaires = (formulaires) => {
        return(
            formulaires.list ?

            formulaires.list.map( (item) => {
            //return(<p key={item._id}>{JSON.stringify(item)}</p>);
            return(
                <div key={item._id}>
                    <p>date: {item.date}</p>
                    <p>CA: {item.CA}</p>
                    <p>FA: {item.FA}</p>
                    <p>CS: {item.CS}</p>
                    <p>FG: {item.FG}</p>
                    <p>AF: {item.AF}</p>
                    
                    <p>EBITDA: {item.EBITDA}</p>
                    <p>CCT: {item.CCT}</p>
                    <p>CLT: {item.CLT}</p>
                    <p>CF: {item.CF}</p>
                    <p>Inventaire: {item.Inv}</p>

                    <hr />
                </div>
            );
            })

        : null);
    }*/



    render() {
        return (
            <div>
                {this.renderFormulaires(this.props.formulaires)}
            </div>
        )
    }
}

function mapStateToProps(state){
    return {
        //formulaires: state.formulaires
    }
}

export default connect(mapStateToProps)(SocieteContainer);