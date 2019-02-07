import React, { Component } from 'react'

class UserSelector extends Component {

    constructor(props){
        super(props);
        this.state = {
            email: ''
        }
    }

    handleInput = (event) => {
        this.setState({email: event.target.value});
    }

    submitForm = (e) => {
        e.preventDefault();
    
        //console.log("SHOULD RETURN A VALID USER ID");
        //props.dispatch(getUsers())

        //CHECK SI L'UTILISATEUR EXISTE, SI OUI, L'AJOUTER A LA LISTE (ID)

        //AJOUTER CHECK SI L'UTILISATEUR EST DEJA DANS LA LISTE
        /*if(this.props.user.users.some(usr => {
            return usr.email === this.state.formCurAdmin;
        })){
            let tmpState = this.state;

            tmpState.societe.users.concat(this.props.user.users.filter(usr => {
                return usr.email === this.state.formCurAdmin
            }));
            this.setState(tmpState);
            console.log("TMPSTATE: ");
            console.log(tmpState);
        }*/

        let tmpUsers = this.props.users.filter(usr => {
            return usr.email === this.state.email
        })

        //console.log(tmpUsers);

        this.props.returnUser(tmpUsers[0]);
    }

    render(){
        return (
            <div>
                <div className="form_element">
                    <label>{this.props.children}</label>
                    <input
                        id="AddUser"
                        value={this.state.email}
                        onChange={this.handleInput}
                    />
                    <div className="Btn">
                            <a onClick={this.submitForm}>+</a>
                    </div>
                </div>
            </div>
        )
    }
}

export default UserSelector;