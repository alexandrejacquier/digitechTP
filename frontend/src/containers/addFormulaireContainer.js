import React, { Component } from 'react';
import { connect } from 'react-redux';

import { addFormulaire } from '../actions';

import AddFormulaire from '../components/formulaires/addFormulaire.js';

 class AddFormulaireContainer extends Component {

    constructor(props){
        super(props);

        this.state = {
            formulaires: [
                {
                    societeId:this.props.match.params.id,
                    date:'',
                    CA:'',
                    FA:'',
                    CS:'',
                    FG:'',
                    AF:'',
                    EBITDA:'',
                    CCT:'',
                    CLT:'',
                    CF:'',
                    Inv:''
                }
            ]
        }
    }

    handleNumInput = (form,value,name) => {
        let numValue = value !== "" ? parseInt(value) : "";
        let tmpState = this.state;
        tmpState.formulaires[form][name] = numValue;
        this.setState(tmpState);
        
    }
    handleDateInput = (form,value,name) => {

        console.log('NEW DATE IS: '+value)
        //this.setState({[name]:value});
        let tmpState = this.state;
        tmpState.formulaires[form][name] = value;
        this.setState(tmpState);
    }

    componentWillMount(){
    }

    convertDateToHtml = (inDate) => {
        let date = new Date(inDate);
        let tmpMonth = ('0' + (date.getMonth()+1)).slice(-2);
        let tmpDay = date.getDate();
        let htmlDate = date.getFullYear()+'-'+tmpMonth+'-'+tmpDay;
        return htmlDate;
    }

    sendUpdateFormulaire = (formulaire) => {
        let reqFormulaire = formulaire;
        reqFormulaire.date = new Date(reqFormulaire.date).toJSON();

        for(let elem in reqFormulaire)
        {
            if(reqFormulaire[elem] === ""){
                delete reqFormulaire[elem];
            } 
        }

        this.props.dispatch(addFormulaire(reqFormulaire));

        this.props.history.push('/');
    }

    SaveAllChanges = () => {
        //console.log(this.state);

        for(let i in this.state.formulaires)
        {
            console.log('FORMULAIRE DATA TO ADD: '+ this.state.formulaires[i]);
            this.sendUpdateFormulaire(this.state.formulaires[i]);
        }
    }

    AddFormulaire = () => {
        const defaultFormulaire = {
            societeId:this.props.match.params.id,
            date:'',
            CA:'',
            FA:'',
            CS:'',
            FG:'',
            AF:'',
            EBITDA:'',
            CCT:'',
            CLT:'',
            CF:'',
            Inv:''
        }

        //this.setState({...this.state, defaultFormulaire})
        let tmpState = this.state;
        tmpState.formulaires.push(defaultFormulaire);// = {...tmpState.formulaires, defaultFormulaire};

        this.setState(tmpState);

        console.log(this.state);
    }

    renderFormulaires(){
        return(
            this.state.formulaires.map((item, i) => {
                return(
                    <AddFormulaire key={i} formId={i} {...item} handleNum={this.handleNumInput} handleDate={this.handleDateInput}/>
                );
            })
        );
    }

    render() {
        return (
            <div>
                {this.renderFormulaires()}
                <button onClick={this.SaveAllChanges}>Enregistrer</button>        
                <button onClick={this.AddFormulaire}>Nouveau formulaire</button>    
            </div>
        )
    }
}

export default AddFormulaireContainer;