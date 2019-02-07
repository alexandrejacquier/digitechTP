import React, { Component } from 'react'

class EditFormulaire extends Component {

    convertDateToHtml = (inDate) => {
        let date = new Date(inDate);
        //("0" + (this.getMonth() + 1)).slice(-2)
        let tmpMonth = ('0' + (date.getMonth()+1)).slice(-2);
        let tmpDay = ('0' + (date.getDate())).slice(-2);
        let htmlDate = date.getFullYear()+'-'+tmpMonth+'-'+tmpDay;

        //console.log('DATE IS: '+ htmlDate + " FROM: " + inDate)

        return htmlDate;
    }

    constructor(props){
        super(props);

        props.formulaire ?
            this.state = {
                //formdata:{
                    _id:props.formulaire._id,
                    societeId:props.formulaire.societeId,
                    date:this.convertDateToHtml(props.formulaire.date),
                    CA:props.formulaire.CA,
                    FA:props.formulaire.FA,
                    CS:props.formulaire.CS,
                    FG:props.formulaire.FG,
                    AF:props.formulaire.AF,
                    EBITDA:props.formulaire.EBITDA,
                    CCT:props.formulaire.CCT,
                    CLT:props.formulaire.CLT,
                    CF:props.formulaire.CF,
                    Inv:props.formulaire.Inv
                //}
            }
            
        :
            this.state = {
                //formdata:{
                    _id:'',
                    societeId:this.props.societeId,
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
                //}
            }

        console.log(this.state.date)
    }

    //METTRE A JOUR LE STATE
    handleNumInput = (event,name) => {
        /*let numValue = event.target.value !== "" ? parseInt(event.target.value) : ""
        this.setState({[name]:numValue});
        let tmpEBITDA = (
            this.state['CA'] - 
            this.state['FA'] - 
            this.state['CS'] - 
            this.state['FG'] - 
            this.state['AF']
        );
        this.setState({EBITDA: tmpEBITDA});*/
        let numValue = event.target.value !== "" ? parseInt(event.target.value) : ""
        let tmpState = this.state;
        tmpState[name] = numValue;
        tmpState['EBITDA'] = (
            tmpState['CA'] - 
            tmpState['FA'] - 
            tmpState['CS'] - 
            tmpState['FG'] - 
            tmpState['AF']
        );
        this.setState(tmpState);
    }
    handleDateInput = (event,name) => {
        this.setState({[name]:event.target.value});
        console.log('NEW DATE IS: '+event.target.value)
        //console.log(this.state.date)
    }

    //DEMANDER AU COMPONENT PARENT D'UPDATEFORMULAIRE
    submitForm = (e) => {
        e.preventDefault();
        //this.props.dispatch(updateBook(this.state.formdata))

        let reqFormulaire = {...this.state};
        reqFormulaire.date = new Date(reqFormulaire.date).toJSON();

        for(let elem in reqFormulaire)
        {
            if(reqFormulaire[elem] === ""){
                delete reqFormulaire[elem];
            } 
        }

        this.props.saveFormulaire(reqFormulaire);
        //console.log(this.state.formdata);
    }

    render() {
        //console.log('STATE DATE: '+this.state.date);
        console.log(this.props)
        return (
            <div>
            <form onSubmit={this.submitForm}>
                    <h2>Edition du formulaire</h2>
                    
                    <div className="form_element">
                        <label>Date : </label>
                        <input
                            id="dateIn"
                            type="date"
                            value={this.state.date}
                            onChange={(event)=>this.handleDateInput(event,'date')}
                            disabled={this.props.disabled}
                        />
                    </div>

                    <div className="form_element">
                        <label>Chiffre d'affaire : </label>
                        <input
                            type="number"
                            placeholder="Chiffre d'affaire"
                            value={this.state.CA}
                            onChange={(event)=>this.handleNumInput(event,'CA')}
                            disabled={this.props.disabled}
                        />
                    </div>
                    <div className="form_element">
                        <label>Frais d'achats : </label>
                        <input
                            type="number"
                            placeholder="Frais d'achats"
                            value={this.state.FA}
                            onChange={(event)=>this.handleNumInput(event,'FA')}
                            disabled={this.props.disabled}
                        />
                    </div>
                    <div className="form_element">
                        <label>Charges salariales : </label>
                        <input
                            type="number"
                            placeholder="Charges salariales"
                            value={this.state.CS}
                            onChange={(event)=>this.handleNumInput(event,'CS')}
                            disabled={this.props.disabled}
                        />
                    </div>
                    <div className="form_element">
                        <label>Frais généraux : </label>
                        <input
                            type="number"
                            placeholder="Frais généraux"
                            value={this.state.FG}
                            onChange={(event)=>this.handleNumInput(event,'FG')}
                            disabled={this.props.disabled}
                        />
                    </div>
                    <div className="form_element">
                        <label>Autres frais : </label>
                        <input
                            type="number"
                            placeholder="Autres frais"
                            value={this.state.AF}
                            onChange={(event)=>this.handleNumInput(event,'AF')}
                            disabled={this.props.disabled}
                        />
                    </div>
                    <div className="form_element">
                        <label>EBITDA : </label>
                        <input
                            type="number"
                            placeholder="EBITDA"
                            value={this.state.EBITDA}
                            onChange={(event)=>this.handleNumInput(event,'EBITDA')}
                            disabled={this.props.disabled}
                            disabled
                        />
                    </div>
                    <div className="form_element">
                        <label>Crédits à court termes : </label>
                        <input
                            type="number"
                            placeholder="Crédits court termes"
                            value={this.state.CCT}
                            onChange={(event)=>this.handleNumInput(event,'CCT')}
                            disabled={this.props.disabled}
                        />
                    </div>
                    <div className="form_element">
                        <label>Crédits à long termes : </label>
                        <input
                            type="number"
                            placeholder="Crédits long termes"
                            value={this.state.CLT}
                            onChange={(event)=>this.handleNumInput(event,'CLT')}
                            disabled={this.props.disabled}
                        />
                    </div>
                    <div className="form_element">
                        <label>Cashflow : </label>
                        <input
                            type="number"
                            placeholder="Cashflow"
                            value={this.state.CF}
                            onChange={(event)=>this.handleNumInput(event,'CF')}
                            disabled={this.props.disabled}
                        />
                    </div>
                    <div className="form_element">
                        <label>Investissements : </label>
                        <input
                            type="number"
                            placeholder="Investissements"
                            value={this.state.Inv}
                            onChange={(event)=>this.handleNumInput(event,'Inv')}
                            disabled={this.props.disabled}
                        />
                    </div>

                    {/*<div className="Btn">
                        <a onClick={this.submitForm}>Enregistrer</a> 
                    </div>
                    <div className="Btn">
                            <a onClick={this.deleteFormulaire}>Supprimer le formulaire</a>
                    </div>*/}
                </form>
            </div>
        )
    }
}

export default  EditFormulaire