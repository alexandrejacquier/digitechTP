import React from 'react';
import SideNav from 'react-simple-sidenav';
import SidenavItems from './sidenav_items'

const Nav = (props) => {
    return (
       <SideNav
            showNav={props.showNav}
            onHideNav={props.onHideNav}
            navStyle={{
                background: '#36616C',
                width:'50%',
                maxWidth:'15em'
            }}
       >
           <SidenavItems onHideNav={props.onHideNav}/>
           <div></div>
        </SideNav>
    );
};

export default Nav;