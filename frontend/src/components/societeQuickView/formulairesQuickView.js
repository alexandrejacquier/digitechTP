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
                        <td className="Button"><a onClick={() => handleFormulaireEdit(item._id)}>Editer</a></td>
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


    return (
        <div className="FQV">
            <div className="Head">
                <div className="Info">
                    <div>Adresse: {(props.societe[0].adresse && props.societe[0].adresse !== '') ? props.societe[0].adresse : 'Non renseignée'}</div>
                    <div>Personne de contact: {(props.societe[0].PDC && props.societe[0].PDC !== '') ? props.societe[0].PDC : 'Non renseignée'}</div>
                </div>
                <div className="Buttons">
                    <Link className="Btn" to={`/societe/${props.societe[0]._id}`}><FontAwesome name='edit'/></Link>
                    <Link className="Btn" to={`/societeGraph/${props.societe[0]._id}`}><FontAwesome name='line-chart'/></Link>
                </div>
            </div>
            <table>
                <thead>
                    <tr>
                        <th className="Date">Date</th>
                        <th className="Button"><Link style={{display:'block'}} to={`/addFormulaires/${props.societe[0]._id}`}>Nouveau formulaire</Link></th>
                    </tr>
                </thead>
                <tbody>
                    {renderFormulaireQuick(props.formulaires)}
                </tbody>
            </table>
        </div>
    )
}
