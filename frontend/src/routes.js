import React from 'react';
import { Switch, Route } from 'react-router-dom';

import HomeContainer from './containers/homeContainer.js';
import LoginContainer from './containers/loginContainer.js';
import Logout from './components/logout.js';
import SocietePage from './components/societe/societePage.js';
import AddSocieteContainer from './containers/addSociete.js';
import EditFormulaireContainer from './containers/editFormulaireContainer.js';
import AddFormulaireContainer from './containers/addFormulaireContainer.js';
import Register from './containers/register.js';
import SocieteGraphContainer from './containers/societeGraphContainer.js';
/*import BookView from './components/Books'
import Login from './containers/Admin/login'
import User from './components/Admin'
import AddReview from './containers/Admin/add'
import UserPosts from './components/Admin/userPosts'
import EditReview from './containers/Admin/edit';
import Register from './containers/Admin/register';
import Logout from './components/Admin/logout';*/

import Layout from './hoc/layout.js';
import Auth from './hoc/auth.js';

const Routes = () => {
    return (
        <Layout>
            <Switch>
                <Route path="/" exact component={Auth(HomeContainer, true)} />
                <Route path="/login" exact component={Auth(LoginContainer, false)} />
                <Route path="/logout" exact component={Auth(Logout, true)} />
                <Route path="/user/register" exact component={Auth(Register, true)} />
                <Route path="/societe/add" exact component={Auth(AddSocieteContainer, true)} />
                <Route path="/formulaire/:id" exact component={Auth(EditFormulaireContainer, true)} />
                <Route path="/addFormulaires/:id" exact component={Auth(AddFormulaireContainer, true)} />
                <Route path="/societeGraph/:id" exact component={Auth(SocieteGraphContainer, true)} />
            </Switch>
        </Layout>
        /*<Layout>
            <Switch>
                <Route path="/" exact component={Auth(Home,null)}/>
                <Route path="/login" exact component={Auth(Login,false)}/>
                <Route path="/user/logout" exact component={Auth(Logout,true)}/>
                <Route path="/user" exact component={Auth(User,true)}/>
                <Route path="/user/add" exact component={Auth(AddReview,true)}/>
                <Route path="/user/register" exact component={Auth(Register,true)}/>
                <Route path="/user/edit-post/:id" exact component={Auth(EditReview,true)}/>
                <Route path="/books/:id" exact component={Auth(BookView,null)}/>
                <Route path="/user/user-reviews" exact component={Auth(UserPosts,true)}/>
            </Switch>
        </Layout>*/
    );
};

export default Routes;