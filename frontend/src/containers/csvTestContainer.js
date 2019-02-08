import React, { Component } from 'react';
import axios from 'axios';

 class CsvTestContainer extends Component {

    constructor(props){
        super(props);

        this.state = {
            selectedFile: null,
            loaded: 0,
            societeId: '5c4f28897e19e41c4c4fc80d'
        }
    }

    handleselectedFile = (event) => {
        this.setState({
            selectedFile: event.target.files[0],
            loaded: 0,
            societeId: '5c4f28897e19e41c4c4fc80d'
        })
    }

    submitForm = (e) => {
        e.preventDefault();
        //console.log("SHOULD UPLOAD CSV");

        const data = new FormData();
        data.append('file', this.state.selectedFile, this.state.selectedFile.name)
        data.append('societeId', this.state.societeId)

        axios
        .post('/api/CSVFormulaires', data, {
            onUploadProgress: ProgressEvent => {
            this.setState({
                loaded: (ProgressEvent.loaded / ProgressEvent.total) * 100,
            })
            },
        })
        .then(res => {
            //console.log(res)
        })
    }

    getFormulairesCsv = () => {
        axios.get('/api/CSVformulairesBySociete', {
            params: {
                id: this.state.societeId,
                order: 'asc'
            }
        }).then(response => {
            //this.props.history.push()
            //console.log(response);
        });
    
    }

    render() {
        return (
            <div className="rl_container article">
                <form onSubmit={this.submitForm}>
                    <h2>Uploader des sociétés par CSV</h2>
                    <input type="file" name="file" onChange={this.handleselectedFile}/>
                    <button type="submit">Upload</button>
                </form>
                <p>{Math.round(this.state.loaded, 2)} % uploadé</p>
                <p><button onClick={this.getFormulairesCsv}>Get formulaires CSV</button></p>
            </div>
        )
    }
}

export default CsvTestContainer;