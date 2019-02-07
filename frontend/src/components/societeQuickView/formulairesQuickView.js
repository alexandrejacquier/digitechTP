import React from 'react'
import { Link } from "react-router-dom";

import FontAwesome from 'react-fontawesome';


export default function FormulairesQuickView(props) {

    const renderFormulaireQuick = (formulaires) => {
        return(
            formulaires.list ?

            formulaires.list.map( (item) => {
                return(
                    <tr key={item._id}>
                        <td className="Date">{new Date(item.date).toLocaleDateString()}</td>
                        <td className="Button">
                            <a onClick={() => handleFormulaireEdit(item._id)}>
                                {isUserSocAdmin() ? 'Editer' : 'Voir'}
                            </a>
                        </td>
                    </tr>
                );
            })

            : null
        );
    }

    const handleFormulaireEdit = (id) => {
        //console.log("SHOULD EDIT FORMULAIRE: "+id);
        props.history.push(`/formulaire/${id}`)
    }

    const isUserSocAdmin = () => {
        //console.log(this.props.user)
        if(!props.societe){return false}
        if(props.societe.admins.some(adm => {return adm === props.user.login.id})){
            //console.log("USER IS ADMIN")
            return true;
        }
        else{
            //console.log("USER IS USER")
            return false;
        }
    }

    return (
        <div className="FQV">
            <div className="Head">
                <div className="Info">
                    <div>Adresse: {(props.societe.adresse && props.societe.adresse !== '') ? props.societe.adresse : 'Non renseignée'}</div>
                    <div>Personne de contact: {(props.societe.PDC && props.societe.PDC !== '') ? props.societe.PDC : 'Non renseignée'}</div>
                </div>
                <div className="Buttons">
                    <Link className="Btn" to={`/societe/${props.societe._id}`}><FontAwesome name='edit'/></Link>
                    <Link className="Btn" to={`/societeGraph/${props.societe._id}`}><FontAwesome name='line-chart'/></Link>
                </div>
            </div>
            <table>
                <thead>
                    <tr>
                        <th className="Date">Date</th>
                        <th className="Button">
                            {isUserSocAdmin() ? 
                            <Link style={{display:'block'}} to={`/addFormulaires/${props.societe._id}`}>Nouveau formulaire</Link>
                            : null}
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {renderFormulaireQuick(props.formulaires)}
                </tbody>
            </table>
        </div>
    )
}
