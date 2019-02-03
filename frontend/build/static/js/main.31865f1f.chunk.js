(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{157:function(e,t,a){e.exports=a(320)},320:function(e,t,a){"use strict";a.r(t);var n=a(1),r=a.n(n),l=a(67),s=a.n(l),i=a(22),o=a(21),c=a(45),u=a(142),m=a.n(u),d=a(143),p=a.n(d),h=a(11),E=Object(c.c)({user:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},t=arguments.length>1?arguments[1]:void 0;switch(t.type){case"USER_LOGIN":case"USER_AUTH":return Object(h.a)({},e,{login:t.payload});case"GET_USER_POSTS":return Object(h.a)({},e,{userPosts:t.payload});case"GET_USER":return Object(h.a)({},e,{users:t.payload});case"USER_REGISTER":return Object(h.a)({},e,{register:t.payload.success,users:t.payload.users});default:return e}},societes:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},t=arguments.length>1?arguments[1]:void 0;switch(t.type){case"GET_SOCIETES":case"CLEAR_SOCIETES":return Object(h.a)({},e,{list:t.payload});case"GET_SOCIETE":return Object(h.a)({},e,{societe:t.payload});case"ADD_SOCIETE":case"CLEAR_NEWSOCIETE":return Object(h.a)({},e,{newSociete:t.payload});case"UPDATE_SOCIETE":return Object(h.a)({},e,{updateSociete:t.payload.success,societe:t.payload.doc});case"DELETE_SOCIETE":return Object(h.a)({},e,{deleted:t.payload});default:return e}},formulaires:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},t=arguments.length>1?arguments[1]:void 0;switch(t.type){case"GET_FORMULAIRESBYSOCIETE":return Object(h.a)({},e,{list:t.payload});case"GET_FORMULAIRE":return Object(h.a)({},e,{formulaire:t.payload});case"CLEAR_FORMULAIRE":return Object(h.a)({},e,{list:t.payload});case"ADD_FORMULAIRE":case"CLEAR_NEWFORMULAIRE":return Object(h.a)({},e,{newFormulaire:t.payload});case"UPDATE_FORMULAIRE":return Object(h.a)({},e,{updateFormulaire:t.payload.success,formulaire:t.payload.doc});case"DELETE_FORMULAIRE":return Object(h.a)({},e,{deleted:t.payload});default:return e}}}),f=a(16),v=a(17),b=a(19),C=a(18),g=a(20),y=a(156),O=a(24),I=a.n(O);function N(e,t){return{type:"GET_FORMULAIRESBYSOCIETE",payload:I.a.get("/api/formulairesBySociete",{params:{id:e,order:t}}).then(function(e){return e.data})}}function S(e){return{type:"ADD_FORMULAIRE",payload:I.a.post("/api/formulaire",e).then(function(e){return e.data})}}var F=a(43),j=a.n(F);function A(e){var t,a=function(t){e.history.push("/formulaire/".concat(t))};return r.a.createElement("div",{className:"FQV"},r.a.createElement("div",{className:"Head"},r.a.createElement("div",{className:"Info"},r.a.createElement("div",null,"Adresse: ",e.societe[0].adresse&&""!==e.societe[0].adresse?e.societe[0].adresse:"Non renseign\xe9e"),r.a.createElement("div",null,"Personne de contact: ",e.societe[0].PDC&&""!==e.societe[0].PDC?e.societe[0].PDC:"Non renseign\xe9e")),r.a.createElement("div",{className:"Buttons"},r.a.createElement(i.b,{className:"Btn",to:"/societe/".concat(e.societe[0]._id)},r.a.createElement(j.a,{name:"edit"})),r.a.createElement(i.b,{className:"Btn",to:"/societeGraph/".concat(e.societe[0]._id)},r.a.createElement(j.a,{name:"line-chart"})))),r.a.createElement("table",null,r.a.createElement("thead",null,r.a.createElement("tr",null,r.a.createElement("th",{className:"Date"},"Date"),r.a.createElement("th",{className:"Button"},r.a.createElement(i.b,{style:{display:"block"},to:"/addFormulaires/".concat(e.societe[0]._id)},"Nouveau formulaire")))),r.a.createElement("tbody",null,(t=e.formulaires).list?t.list.map(function(e){return r.a.createElement("tr",{key:e._id},r.a.createElement("td",{className:"Date"},new Date(e.date).toLocaleDateString()),r.a.createElement("td",{className:"Button"},r.a.createElement("a",{onClick:function(){return a(e._id)}},"Editer")))}):null)))}var _=function(e){function t(e){var a;return Object(f.a)(this,t),(a=Object(b.a)(this,Object(C.a)(t).call(this,e))).handleSelectSociete=function(e){a.setState({selectedSocieteId:e.target.value}),a.props.dispatch(N(e.target.value,"desc"))},a.renderSocietes=function(e){return e.list?e.list.map(function(e){return r.a.createElement("option",{key:e._id,value:e._id},e.name)}):null},a.getSelectedSociete=function(){return a.props.societes.list?a.props.societes.list.filter(function(e){return e._id===a.state.selectedSocieteId}):null},a.state={selectedSocieteId:""},a}return Object(g.a)(t,e),Object(v.a)(t,[{key:"componentWillMount",value:function(){var e;this.props.user&&this.props.dispatch((e=this.props.user.login.id,{type:"GET_SOCIETES",payload:I.a.get("/api/societesByUser",{params:{id:e}}).then(function(e){return e.data})}))}},{key:"render",value:function(){return r.a.createElement("div",{className:"PageContent"},r.a.createElement("form",null,r.a.createElement("div",{className:"SS"},r.a.createElement("label",{htmlFor:"societeSelect"},"Choisissez la soci\xe9t\xe9"),r.a.createElement("select",{id:"societeSelect",value:this.state.selectedSocieteId,onChange:this.handleSelectSociete},r.a.createElement("option",{value:""}),this.renderSocietes(this.props.societes)))),""!==this.state.selectedSocieteId?r.a.createElement(A,Object.assign({formulaires:this.props.formulaires,societe:this.getSelectedSociete()},this.props)):null)}}]),t}(n.Component);var D=Object(o.b)(function(e){return{societes:e.societes,formulaires:e.formulaires}})(_),T=function(e){function t(e){var a;return Object(f.a)(this,t),(a=Object(b.a)(this,Object(C.a)(t).call(this,e))).handleInputEmail=function(e){a.setState({email:e.target.value})},a.handleInputPassword=function(e){a.setState({password:e.target.value})},a.submitForm=function(e){e.preventDefault(),a.props.dispatch(function(e){var t=e.email,a=e.password;return{type:"USER_LOGIN",payload:I.a.post("/api/login",{email:t,password:a}).then(function(e){return e.data})}}(a.state))},a.state={email:"",password:"",error:"",success:!1},a}return Object(g.a)(t,e),Object(v.a)(t,[{key:"componentWillReceiveProps",value:function(e){e.user.login.isAuth&&this.props.history.push("/")}},{key:"render",value:function(){var e=this.props.user;return r.a.createElement("div",{className:"rl_container"},r.a.createElement("form",{onSubmit:this.submitForm},r.a.createElement("h2",null,"Log in here"),r.a.createElement("div",{className:"form_element"},r.a.createElement("input",{type:"email",placeholder:"Enter your mail",value:this.state.email,onChange:this.handleInputEmail})),r.a.createElement("div",{className:"form_element"},r.a.createElement("input",{type:"password",placeholder:"Enter your password",value:this.state.password,onChange:this.handleInputPassword})),r.a.createElement("button",{type:"submit"},"Log in"),r.a.createElement("div",{className:"error"},e.login?r.a.createElement("div",null,e.login.message):null)))}}]),t}(n.Component);var k=Object(o.b)(function(e){return{user:e.user}})(T),w=function(e){I.a.get("/api/logout").then(function(t){setTimeout(function(){e.history.push("/")},2e3)});return r.a.createElement("div",{className:"logout_container"},r.a.createElement("h1",null,"D\xe9connexion en cours"))},R=a(42),P=function(e){function t(e){var a;return Object(f.a)(this,t),(a=Object(b.a)(this,Object(C.a)(t).call(this,e))).handleInput=function(e,t){var n=e.target.value;a.setState(Object(R.a)({},t,n))},a.submitForm=function(e){var t;e.preventDefault(),a.props.dispatch((t=a.state,{type:"UPDATE_SOCIETE",payload:I.a.post("/api/updateSociete",t).then(function(e){return e.data})})),a.props.history.push("/")},a.state={id:"",name:"",adresse:"",PDC:"",admins:[],users:[]},a}return Object(g.a)(t,e),Object(v.a)(t,[{key:"componentWillMount",value:function(){var e;this.props.dispatch((e=this.props.match.params.id,{type:"GET_SOCIETE",payload:I.a.get("/api/getSociete",{params:{id:e}}).then(function(e){return e.data})})).then(function(){})}},{key:"componentWillReceiveProps",value:function(e){console.log(e.societe.societe),this.setState(Object(h.a)({},e.societe.societe))}},{key:"render",value:function(){var e=this;return""!==this.state.name?r.a.createElement("div",{className:"PageContent"},r.a.createElement("div",{className:"EditSocietePageContent"},r.a.createElement("form",{onSubmit:this.submitForm},r.a.createElement("div",{className:"form_element"},r.a.createElement("label",null,"Nom : "),r.a.createElement("input",{id:"name",value:this.state.name,onChange:function(t){return e.handleInput(t,"name")}})),r.a.createElement("div",{className:"form_element"},r.a.createElement("label",null,"Adresse : "),r.a.createElement("input",{id:"adresse",value:this.state.adresse,onChange:function(t){return e.handleInput(t,"adresse")}})),r.a.createElement("div",{className:"form_element"},r.a.createElement("label",null,"Personne de contact : "),r.a.createElement("input",{id:"PDC",value:this.state.PDC,onChange:function(t){return e.handleInput(t,"PDC")}})),r.a.createElement("div",{className:"Btn"},r.a.createElement("a",{onClick:this.submitForm},"Enregistrer"))))):null}}]),t}(n.Component);var G=Object(o.b)(function(e){return{societe:e.societes}})(P),L=function(e){function t(e){var a;return Object(f.a)(this,t),(a=Object(b.a)(this,Object(C.a)(t).call(this,e))).submitForm=function(e){var t;e.preventDefault(),a.props.dispatch((t=Object(h.a)({},a.state.formData,{admins:[a.props.user.login.id]}),{type:"ADD_SOCIETE",payload:I.a.post("/api/societe",t).then(function(e){return e.data})})),a.props.history.push("/")},a.handleChange=function(e,t){var n=Object(h.a)({},a.state.formData);n[t]=e.target.value,a.setState({formData:n})},a.state={formData:{name:"",adresse:"",PDC:""}},a}return Object(g.a)(t,e),Object(v.a)(t,[{key:"render",value:function(){var e=this;return r.a.createElement("div",{className:"rl_container article"},r.a.createElement("form",{onSubmit:this.submitForm},r.a.createElement("h2",null,"Nouvelle soci\xe9t\xe9"),r.a.createElement("div",{className:"form_element"},r.a.createElement("input",{type:"text",placeholder:"Nom",value:this.state.formData.name,onChange:function(t){return e.handleChange(t,"name")}})),r.a.createElement("div",{className:"form_element"},r.a.createElement("input",{type:"text",placeholder:"Adresse",value:this.state.formData.adresse,onChange:function(t){return e.handleChange(t,"adresse")}})),r.a.createElement("div",{className:"form_element"},r.a.createElement("input",{type:"text",placeholder:"Personne de contact",value:this.state.formData.PDC,onChange:function(t){return e.handleChange(t,"PDC")}})),r.a.createElement("button",{type:"submit"},"Enregistrer")))}}]),t}(n.Component);var U=Object(o.b)(function(e){return{societe:e.societes}})(L),x=function(e){function t(e){var a;return Object(f.a)(this,t),(a=Object(b.a)(this,Object(C.a)(t).call(this,e))).convertDateToHtml=function(e){var t=new Date(e),a=("0"+(t.getMonth()+1)).slice(-2),n=("0"+t.getDate()).slice(-2);return t.getFullYear()+"-"+a+"-"+n},a.handleNumInput=function(e,t){var n=""!==e.target.value?parseInt(e.target.value):"";a.setState(Object(R.a)({},t,n))},a.handleDateInput=function(e,t){a.setState(Object(R.a)({},t,e.target.value)),console.log("NEW DATE IS: "+e.target.value)},a.submitForm=function(e){e.preventDefault();var t=Object(h.a)({},a.state);for(var n in t.date=new Date(t.date).toJSON(),t)""===t[n]&&delete t[n];a.props.saveFormulaire(t)},e.formulaire?a.state={_id:e.formulaire._id,societeId:e.formulaire.societeId,date:a.convertDateToHtml(e.formulaire.date),CA:e.formulaire.CA,FA:e.formulaire.FA,CS:e.formulaire.CS,FG:e.formulaire.FG,AF:e.formulaire.AF,EBITDA:e.formulaire.EBITDA,CCT:e.formulaire.CCT,CLT:e.formulaire.CLT,CF:e.formulaire.CF,Inv:e.formulaire.Inv}:a.state={_id:"",societeId:a.props.societeId,date:"",CA:"",FA:"",CS:"",FG:"",AF:"",EBITDA:"",CCT:"",CLT:"",CF:"",Inv:""},console.log(a.state.date),a}return Object(g.a)(t,e),Object(v.a)(t,[{key:"render",value:function(){var e=this;return r.a.createElement("div",null,r.a.createElement("form",{onSubmit:this.submitForm},r.a.createElement("h2",null,"Edition du formulaire"),r.a.createElement("div",{className:"form_element"},r.a.createElement("label",null,"Date : "),r.a.createElement("input",{id:"dateIn",type:"date",value:this.state.date,onChange:function(t){return e.handleDateInput(t,"date")}})),r.a.createElement("div",{className:"form_element"},r.a.createElement("label",null,"Chiffre d'affaire : "),r.a.createElement("input",{type:"number",placeholder:"Chiffre d'affaire",value:this.state.CA,onChange:function(t){return e.handleNumInput(t,"CA")}})),r.a.createElement("div",{className:"form_element"},r.a.createElement("label",null,"Frais d'achats : "),r.a.createElement("input",{type:"number",placeholder:"Frais d'achats",value:this.state.FA,onChange:function(t){return e.handleNumInput(t,"FA")}})),r.a.createElement("div",{className:"form_element"},r.a.createElement("label",null,"Charges salariales : "),r.a.createElement("input",{type:"number",placeholder:"Charges salariales",value:this.state.CS,onChange:function(t){return e.handleNumInput(t,"CS")}})),r.a.createElement("div",{className:"form_element"},r.a.createElement("label",null,"Frais g\xe9n\xe9raux : "),r.a.createElement("input",{type:"number",placeholder:"Frais g\xe9n\xe9raux",value:this.state.FG,onChange:function(t){return e.handleNumInput(t,"FG")}})),r.a.createElement("div",{className:"form_element"},r.a.createElement("label",null,"Autres frais : "),r.a.createElement("input",{type:"number",placeholder:"Autres frais",value:this.state.AF,onChange:function(t){return e.handleNumInput(t,"AF")}})),r.a.createElement("div",{className:"form_element"},r.a.createElement("label",null,"EBITDA : "),r.a.createElement("input",{type:"number",placeholder:"EBITDA",value:this.state.EBITDA,onChange:function(t){return e.handleNumInput(t,"EBITDA")}})),r.a.createElement("div",{className:"form_element"},r.a.createElement("label",null,"Cr\xe9dits \xe0 court termes : "),r.a.createElement("input",{type:"number",placeholder:"Cr\xe9dits court termes",value:this.state.CCT,onChange:function(t){return e.handleNumInput(t,"CCT")}})),r.a.createElement("div",{className:"form_element"},r.a.createElement("label",null,"Cr\xe9dits \xe0 long termes : "),r.a.createElement("input",{type:"number",placeholder:"Cr\xe9dits long termes",value:this.state.CLT,onChange:function(t){return e.handleNumInput(t,"CLT")}})),r.a.createElement("div",{className:"form_element"},r.a.createElement("label",null,"Cashflow : "),r.a.createElement("input",{type:"number",placeholder:"Cashflow",value:this.state.CF,onChange:function(t){return e.handleNumInput(t,"CF")}})),r.a.createElement("div",{className:"form_element"},r.a.createElement("label",null,"Investissements : "),r.a.createElement("input",{type:"number",placeholder:"Investissements",value:this.state.Inv,onChange:function(t){return e.handleNumInput(t,"Inv")}})),r.a.createElement("div",{className:"Btn"},r.a.createElement("a",{onClick:this.submitForm},"Enregistrer"))))}}]),t}(n.Component),B=function(e){function t(e){var a;return Object(f.a)(this,t),(a=Object(b.a)(this,Object(C.a)(t).call(this,e))).sendUpdateFormulaire=function(e){var t;e._id?a.props.dispatch((t=e,{type:"UPDATE_FORMULAIRE",payload:I.a.post("/api/updateFormulaire",t).then(function(e){return e.data})})):a.props.dispatch(S(e)),a.props.history.push("/")},a}return Object(g.a)(t,e),Object(v.a)(t,[{key:"componentWillMount",value:function(){var e;this.props.dispatch((e=this.props.match.params.id,{type:"GET_FORMULAIRE",payload:I.a.get("/api/getFormulaire",{params:{id:e}}).then(function(e){return e.data})})).then(function(){})}},{key:"renderFormulaire",value:function(){return this.props.formulaire?r.a.createElement(x,{key:this.props.formulaire._id,societeId:this.props.formulaire.societeId,saveFormulaire:this.sendUpdateFormulaire,formulaire:this.props.formulaire}):null}},{key:"render",value:function(){return r.a.createElement("div",{className:"PageContent"},r.a.createElement("div",{className:"EditFormContainer"},this.renderFormulaire()))}}]),t}(n.Component);var M=Object(o.b)(function(e){return{formulaire:e.formulaires.formulaire}})(B),W=function(e){var t=function(t,a){e.handleNum(e.formId,t.target.value,a)};return r.a.createElement("div",{className:"AddFormContainer"},r.a.createElement("form",{onSubmit:function(e){e.preventDefault()}},r.a.createElement("div",{className:"form_element"},r.a.createElement("input",{id:"dateIn",type:"date",value:e.date,onChange:function(t){return function(t,a){e.handleDate(e.formId,t.target.value,a)}(t,"date")}})),r.a.createElement("div",{className:"form_element"},r.a.createElement("input",{type:"number",placeholder:"Chiffre d'affaire",value:e.CA,onChange:function(e){return t(e,"CA")}})),r.a.createElement("div",{className:"form_element"},r.a.createElement("input",{type:"number",placeholder:"Frais d'achats",value:e.FA,onChange:function(e){return t(e,"FA")}})),r.a.createElement("div",{className:"form_element"},r.a.createElement("input",{type:"number",placeholder:"Charges salariales",value:e.CS,onChange:function(e){return t(e,"CS")}})),r.a.createElement("div",{className:"form_element"},r.a.createElement("input",{type:"number",placeholder:"Frais g\xe9n\xe9raux",value:e.FG,onChange:function(e){return t(e,"FG")}})),r.a.createElement("div",{className:"form_element"},r.a.createElement("input",{type:"number",placeholder:"Autres frais",value:e.AF,onChange:function(e){return t(e,"AF")}})),r.a.createElement("div",{className:"form_element"},r.a.createElement("input",{type:"number",placeholder:"EBITDA",value:e.EBITDA,onChange:function(e){return t(e,"EBITDA")}})),r.a.createElement("div",{className:"form_element"},r.a.createElement("input",{type:"number",placeholder:"Cr\xe9dits court termes",value:e.CCT,onChange:function(e){return t(e,"CCT")}})),r.a.createElement("div",{className:"form_element"},r.a.createElement("input",{type:"number",placeholder:"Cr\xe9dits long termes",value:e.CLT,onChange:function(e){return t(e,"CLT")}})),r.a.createElement("div",{className:"form_element"},r.a.createElement("input",{type:"number",placeholder:"Cashflow",value:e.CF,onChange:function(e){return t(e,"CF")}})),r.a.createElement("div",{className:"form_element"},r.a.createElement("input",{type:"number",placeholder:"Investissements",value:e.Inv,onChange:function(e){return t(e,"Inv")}}))))},H=function(e){function t(e){var a;return Object(f.a)(this,t),(a=Object(b.a)(this,Object(C.a)(t).call(this,e))).handleNumInput=function(e,t,n){var r=""!==t?parseInt(t):"",l=a.state;l.formulaires[e][n]=r,a.setState(l)},a.handleDateInput=function(e,t,n){console.log("NEW DATE IS: "+t);var r=a.state;r.formulaires[e][n]=t,a.setState(r)},a.convertDateToHtml=function(e){var t=new Date(e),a=("0"+(t.getMonth()+1)).slice(-2),n=t.getDate();return t.getFullYear()+"-"+a+"-"+n},a.sendUpdateFormulaire=function(e){var t=e;for(var n in t.date=new Date(t.date).toJSON(),t)""===t[n]&&delete t[n];a.props.dispatch(S(t))},a.SaveAllChanges=function(){for(var e in a.state.formulaires)console.log("FORMULAIRE DATA TO ADD: "+a.state.formulaires[e]),a.sendUpdateFormulaire(a.state.formulaires[e]);a.props.history.push("/")},a.AddFormulaire=function(){var e={societeId:a.props.match.params.id,date:"",CA:"",FA:"",CS:"",FG:"",AF:"",EBITDA:"",CCT:"",CLT:"",CF:"",Inv:""},t=a.state;t.formulaires.push(e),a.setState(t),console.log(a.state)},a.state={formulaires:[{societeId:a.props.match.params.id,date:"",CA:"",FA:"",CS:"",FG:"",AF:"",EBITDA:"",CCT:"",CLT:"",CF:"",Inv:""}]},a}return Object(g.a)(t,e),Object(v.a)(t,[{key:"componentWillMount",value:function(){}},{key:"renderFormulaires",value:function(){var e=this;return this.state.formulaires.map(function(t,a){return r.a.createElement(W,Object.assign({key:a,formId:a},t,{handleNum:e.handleNumInput,handleDate:e.handleDateInput}))})}},{key:"render",value:function(){return r.a.createElement("div",{className:"AddFormPageContent"},r.a.createElement("h2",null,"Ajout de formulaires"),this.renderFormulaires(),r.a.createElement("div",{className:"Btn"},r.a.createElement("a",{onClick:this.SaveAllChanges},"Enregistrer"),r.a.createElement("a",{onClick:this.AddFormulaire},"Ajouter un formulaire")))}}]),t}(n.Component),J=function(e){function t(){var e,a;Object(f.a)(this,t);for(var n=arguments.length,l=new Array(n),s=0;s<n;s++)l[s]=arguments[s];return(a=Object(b.a)(this,(e=Object(C.a)(t)).call.apply(e,[this].concat(l)))).state={email:"",password:"",privileges:0,error:""},a.handleInputEmail=function(e){a.setState({email:e.target.value})},a.handleInputPassword=function(e){a.setState({password:e.target.value})},a.handleInputPrivileges=function(e){var t="1"===e.target.value?1:0;a.setState({privileges:t})},a.submitForm=function(e){e.preventDefault(),a.setState({error:""}),a.props.dispatch(function(e,t){var a=I.a.post("/api/register",e);return function(e){a.then(function(a){var n=a.data,r=n.success?[].concat(Object(y.a)(t),[n.user]):t,l={success:n.success,users:r};e({type:"USER_REGISTER",payload:l})})}}({email:a.state.email,password:a.state.password,privileges:a.state.privileges},a.props.user.users))},a.showUsers=function(e){return e.users?e.users.map(function(e){return r.a.createElement("tr",{key:e._id},r.a.createElement("td",null,e.email),r.a.createElement("td",null,e.privileges))}):null},a}return Object(g.a)(t,e),Object(v.a)(t,[{key:"componentWillMount",value:function(){this.props.dispatch({type:"GET_USER",payload:I.a.get("/api/users").then(function(e){return e.data})})}},{key:"componentWillReceiveProps",value:function(e){!1===e.user.register?this.setState({error:"Error,try again"}):this.setState({email:"",password:"",privileges:0})}},{key:"render",value:function(){var e=this.props.user;return r.a.createElement("div",{className:"rl_container"},r.a.createElement("form",{onSubmit:this.submitForm},r.a.createElement("h2",null,"Ajouter un utilisateur"),r.a.createElement("div",{className:"form_element"},r.a.createElement("input",{type:"email",placeholder:"Email",value:this.state.email,onChange:this.handleInputEmail})),r.a.createElement("div",{className:"form_element"},r.a.createElement("input",{type:"password",placeholder:"Mot de passe",value:this.state.password,onChange:this.handleInputPassword})),r.a.createElement("div",{className:"form_element"},r.a.createElement("select",{value:this.state.privileges,onChange:this.handleInputPrivileges},r.a.createElement("option",{value:"0"},"utilisateur"),r.a.createElement("option",{value:"1"},"administrateur"))),r.a.createElement("button",{type:"submit"},"Enregistrer"),r.a.createElement("div",{className:"error"},this.state.error)),r.a.createElement("div",{className:"current_users"},r.a.createElement("h4",null,"Utilisateurs existants:"),r.a.createElement("table",null,r.a.createElement("thead",null,r.a.createElement("tr",null,r.a.createElement("th",null,"Email"),r.a.createElement("th",null,"Privileges"))),r.a.createElement("tbody",null,this.showUsers(e)))))}}]),t}(n.PureComponent);var Y=Object(o.b)(function(e){return{user:e.user}})(J),K=a(322),z=a(324),Q=a(326),V=a(318),q=a(319),X=a(325),Z=a(321),$=a(137),ee=function(e){function t(e){var a;return Object(f.a)(this,t),(a=Object(b.a)(this,Object(C.a)(t).call(this,e))).state={toShow:{CA:!0,FA:!0,CS:!0,FG:!0,AF:!0,EBITDA:!0,CCT:!0,CLT:!0,CF:!0,Inv:!0}},a}return Object(g.a)(t,e),Object(v.a)(t,[{key:"componentWillMount",value:function(){var e=this;this.props.dispatch(N(this.props.match.params.id)).then(function(){console.log("Formulaires obtenus pour la soci\xe9t\xe9: "+e.props.match.params.id)})}},{key:"componentWillReceiveProps",value:function(e){var t=e.formulaires;for(var a in t)t[a].date=new Date(t[a].date).toLocaleDateString();this.setState(Object(h.a)({},this.state,{data:t}))}},{key:"handleFieldSelect",value:function(e){var t=this.state;t.toShow[e.target.name]=e.target.checked,console.log(t),this.setState(t)}},{key:"renderFieldSelect",value:function(){var e=this,t=Object.keys(this.state.toShow).map(function(t){return r.a.createElement("div",{className:"CheckboxesGraphElem",key:t},r.a.createElement("label",null,t," : "),r.a.createElement("input",{type:"checkbox",name:t,checked:e.state.toShow[t],onChange:function(t){return e.handleFieldSelect(t)}}))});return r.a.createElement("div",{className:"CheckboxesGraph"},t)}},{key:"renderGraph",value:function(){var e=this,t={CA:"#800000",FA:"#000075",CS:"#f032e6",FG:"#3cb44b",AF:"#ffe119",EBITDA:"#42d4f4",CCT:"#f58231",CLT:"#0000ff",CF:"#000000",Inv:"#ff0000"},a=Object.keys(this.state.toShow).map(function(a,n){return e.state.toShow[a]?r.a.createElement(K.a,{key:n,type:"monotone",dataKey:a,stroke:t[a]}):null});return this.props.formulaires?r.a.createElement("div",{className:"FormGraph"},r.a.createElement(z.a,{width:"100%",aspect:2.2},r.a.createElement(Q.a,{width:600,height:300,data:this.state.data,margin:{top:5,right:30,left:20,bottom:5}},r.a.createElement(V.a,{dataKey:"date"}),r.a.createElement(q.a,null),r.a.createElement(X.a,{strokeDasharray:"3 3"}),r.a.createElement(Z.a,null),r.a.createElement($.a,null),a))):null}},{key:"render",value:function(){return r.a.createElement("div",{className:"GraphContainer"},this.renderFieldSelect(),this.renderGraph())}}]),t}(n.Component);var te=Object(o.b)(function(e){return{formulaires:e.formulaires.list}})(ee),ae=a(155),ne=a.n(ae);var re=Object(o.b)(function(e){return{user:e.user}})(function(e,t){t.user;var a=[{type:"navItem",icon:"home",text:"Accueil",link:"/",restricted:!0},{type:"navItem",icon:"user-plus",text:"Nouvel utilisateur (admin)",link:"/user/register",restricted:!0,admin:!0},{type:"navItem",icon:"sign-in",text:"Connexion",link:"/login",restricted:!1,exclude:!0},{type:"navItem",icon:"sign-out",text:"D\xe9connexion",link:"/logout",restricted:!0},{type:"navItem",icon:"file-text-o",text:"Nouvelle soci\xe9t\xe9",link:"/societe/add",restricted:!0}],n=function(t,a){return r.a.createElement("div",{key:a,className:t.type},r.a.createElement(i.b,{to:t.link,onClick:e.onHideNav},r.a.createElement(j.a,{name:t.icon}),t.text))};return r.a.createElement("div",null,e.user.login?a.map(function(t,a){return e.user.login.isAuth?t.exclude?null:e.user.login.privileges||!t.admin?n(t,a):null:t.restricted?null:n(t,a)}):null)}),le=function(e){return r.a.createElement(ne.a,{showNav:e.showNav,onHideNav:e.onHideNav,navStyle:{background:"#222",width:"50%",maxWidth:"15em"}},r.a.createElement(re,{onHideNav:e.onHideNav}))},se=function(e){function t(e){var a;return Object(f.a)(this,t),(a=Object(b.a)(this,Object(C.a)(t).call(this,e))).onHideNav=function(){a.setState({showNav:!1})},a.state={showNav:!1},a}return Object(g.a)(t,e),Object(v.a)(t,[{key:"render",value:function(){var e=this;return r.a.createElement("header",null,r.a.createElement(le,{showNav:this.state.showNav,onHideNav:function(){return e.onHideNav()}}),r.a.createElement("div",{className:"open_nav"},r.a.createElement(j.a,{name:"bars",onClick:function(){return e.setState({showNav:!0})},style:{color:"lightGray",padding:"8pt",cursor:"pointer"}})),r.a.createElement(i.b,{to:"/",className:"logo"},"Digitech TP"))}}]),t}(n.Component),ie=function(e){return r.a.createElement("div",null,r.a.createElement(se,null),e.children)},oe=function(e,t){var a=function(a){function n(e){var t;return Object(f.a)(this,n),(t=Object(b.a)(this,Object(C.a)(n).call(this,e))).state={loading:!0},t}return Object(g.a)(n,a),Object(v.a)(n,[{key:"componentWillMount",value:function(){this.props.dispatch({type:"USER_AUTH",payload:I.a.get("/api/auth").then(function(e){return e.data})})}},{key:"componentWillReceiveProps",value:function(e){this.setState({loading:!1}),e.user.login.isAuth?!1===t&&this.props.history.push("/"):t&&this.props.history.push("/login")}},{key:"render",value:function(){return this.state.loading?r.a.createElement("div",{className:"loader"},"Chargement"):r.a.createElement(e,Object.assign({},this.props,{user:this.props.user}))}}]),n}(n.Component);return Object(o.b)(function(e){return{user:e.user}})(a)},ce=function(){return r.a.createElement(ie,null,r.a.createElement(i.d,null,r.a.createElement(i.c,{path:"/",exact:!0,component:oe(D,!0)}),r.a.createElement(i.c,{path:"/login",exact:!0,component:oe(k,!1)}),r.a.createElement(i.c,{path:"/logout",exact:!0,component:oe(w,!0)}),r.a.createElement(i.c,{path:"/user/register",exact:!0,component:oe(Y,!0)}),r.a.createElement(i.c,{path:"/societe/add",exact:!0,component:oe(U,!0)}),r.a.createElement(i.c,{path:"/societe/:id",exact:!0,component:oe(G,!0)}),r.a.createElement(i.c,{path:"/formulaire/:id",exact:!0,component:oe(M,!0)}),r.a.createElement(i.c,{path:"/addFormulaires/:id",exact:!0,component:oe(H,!0)}),r.a.createElement(i.c,{path:"/societeGraph/:id",exact:!0,component:oe(te,!0)})))},ue=Object(c.a)(m.a,p.a)(c.d);s.a.render(r.a.createElement(o.a,{store:ue(E)},r.a.createElement(i.a,null,r.a.createElement(ce,null))),document.getElementById("root"))}},[[157,2,1]]]);
//# sourceMappingURL=main.31865f1f.chunk.js.map