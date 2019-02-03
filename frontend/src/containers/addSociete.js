import React, { Component } from 'react';
import { connect } from 'react-redux';

import { addSociete } from '../actions';

 class AddSocieteContainer extends Component {

    constructor(props){
        super(props);

        this.state= {
            formData:{
                name:'',
                adresse:'',
                PDC:''
                //ADMINS ET USERS
            }
        }
    }

    submitForm = (e) => {
        e.preventDefault();
        this.props.dispatch(addSociete({
            ...this.state.formData,
            admins:[this.props.user.login.id]
        }));

        this.props.history.push('/');
    }

    handleChange = (event, name) => {
        const newFormData = {
            ...this.state.formData
        }
        newFormData[name] = event.target.value;

        this.setState({
            formData: newFormData
        })
    }

    render() {
        return (
            <div className="rl_container article">
                <form onSubmit={this.submitForm}>
                    <h2>Nouvelle société</h2>

                    <div className="form_element">
                        <input type="text"
                        placeholder="Nom"
                        value={this.state.formData.name}
                        onChange={(event) => this.handleChange(event, 'name')}/>
                    </div>
                    <div className="form_element">
                        <input type="text"
                        placeholder="Adresse"
                        value={this.state.formData.adresse}
                        onChange={(event) => this.handleChange(event, 'adresse')}/>
                    </div>
                    <div className="form_element">
                        <input type="text"
                        placeholder="Personne de contact"
                        value={this.state.formData.PDC}
                        onChange={(event) => this.handleChange(event, 'PDC')}/>
                    </div>
                    <button type="submit">Enregistrer</button>
                </form>
            </div>
        )
    }
}

function mapStateToProps(state){
    return {
        societe: state.societes
    }
}

export default connect(mapStateToProps)(AddSocieteContainer);