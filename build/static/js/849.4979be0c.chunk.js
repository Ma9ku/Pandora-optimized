"use strict";(self.webpackChunkpandora=self.webpackChunkpandora||[]).push([[849],{9849:(e,s,l)=>{l.r(s),l.d(s,{default:()=>t});var r=l(5043),i=(l(7950),l(4858)),a=l(3216),d=l(2518),n=l(8370),o=l(579);const c=()=>{var e,s,l,r,c,t;const u=(0,a.Zp)(),{register:h,handleSubmit:v,watch:m,formState:{errors:p}}=(0,i.mN)({defaultValues:{username:"",email:"",level:"",password:"",password_conf:"",fio:""}}),x={username:{required:"Username is required",minLength:{value:1,message:"Minimum length is 1"}},email:{required:"Email is required",validate:e=>{if(e.length<1)return"Email is invalid"}},fio:{required:"\u0424\u0418\u041e \u043e\u0431\u044f\u0437\u0430\u0442\u0435\u043b\u044c\u043d\u0430",validate:e=>{if(e.length<4)return"\u041d\u0435 \u043c\u0435\u043d\u0435\u0435 4 \u0441\u0438\u043c\u0432\u043e\u043b\u043e\u0432 \u0432 \u0424\u0418\u041e"}},level:{required:"Level is required. Please choose \u0443\u0440\u043e\u0432\u0435\u043d\u044c \u0434\u043e\u0441\u0442\u0443\u043f\u0430"},password:{required:"Password is required",minLength:{value:1,message:"Password must have at least 1 characters"}},password_conf:{required:"Password confirmation is required",validate:e=>{if(m("password")!=e)return"Your passwords do not match"}}};return(0,o.jsx)("div",{children:(0,o.jsxs)("form",{name:"registrationForm",onSubmit:v((e=>{console.log(e),n.A.register(e.username,e.email,e.fio,e.password,e.level).then((e=>{console.log(e),u("/login",{replace:!0})}),(e=>{console.log(e)}))}),(e=>{console.log(e)})),enctype:"multipart/form-data",children:[(0,o.jsxs)("div",{className:"inputs",children:[(0,o.jsxs)("div",{className:"firstLine",children:[(0,o.jsxs)("div",{children:[(0,o.jsx)("label",{children:"\u0424\u0418\u041e"}),(0,o.jsx)("input",{style:{backgroundColor:"rgba(153, 153, 153, 0.7)",color:"black"},type:"text",...h("username",x.username),id:"username",placeholder:"\u0412\u0432\u0435\u0434\u0438\u0442\u0435 \u0424\u0418\u041e"})]}),(0,o.jsxs)("div",{children:[(0,o.jsx)("label",{children:"\u0423\u0440\u043e\u0432\u0435\u043d\u044c \u0434\u043e\u0441\u0442\u0443\u043f\u0430"}),(0,o.jsx)("div",{className:"level",children:(0,o.jsxs)("select",{style:{backgroundColor:"rgba(153, 153, 153, 0.7)",color:"black"},...h("level",x.level),id:"level",children:[(0,o.jsx)("option",{value:"",disabled:!0,selected:!0,children:"\u0412\u044b\u0431\u0440\u0430\u0442\u044c \u0443\u0440\u043e\u0432\u0435\u043d\u044c \u0434\u043e\u0441\u0442\u0443\u043f\u0430"}),(0,o.jsx)("option",{value:"admin",children:"Admin"}),(0,o.jsx)("option",{value:"vip",children:"Vip"}),(0,o.jsx)("option",{value:"1",children:"1"}),(0,o.jsx)("option",{value:"2",children:"2"}),(0,o.jsx)("option",{value:"3",children:"3"})]})})]})]}),(0,o.jsx)("div",{className:"secondLine",children:(0,o.jsxs)("div",{children:[(0,o.jsx)("label",{children:"\u041f\u043e\u0447\u0442\u0430"}),(0,o.jsx)("input",{style:{backgroundColor:"rgba(153, 153, 153, 0.7)",color:"black"},type:"text",...h("email",x.email),id:"email",placeholder:"\u0412\u0432\u0435\u0434\u0438\u0442\u0435 \u043f\u043e\u0447\u0442\u0443"})]})}),(0,o.jsx)("div",{className:"secondLine",children:(0,o.jsxs)("div",{children:[(0,o.jsx)("label",{children:"\u041f\u0430\u0440\u043e\u043b\u044c"}),(0,o.jsx)("input",{style:{backgroundColor:"rgba(153, 153, 153, 0.7)",color:"black"},type:"password",...h("password",x.password),id:"password",placeholder:"\u0412\u0432\u0435\u0434\u0438\u0442\u0435 \u043f\u0430\u0440\u043e\u043b\u044c"})]})}),(0,o.jsx)("div",{className:"thirdLine",children:(0,o.jsxs)("div",{children:[(0,o.jsx)("label",{children:"\u041f\u043e\u0434\u0442\u0432\u0435\u0440\u0436\u0434\u0435\u043d\u0438\u0435 \u043f\u0430\u0440\u043e\u043b\u044f"}),(0,o.jsx)("input",{style:{backgroundColor:"rgba(153, 153, 153, 0.7)",color:"black"},type:"password",...h("password_conf",x.password_conf),id:"password-conf",placeholder:"\u041f\u043e\u0434\u0442\u0432\u0435\u0440\u0434\u0438\u0442\u0435 \u043f\u0430\u0440\u043e\u043b\u044c"})]})})]}),(0,o.jsxs)("div",{className:"actions",children:[(0,o.jsx)(d.A,{type:"button",value:"\u041e\u0447\u0438\u0441\u0442\u0438\u0442\u044c",children:"\u041e\u0447\u0438\u0441\u0442\u0438\u0442\u044c"}),(0,o.jsx)(d.A,{variant:"outlined",type:"submit",value:"\u0417\u0430\u0440\u0435\u0433\u0438\u0441\u0442\u0440\u0438\u0440\u043e\u0432\u0430\u0442\u044c",children:"\u0417\u0430\u0440\u0435\u0433\u0438\u0441\u0442\u0440\u0438\u0440\u043e\u0432\u0430\u0442\u044c"})]}),0!=Object.keys(p).length?(0,o.jsxs)("div",{className:"errorsBlock",children:[(0,o.jsx)("div",{className:"title",children:"Invalid Registration"}),(0,o.jsxs)("div",{className:"errors",children:[p.username?(0,o.jsx)("span",{children:null===(e=p.username)||void 0===e?void 0:e.message}):"",p.email?(0,o.jsx)("span",{children:null===(s=p.email)||void 0===s?void 0:s.message}):"",p.fio?(0,o.jsx)("span",{children:null===(l=p.fio)||void 0===l?void 0:l.message}):"",p.level?(0,o.jsx)("span",{children:null===(r=p.level)||void 0===r?void 0:r.message}):"",p.password?(0,o.jsx)("span",{children:null===(c=p.password)||void 0===c?void 0:c.message}):"",p.password_conf?(0,o.jsx)("span",{children:null===(t=p.password_conf)||void 0===t?void 0:t.message}):""]})]}):""]})})};l(9086);class t extends r.Component{render(){return(0,o.jsxs)("section",{children:[(0,o.jsx)("div",{className:"title",children:(0,o.jsx)("div",{children:"\u0420\u0435\u0433\u0438\u0441\u0442\u0440\u0430\u0446\u0438\u044f"})}),(0,o.jsx)(c,{})]})}}}}]);
//# sourceMappingURL=849.4979be0c.chunk.js.map