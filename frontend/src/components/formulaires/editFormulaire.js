import React, { Component } from 'react'

class EditFormulaire extends Component {

    convertDateToHtml = (inDate) => {
        let date = new Date(inDate);
        //("0" + (this.getMonth() + 1)).slice(-2)
        let tmpMonth = ('0' + (date.getMonth()+1)).slice(-2);
        let tmpDay = date.getDate();
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
    }

    //METTRE A JOUR LE STATE
    handleNumInput = (event,name) => {
        let numValue = event.target.value !== "" ? parseInt(event.target.value) : ""
        this.setState({[name]:numValue});
    }
    handleDateInput = (event,name) => {
        this.setState({[name]:event.target.value});
        //console.log('NEW DATE IS: '+event.target.value)
    }

    //DEMANDER AU COMPONENT PARENT D'UPDATEFORMULAIRE
    submitForm = (e) => {
        e.preventDefault();
        //this.props.dispatch(updateBook(this.state.formdata))

        let reqFormulaire = {...this.state};
        reqFormulaire.date = new Date(reqFormulaire.date).toJSON();
        /*if(this.state._id === ""){
            delete reqFormulaire._id;
        }*/
        //this.state.filter()
        for(let elem in reqFormulaire)
        {
            if(reqFormulaire[elem] === ""){
                delete reqFormulaire[elem];
            } 
        }

        this.props.saveFormulaire(reqFormulaire);
        //console.log(this.state.formdata);
    }


    /*componentWillReceiveProps(nextProps){
        let formulaire = nextProps.formulaire;
        this.setState({
            formdata:{
                _id:formulaire._id,
                societeId:formulaire.societeId,
                date:formulaire.date,
                CA:formulaire.CA,
                FA:formulaire.FA,
                CS:formulaire.CS,
                FG:formulaire.FG,
                AF:formulaire.AF,
                EBITDA:formulaire.EBITDA,
                CCT:formulaire.CCT,
                CLT:formulaire.CLT,
                CF:formulaire.CF,
                Inv:formulaire.Inv
            }
        })
    }*/

    /*componentWillUnmount(){
        this.props.dispatch(clearBook())
    }*/

    render() {
        //console.log('STATE DATE: '+this.state.date);
        return (
            <div>
            <form onSubmit={this.submitForm}>
                    <h2>formulaire {this.state._id}</h2>

                    <div className="form_element">
                        <input
                            id="dateIn"
                            type="date"
                            value={this.state.date}
                            onChange={(event)=>this.handleDateInput(event,'date')}
                        />
                    </div>

                    <div className="form_element">
                        <input
                            type="number"
                            placeholder="Chiffre d'affaire"
                            value={this.state.CA}
                            onChange={(event)=>this.handleNumInput(event,'CA')}
                        />
                    </div>
                    <div className="form_element">
                        <input
                            type="number"
                            placeholder="Frais d'achats"
                            value={this.state.FA}
                            onChange={(event)=>this.handleNumInput(event,'FA')}
                        />
                    </div>
                    <div className="form_element">
                        <input
                            type="number"
                            placeholder="Charges salariales"
                            value={this.state.CS}
                            onChange={(event)=>this.handleNumInput(event,'CS')}
                        />
                    </div>
                    <div className="form_element">
                        <input
                            type="number"
                            placeholder="Frais généraux"
                            value={this.state.FG}
                            onChange={(event)=>this.handleNumInput(event,'FG')}
                        />
                    </div>
                    <div className="form_element">
                        <input
                            type="number"
                            placeholder="Autres frais"
                            value={this.state.AF}
                            onChange={(event)=>this.handleNumInput(event,'AF')}
                        />
                    </div>
                    <hr/>
                    <div className="form_element">
                        <input
                            type="number"
                            placeholder="EBITDA"
                            value={this.state.EBITDA}
                            onChange={(event)=>this.handleNumInput(event,'EBITDA')}
                        />
                    </div>
                    <div className="form_element">
                        <input
                            type="number"
                            placeholder="Crédits court termes"
                            value={this.state.CCT}
                            onChange={(event)=>this.handleNumInput(event,'CCT')}
                        />
                    </div>
                    <div className="form_element">
                        <input
                            type="number"
                            placeholder="Crédits long termes"
                            value={this.state.CLT}
                            onChange={(event)=>this.handleNumInput(event,'CLT')}
                        />
                    </div>
                    <div className="form_element">
                        <input
                            type="number"
                            placeholder="Cashflow"
                            value={this.state.CF}
                            onChange={(event)=>this.handleNumInput(event,'CF')}
                        />
                    </div>
                    <div className="form_element">
                        <input
                            type="number"
                            placeholder="Investissements"
                            value={this.state.Inv}
                            onChange={(event)=>this.handleNumInput(event,'Inv')}
                        />
                    </div>

                    <button type="submit">Enregistrer</button>
                </form>
            </div>
        )
    }
}

export default  EditFormulaire