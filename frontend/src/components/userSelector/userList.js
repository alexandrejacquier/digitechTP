import React from 'react'

const UserList = (props) => {

    const showUsers = (users) =>{
        //console.log(users[0]);
        return(
        users.length > 0 ? 
            users.map(item => (
                <tr key={item._id}>
                    <td>{item.email}</td>
                </tr>
            ))
        :null
        );
    }

    return (
    <div className="current_users">
        <table>
            <thead>
                <tr>
                    <th>{props.header}</th>
                </tr>
            </thead>
            <tbody>
                {props.users ? showUsers(props.users) : null}
            </tbody>
        </table>
    </div>
    )
}

export default UserList;