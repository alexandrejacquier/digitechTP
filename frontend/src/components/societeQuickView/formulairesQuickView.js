import React, { Component } from 'react'
import { Link } from "react-router-dom";

import FontAwesome from 'react-fontawesome';

class FormulairesQuickView extends Component {
    constructor(props){
        super(props);

        this.state = {
            dateBegin: new Date('1970-01-01'),
            dateEnd: new Date('3000-01-01')
        }
    }

    renderFormulaireQuick = (formulaires) => {
        //const dateBegin = new Date('2018-01-01');
        //const dateEnd = new Date('2020-02-02');
        return(
            formulaires.list ?

            formulaires.list.filter( (item) => {
                const itemDate = new Date(item.date);
                return(itemDate >= this.state.dateBegin && itemDate <= this.state.dateEnd)
            }).map( (item) => {
                return(
                    <tr key={item._id}>
                        <td className="Date">{new Date(item.date).toLocaleDateString()}</td>
                        <td className="Button">
                            <a onClick={() => this.handleFormulaireEdit(item._id)}>
                                {this.isUserSocAdmin() ? 'Editer' : 'Voir'}
                            </a>
                        </td>
                    </tr>
                );
            })

            : null
        );
    }

    handleFormulaireEdit = (id) => {
        //console.log("SHOULD EDIT FORMULAIRE: "+id);
        this.props.history.push(`/formulaire/${id}`)
    }

    isUserSocAdmin = () => {
        //console.log(this.props.user)
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

    handleDateStart = (e) => {
        const dateInput = new Date(e.target.value);
        //console.log(dateInput instanceof Date && isFinite(dateInput));
        if(dateInput instanceof Date && isFinite(dateInput)){
            
            this.setState({
                ...this.state,
                dateBegin: dateInput
            })
        }
        else
        {
            this.setState({
                ...this.state,
                dateBegin: new Date('1970-01-01')
            })
        }
    }
    handleDateEnd = (e) => {
        const dateInput = new Date(e.target.value);
        if(dateInput instanceof Date && isFinite(dateInput)){
            this.setState({
                ...this.state,
                dateEnd: dateInput
            })
        }
        else
        {
            this.setState({
                ...this.state,
                dateEnd: new Date('3000-01-01')
            })
        }
    }

    render() {
        return (
            <div className="FQV">
                <div className="Head">
                    <div className="Info">
                        <div>
                            <div style={{fontWeight: '600'}}>Adresse</div>
                            <div style={{fontWeight: '600'}}>Personne de contact</div>
                        </div>
                        <div>
                            <div>   :   </div>
                            <div>   :   </div>
                        </div>
                        <div>
                            <div>{(this.props.societe.adresse && this.props.societe.adresse !== '') ? this.props.societe.adresse : 'Non renseignée'}</div>
                            <div>{(this.props.societe.PDC && this.props.societe.PDC !== '') ? this.props.societe.PDC : 'Non renseignée'}</div>
                        </div>
                    </div>
                    <div className="Buttons">
                        <Link className="Btn" to={`/societe/${this.props.societe._id}`}><FontAwesome name='edit'/></Link>
                        <Link className="Btn" to={`/societeGraph/${this.props.societe._id}`}><FontAwesome name='line-chart'/></Link>
                    </div>
                </div>
                <div className="Body">
                    <table>
                        <thead>
                            <tr>
                                <th className="DateHeader">
                                    <div className="DateInputs">
                                        <label style={{display:'inline-block', width:'2em'}}>Du </label><input type="date" onChange={this.handleDateStart}/>
                                    </div>
                                    <div className="DateInputs">
                                        <label style={{display:'inline-block', width:'2em'}}>au </label><input type="date" onChange={this.handleDateEnd}/>
                                    </div>
                                </th>
                                <th>
                                    {this.isUserSocAdmin() ? 
                                    <Link className="ButtonNew" style={{display:'block'}} to={`/addFormulaires/${this.props.societe._id}`}>Nouveau formulaire</Link>
                                    : null}
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.renderFormulaireQuick(this.props.formulaires)}
                        </tbody>
                    </table>
                </div>
            </div>
        )
    }
}

export default FormulairesQuickView;