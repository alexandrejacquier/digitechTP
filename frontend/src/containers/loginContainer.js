import React, { Component } from 'react'
import { connect } from 'react-redux';

import { loginUser } from '../actions';

class LoginContainer extends Component {
    
    constructor(props)
    {
        super(props);
        this.state = {
            email:'',
            password:'',
            error:'',
            success:false
        }
    }

    handleInputEmail = (event) => {
        this.setState({email:event.target.value})
    }
    handleInputPassword = (event) => {
        this.setState({password:event.target.value})
    }

    componentWillReceiveProps(nextProps){
        if(nextProps.user.login.isAuth){
            this.props.history.push('/')
        }
    }


    submitForm = (e) =>{
        e.preventDefault();
        this.props.dispatch(loginUser(this.state))
    }

    render() {
        let user = this.props.user;
        return (
            <div className="PageContent">
                <div className="rl_container article">
                    <form onSubmit={this.submitForm}>
                        <h2>Veuillez vous connecter</h2>

                        <div className="form_element">
                            <input 
                                type="email"
                                placeholder="Adresse email"
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

                        <button type="submit">Connexion</button>

                        <div className="error">
                        {
                            user.login ? 
                                <div>{user.login.message}</div>
                            :null
                        }
                        </div>

                    </form>
                </div>
            </div>
        );
    }
}

function mapStateToProps(state){
    return {
        user:state.user
    }
}

export default connect(mapStateToProps)(LoginContainer)