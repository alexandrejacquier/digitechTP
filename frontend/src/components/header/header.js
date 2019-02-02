import React, { Component } from 'react';
import FontAwesome from 'react-fontawesome';
import { Link } from 'react-router-dom';

import Nav from './sidenav/sidenav.js';

class Header extends Component {

    constructor(props){
        super(props)
        this.state = {
            showNav:false
        }
    }

    onHideNav = () => {
        this.setState({showNav:false});
    }

    render(){
        return(
            <header>
                <Nav 
                showNav={this.state.showNav}
                onHideNav={() => this.onHideNav()} />
                <div className="open_nav">
                    <FontAwesome 
                    name="bars"
                    onClick={() => this.setState({showNav:true})}
                    style={{
                        color:'lightGray',
                        padding:'8pt',
                        cursor:'pointer'
                    }} />
                </div>
                    <Link to="/" className="logo">
                        Digitech TP
                    </Link>

            </header>
        );
    }
}

export default Header;