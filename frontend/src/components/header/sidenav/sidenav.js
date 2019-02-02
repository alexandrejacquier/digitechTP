import React from 'react';
import SideNav from 'react-simple-sidenav';
import SidenavItems from './sidenav_items'

const Nav = (props) => {
    return (
       <SideNav
            showNav={props.showNav}
            onHideNav={props.onHideNav}
            navStyle={{
                background:'#222',
                width:'50%',
                maxWidth:'15em'
            }}
       >
           <SidenavItems onHideNav={props.onHideNav}/>
        </SideNav>
    );
};

export default Nav;