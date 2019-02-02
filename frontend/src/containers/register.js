import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { getUsers, userRegister } from '../actions';

class Register extends PureComponent {

    state ={
        email:'',
        password:'',
        privileges:0,
        error:''
    }

    componentWillMount(){
        this.props.dispatch(getUsers())
    }


    handleInputEmail = (event) => {
        this.setState({email:event.target.value})
    } 
    handleInputPassword= (event) => {
        this.setState({password:event.target.value})
    } 
    handleInputPrivileges = (event) => {
        let numValue = event.target.value === "1" ? 1 : 0;
        this.setState({privileges:numValue})
    } 

    componentWillReceiveProps(nextProps){
        if(nextProps.user.register === false){
            this.setState({error:'Error,try again'})
        } else{
            this.setState({
                email:'',
                password:'',
                privileges:0
            })
        }
    }

    submitForm = (e) => {
        e.preventDefault();
        this.setState({error:''});

        this.props.dispatch(userRegister({
            email:this.state.email,
            password:this.state.password,
            privileges:this.state.privileges
        },this.props.user.users))
        
    }

    showUsers = (user) =>(
        user.users ? 
            user.users.map(item => (
                <tr key={item._id}>
                    <td>{item.email}</td>
                    <td>{item.privileges}</td>
                </tr>
            ))
        :null
    )


    render() {
        let user = this.props.user;
        return (
            <div className="rl_container">
                <form onSubmit={this.submitForm}>
                    <h2>Ajouter un utilisateur</h2>
                    
                    <div className="form_element">
                        <input
                            type="email"
                            placeholder="Email"
                            value={this.state.email}
                            onChange={this.handleInputEmail}
                         />
                    </div>

                    <div className="form_element">
                        <input
                            type="password"
                            placeholder="Mot de passe"
                            value={this.state.password}
                            onChange={this.handleInputPassword}
                         />
                    </div>

                    <div className="form_element">
                        <select
                            value={this.state.privileges}
                            onChange={this.handleInputPrivileges}
                        >
                            <option value="0">utilisateur</option>
                            <option value="1">administrateur</option>
                        </select>
                    </div>

                    <button type="submit">Enregistrer</button>
                    <div className="error">
                        {this.state.error}
                    </div>

                </form>
                <div className="current_users">
                    <h4>Utilisateurs existants:</h4>
                    <table>
                        <thead>
                            <tr>
                                <th>Email</th>
                                <th>Privileges</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.showUsers(user)}
                        </tbody>
                    </table>
                </div>
            </div>
        );
    }
}
function mapStateToProps(state){
    return{
        user:state.user
    }
}

export default connect(mapStateToProps)(Register)