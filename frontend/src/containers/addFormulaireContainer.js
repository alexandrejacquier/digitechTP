import React, { Component } from 'react';
import { connect } from 'react-redux';

import { addFormulaire, getSociete } from '../actions';

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
        tmpState.formulaires[form]['EBITDA'] = (
            tmpState.formulaires[form]['CA'] - 
            tmpState.formulaires[form]['FA'] - 
            tmpState.formulaires[form]['CS'] - 
            tmpState.formulaires[form]['FG'] - 
            tmpState.formulaires[form]['AF']
        );
        this.setState(tmpState);
        
    }
    handleDateInput = (form,value,name) => {

        //console.log('NEW DATE IS: '+value)
        //this.setState({[name]:value});
        let tmpState = this.state;
        tmpState.formulaires[form][name] = value;
        this.setState(tmpState);
    }

    componentWillMount(){
        this.props.dispatch(getSociete(this.props.match.params.id));
    }

    componentWillReceiveProps(nextProps){
        //console.log(nextProps);
    }
    componentDidUpdate(){
        //console.log(this.props);
        if(this.props.societe && !this.isUserSocAdmin()){
            this.props.history.push('/');
        }
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
        //Indiquer si il y a une erreur ou non, enlever les formulaires correctement ajoutés
    }

    SaveAllChanges = () => {
        //console.log(this.state);

        for(let i in this.state.formulaires)
        {
            //console.log('FORMULAIRE DATA TO ADD: '+ this.state.formulaires[i]);
            this.sendUpdateFormulaire(this.state.formulaires[i]);
        }
        this.props.history.push('/');
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

        //console.log(this.state);
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
        if(this.isUserSocAdmin()){
        return (
            <div className="AddFormPageContent">
                <h2>Ajout de formulaires</h2>
                <div className="AddFormList">
                    {this.renderFormulaires()}
                </div>
                <div className="Btn">
                    <a onClick={this.SaveAllChanges}>Enregistrer</a>
                    <a onClick={this.AddFormulaire}>Ajouter un formulaire</a>    
                </div>
            </div>
        )
        }
        else{return null}
    }
}

function mapStateToProps(state){
    return {
        societe: state.societes.societe
    }
}

export default connect(mapStateToProps)(AddFormulaireContainer);