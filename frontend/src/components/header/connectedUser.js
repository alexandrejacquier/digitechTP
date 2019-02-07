import React from 'react';
import { connect } from 'react-redux';

const ConnectedUser = (props, {user}) => {
    return (
        <div className="ConnectedUser">
            {props.user.login ? props.user.login.email : null}
        </div>
    );
};

function mapStateToProps(state){
    return{
        user: state.user
    }
}

export default connect(mapStateToProps)(ConnectedUser)