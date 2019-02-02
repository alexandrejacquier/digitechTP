import React from 'react'
import { Link } from "react-router-dom";


export default function FormulairesQuickView(props) {

    const renderFormulaireQuick = (formulaires) => {
        //console.log(props.societe[0].adresse)
        return(
            formulaires.list ?

            formulaires.list.map( (item) => {
                return(
                    /*<option key={item._id} value={item._id}>
                        {item.name}
                    </option>*/
                    <tr key={item._id}>
                        <td>{new Date(item.date).toLocaleDateString()}</td>
                        <td><button onClick={() => handleFormulaireEdit(item._id)}>Editer</button></td>
                    </tr>
                );
            })

            : null
        );
    }

    const handleFormulaireEdit = (id) => {
        console.log("SHOULD EDIT FORMULAIRE: "+id);
        props.history.push(`/formulaire/${id}`)
    }


    return (
        <div>
            <div>Adresse: {props.societe[0].adresse || 'Non disponible'}</div>
            <div>Personne de contact: {props.societe[0].PDC || 'Non disponible'}</div>
            <Link to={`/societeGraph/${props.societe[0]._id}`}><button>Voir le graph</button></Link>
            <table>
                <thead>
                    <tr>
                        <th>Date</th>
                        <td><Link to={`/addFormulaires/${props.societe[0]._id}`}><button>Nouveau formulaire</button></Link></td>
                    </tr>
                </thead>
                <tbody>
                    {renderFormulaireQuick(props.formulaires)}
                </tbody>
            </table>
        </div>
    )
}
