"use strict";(self.webpackChunkpandora=self.webpackChunkpandora||[]).push([[57],{18057:(e,n,t)=>{t.r(n),t.d(n,{default:()=>P});var a=t(71083),l=t(96540),r=t(1686),o=t(47767),i=t(84976),c=t(86798),s=t(64137),d=t(43884),u=t(14774),m=t(33198),f=t(96627),p=t(93589);function h(e,n,t){return(n=function(e){var n=function(e){if("object"!=typeof e||!e)return e;var n=e[Symbol.toPrimitive];if(void 0!==n){var t=n.call(e,"string");if("object"!=typeof t)return t;throw new TypeError("@@toPrimitive must return a primitive value.")}return String(e)}(e);return"symbol"==typeof n?n:n+""}(n))in e?Object.defineProperty(e,n,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[n]=t,e}const g="/main";class v extends l.Component{constructor(){super(...arguments),h(this,"state",{value:"",users:[]}),h(this,"search",(async e=>{a.A.get("".concat(g,"/admin/users"),{params:{value:e}}).then((e=>{const n=e.data;this.setState({users:n})}))})),h(this,"onChangeHandler",(async e=>{this.search(e.target.value),this.state.value=e.target.value}))}componentDidMount(){const e=JSON.parse(localStorage.getItem("user"));a.A.defaults.headers.common.Authorization="Bearer "+e.accessToken,a.A.get("".concat(p.A).concat(g,"/getusers")).then((e=>{const n=e.data;this.setState({users:n})}))}setActive(e,n){console.log(e,n),a.A.post("".concat(p.A).concat(g,"/admin/user/ban/")+e.id).then((function(e){console.log(e)})).catch((function(e){console.log(e)}))}active(e){return e.active?React.createElement(u.A,{align:"right",className:"finished"},React.createElement("select",{onChange:n=>this.setActive(e,n)},React.createElement("option",{selected:!0},"Активен"),React.createElement("option",null,"Не Активен"))):React.createElement(u.A,{align:"right",className:"unfinished"},React.createElement("select",{onChange:n=>this.setActive(e,n)},React.createElement("option",null,"Активен"),React.createElement("option",{selected:!0},"Не Активен")))}render(){return React.createElement(React.Fragment,null,React.createElement("input",{value:this.state.value,onChange:e=>this.onChangeHandler(e),type:"text",className:"searchUsers",placeholder:"Поиск пользователей"}),React.createElement(m.A,null,React.createElement(s.A,{className:"table adminPanelTable uitable"},React.createElement(f.A,null,React.createElement(c.A,{className:"uitableHead"},React.createElement(u.A,{style:{width:"5%"}},React.createElement("a",null,"#")),React.createElement(u.A,{style:{width:"20%"}},React.createElement("a",null,"Почта")),React.createElement(u.A,{style:{width:100}},React.createElement("a",null,"ФИО")),React.createElement(u.A,{align:"right"},React.createElement("a",null,"Статус активности")))),React.createElement(d.A,null,this.state.users.map(((e,n)=>React.createElement(c.A,{hover:!0},React.createElement(u.A,null,React.createElement("a",null,n+1)),React.createElement(u.A,{style:{width:"20%"}},React.createElement(i.N_,{className:"rowInfo",to:{pathname:"/users/".concat(e.username),state:{user:e}}},e.username)),React.createElement(u.A,null,React.createElement("a",null,e.email)),this.active(e))))))))}}var x=t(85072),E=t.n(x),b=t(97825),y=t.n(b),A=t(77659),w=t.n(A),R=t(55056),S=t.n(R),N=t(10540),I=t.n(N),z=t(41113),U=t.n(z),C=t(28051),k={};k.styleTagTransform=U(),k.setAttributes=S(),k.insert=w().bind(null,"head"),k.domAPI=y(),k.insertStyleElement=I(),E()(C.A,k),C.A&&C.A.locals&&C.A.locals;const P=e=>{const n=JSON.parse(localStorage.getItem("user")),t=(0,o.Zp)(),[i,c]=(0,l.useState)(0),[s,d]=(0,l.useState)(0),[u,m]=(0,l.useState)(0);return(0,o.zy)(),(0,l.useEffect)((()=>{n.roles.includes("ADMIN")||t("/"),a.A.get("".concat("http://10.202.20.92:8081/api/pandora/main","/general")).then((e=>{c(e.data.userNumber),d(e.data.allLogsNum),m(e.data.todayRequests)}))})),l.createElement("div",{className:"adminPage",style:{display:"flex",flexDirection:"row"}},l.createElement(r.A,null),l.createElement("section",null,l.createElement("div",{className:"countStats"},l.createElement("div",{className:"lastQuery"},l.createElement("div",null,"Количество пользователей"),l.createElement("div",null,i)),l.createElement("div",null,l.createElement("div",null,"Количество запросов"),l.createElement("div",null,s)),l.createElement("div",null,l.createElement("div",null,"Количество запросов за сегодня"),l.createElement("div",null,u))),l.createElement("div",null,l.createElement(v,null)),l.createElement("div",{className:"footer"})))}},28051:(e,n,t)=>{t.d(n,{A:()=>i});var a=t(31601),l=t.n(a),r=t(76314),o=t.n(r)()(l());o.push([e.id,"section {\n    display: flex;\n    flex-direction: column;\n    gap: 50px;\n\n    max-width: 1000px;\n    min-width: 600px;\n    margin: 0 auto;\n\n    padding-top: 70px;\n    overflow-y: hidden;\n}\n/* * {\n    border: 1px solid red\n} */\n.countStats {\n\n    display: flex;\n    flex-direction: row;\n    gap: 20px;\n\n    /* flex-wrap: wrap; */\n\n    /* border: red 1px solid; */\n}\n\n.countStats > div {\n    width: 324px;\n\n    border: 1px rgba(255, 255, 255, .4) solid;\n    display: flex;\n    flex-direction: column;\n    /* gap: 10px; */\n\n    padding: 15px 0 0 15px;\n    border-radius: 2px;\n\n}\n\n.countStats > div div:nth-child(1) {\n    font-family: 'Ubuntu';\n    font-style: normal;\n    font-weight: 700;\n    font-size: 15px;\n\n    color: #717171;\n}\n\n\n.countStats > div div:nth-child(2) {\n    font-family: 'Ubuntu';\n    font-style: normal;\n    font-weight: 700;\n    font-size: 96px;\n\n    margin-left: 20px;\n    margin-top: -8px;\n}\n\n.lastQuery > div:nth-child(2) {\n    font-family: 'Ubuntu';\n    font-style: normal;\n    font-weight: 700;\n    font-size: 20px;\n\n    margin-left: 20px;\n    margin-top: -8px;\n}\n\n.lastQuery > div:nth-child(3) {\n    font-family: 'Ubuntu';\n    font-style: normal;\n    font-weight: 700;\n    font-size: 20px;\n\n    margin-left: 20px;\n    margin-top: -8px;\n}\n\n.userInfo {\n    display: flex;\n    flex-direction: column;\n\n    width: 90%;\n    /* border: red 1px solid; */\n}\n\n.userInfo > div {\n    margin: 0;\n}\n\n.userInfo > div:nth-child(1) > span {\n    font-family: 'Ubuntu';\n    font-style: normal;\n    font-weight: 700;\n    font-size: 35px;\n}\n\n.userInfo > div:nth-child(1) > span:nth-child(1) {\n    color: #808080;\n}\n\n.userInfo > div:nth-child(1) > span:nth-child(2) {\n    color: #abaaaa;\n}\n\n.userInfo > div:nth-child(2) {\n    color: #808080;\n    margin-top: -2px;\n    margin-left: 2px;\n}\n\nsection > div:nth-child(2) {\n    margin: 0;\n    padding: 0;\n}\n\n.table {\n    margin-top: 0;\n    width: 100%;\n}\n\n.finished select,\n.unfinished select {\n    width: 100px;\n    appearance: none;\n    outline: 0;\n\n    height: 35px;\n\n    padding-left: 10px;\n\n    font-style: normal;\n    font-weight: 400;\n    font-size: 14px;\n    line-height: 17px;\n    color: #808080;\n\n    border: none;\n    border-radius: 4px;\n\n}\n\n.uitable a {\n    color: #ffffff;\n    /* background-color: #808080; */\n}\n.searchUsers {\n    background: none;\n    color: #ffffff;\n    width: 100%;\n    border: none;\n    border-bottom: 1px solid rgb(143, 143, 143);\n    font-size: 1em;\n    transition: all ease .5s;\n\n    padding-bottom: 10px;\n    margin-bottom: 30px;\n}\n\n.searchUsers:focus {\n    outline: none;\n    border-bottom: 1px solid white;\n    transition: all ease .5s;\n}\n\n.uitableHead a {\n    color: #616161;\n    font-family: 'Ubuntu';\n    font-weight: 700;\n    font-size: 20px;\n}\n\n.uitablerow {\n    color: #ffffff;\n    overflow: hidden;\n}\n",""]);const i=o}}]);