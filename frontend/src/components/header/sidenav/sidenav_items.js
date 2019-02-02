import React from 'react';
import { Link } from 'react-router-dom';
import FontAwesome from 'react-fontawesome';
import { connect } from 'react-redux';

const SidenavItems = (props, {user}) => {

    const items = [
        {
            type:'navItem',
            icon:'home',
            text:'Accueil',
            link:'/',
            restricted:true
        },
        {
            type:'navItem',
            icon:'user-plus',
            text:'Nouvel utilisateur (admin)',
            link:'/user/register',
            restricted:true
        },
        {
            type:'navItem',
            icon:'sign-in',
            text:'Connexion',
            link:'/login',
            restricted:false,
            exclude:true
        },
        {
            type:'navItem',
            icon:'sign-out',
            text:'Déconnexion',
            link:'/logout',
            restricted:true
        },
        {
            type:'navItem',
            icon:'file-text-o',
            text:'Nouvelle société',
            link:'/societe/add',
            restricted:true
        }
    ]

    /*const items = [
        {
            type:'navItem',
            icon:'home',
            text:'Home',
            link:'/',
            restricted:false
        }
    ]*/

    const element = (item,i) => (
        <div key={i} className={item.type}>
            <Link to={item.link}
            onClick={props.onHideNav}>
                <FontAwesome name={item.icon}/>
                {item.text}
            </Link>
        </div>
    )

    const showItems = () => (
        /*user.login ?
            items.map((item,i)=>{
                if(user.login.isAuth) {
                    return !item.exclude ?
                        element(item,i)
                    :null
                } else {
                    return !item.restricted ?
                        element(item,i)
                    :null
                }
            })
        :null*/
        items.map((item,i)=>{
            return element(item,i);
        })
    )

    return (
        <div>
            {showItems()}
        </div>
    );
};

function mapStateToProps(state){
    return{
        user: state.user
    }
}

export default connect(mapStateToProps)(SidenavItems)