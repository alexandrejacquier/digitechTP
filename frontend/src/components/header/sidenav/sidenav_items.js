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
            restricted:true,
            admin:true
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
        props.user.login ?
            items.map((item,i)=>{
                if(props.user.login.isAuth) {
                    //console.log(props.user)
                    if(!item.exclude){
                        if(props.user.login.privileges || !item.admin)
                        {
                            return element(item,i);
                        }
                        else{
                            //return element(item,i);
                            return null;
                        }
                        
                    }
                    else{
                        return null;
                    }
                    /*return !item.exclude ?
                        element(item,i)
                    :null*/
                } else {
                    return !item.restricted ?
                        element(item,i)
                    :null
                }
            })
        :null
        /*items.map((item,i)=>{
            return element(item,i);
        })*/
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