import React, { Component } from 'react'

const AddFormulaire = (props) => {

    const convertDateToHtml = (inDate) => {
        let date = new Date(inDate);
        let tmpMonth = ('0' + (date.getMonth()+1)).slice(-2);
        let tmpDay = date.getDate();
        let htmlDate = date.getFullYear()+'-'+tmpMonth+'-'+tmpDay;
        return htmlDate;
    }

    //METTRE A JOUR LE STATE
    const handleNumInput = (event,name) => {
        props.handleNum(props.formId, event.target.value, name)
    }
    const handleDateInput = (event,name) => {
        props.handleDate(props.formId, event.target.value, name)
    }

    //DEMANDER AU COMPONENT PARENT D'UPDATEFORMULAIRE
    const submitForm = (e) => {
        e.preventDefault();
    }

    return (
        <div className="AddFormContainer">
        <form onSubmit={submitForm}>
                <div className="form_element">
                    
                    <input
                        id="dateIn"
                        type="date"
                        value={props.date}
                        onChange={(event)=>handleDateInput(event,'date')}
                    />
                </div>

                <div className="form_element">
                    
                    <input
                        type="number"
                        placeholder="Chiffre d'affaire"
                        value={props.CA}
                        onChange={(event)=>handleNumInput(event,'CA')}
                    />
                </div>
                <div className="form_element">
                    
                    <input
                        type="number"
                        placeholder="Frais d'achats"
                        value={props.FA}
                        onChange={(event)=>handleNumInput(event,'FA')}
                    />
                </div>
                <div className="form_element">
                    
                    <input
                        type="number"
                        placeholder="Charges salariales"
                        value={props.CS}
                        onChange={(event)=>handleNumInput(event,'CS')}
                    />
                </div>
                <div className="form_element">
                    
                    <input
                        type="number"
                        placeholder="Frais généraux"
                        value={props.FG}
                        onChange={(event)=>handleNumInput(event,'FG')}
                    />
                </div>
                <div className="form_element">
                    
                    <input
                        type="number"
                        placeholder="Autres frais"
                        value={props.AF}
                        onChange={(event)=>handleNumInput(event,'AF')}
                    />
                </div>
                <div className="form_element">
                    
                    <input
                        type="number"
                        placeholder="EBITDA"
                        value={props.EBITDA}
                        onChange={(event)=>handleNumInput(event,'EBITDA')}
                        disabled
                    />
                </div>
                <div className="form_element">
                    
                    <input
                        type="number"
                        placeholder="Crédits court terme"
                        value={props.CCT}
                        onChange={(event)=>handleNumInput(event,'CCT')}
                    />
                </div>
                <div className="form_element">
                    
                    <input
                        type="number"
                        placeholder="Crédits long terme"
                        value={props.CLT}
                        onChange={(event)=>handleNumInput(event,'CLT')}
                    />
                </div>
                <div className="form_element">
                    
                    <input
                        type="number"
                        placeholder="Cashflow"
                        value={props.CF}
                        onChange={(event)=>handleNumInput(event,'CF')}
                    />
                </div>
                <div className="form_element">
                    
                    <input
                        type="number"
                        placeholder="Investissements"
                        value={props.Inv}
                        onChange={(event)=>handleNumInput(event,'Inv')}
                    />
                </div>
            </form>
        </div>
    )
}

export default  AddFormulaire