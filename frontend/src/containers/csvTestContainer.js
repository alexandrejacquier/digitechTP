import React, { Component } from 'react';
import { connect } from 'react-redux';

import { addSociete } from '../actions';

 class AddSocieteContainer extends Component {

    constructor(props){
        super(props);
    }

    submitForm = (e) => {
        e.preventDefault();
        console.log("SHOULD UPLOAD CSV");

        
    }

    render() {
        return (
            <div className="rl_container article">
                <form onSubmit={this.submitForm}>
                    <h2>Uploader des sociétés par CSV</h2>
                    <input type="file" name="csvFile" />
                    <button type="submit">Upload</button>
                </form>
            </div>
        )
    }
}

export default AddSocieteContainer;