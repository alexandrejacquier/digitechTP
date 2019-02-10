import React, { Component } from 'react';
import axios from 'axios';

 class CsvUpDown extends Component {

    constructor(props){
        super(props);

        this.state = {
            selectedFile: null,
            loaded: 0,
            //societeId: '5c4f28897e19e41c4c4fc80d'
        }
    }

    handleselectedFile = (event) => {
        this.setState({
            selectedFile: event.target.files[0],
            loaded: 0,
            //societeId: '5c4f28897e19e41c4c4fc80d'
        })
    }

    submitForm = (e) => {
        e.preventDefault();

        if(this.state.selectedFile){
            const data = new FormData();
            data.append('file', this.state.selectedFile, this.state.selectedFile.name)
            data.append('societeId', this.props.societeId)

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
                this.props.refreshFormulaires();
            })
        }
    }

    getFormulairesCsv = () => {
        axios.get('/api/CSVformulairesBySociete', {
            params: {
                id: this.props.societeId,
                order: 'asc'
            }
        }).then(response => {
            //this.props.history.push()
            console.log(response);
            //this.props.history.push(response.data);
            const hostURI = 'http://' + window.location.hostname;
            window.open(hostURI + response.data);
        });
    
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

    render() {
        return (
            <React.Fragment>
            {this.isUserSocAdmin() ? 
                <div className="CSVContainer">
                    <form onSubmit={this.submitForm}>
                        <h2>Import/export de formulaires CSV</h2>
                        <label htmlFor="file" className="labelFile" onClick={(e) => this.refs.inputFile.click()}>Sélectionner le fichier CSV</label>
                        <input type="file" name="file" className="inputFile" onChange={this.handleselectedFile} ref="inputFile"/>
                        {/*<button type="submit">Upload</button>*/}
                        <div className="Btn">
                            <a onClick={this.submitForm}>Uploader</a> 
                        </div>
                        <p>{Math.round(this.state.loaded, 2)} % uploadé</p>
                    </form>
                    <div className="Buttons">
                        <div className="Btn">
                            <a onClick={this.getFormulairesCsv}>Obtenir les formulaires au format CSV</a> 
                        </div>
                    </div>
                </div>
            :
                null
            }
            </React.Fragment>
        )
    }
}

export default CsvUpDown;