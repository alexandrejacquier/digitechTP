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
                <div className="rl_container article">
                    <form onSubmit={this.submitForm}>
                        <h2>Ajouter des formulaires par CSV</h2>
                        <input type="file" name="file" onChange={this.handleselectedFile}/>
                        <button type="submit">Upload</button>
                    </form>
                    <p>{Math.round(this.state.loaded, 2)} % uploadé</p>
                    <p><button onClick={this.getFormulairesCsv}>Obtenir les formulaires au format CSV</button></p>
                </div>
            :
                null
            }
            </React.Fragment>
        )
    }
}

export default CsvUpDown;