"use strict";(self.webpackChunkpandora=self.webpackChunkpandora||[]).push([[994],{50994:(n,e,t)=>{t.r(e),t.d(e,{default:()=>q});var l=t(96540),o=(t(40961),t(85072)),r=t.n(o),i=t(97825),a=t.n(i),s=t(77659),c=t.n(s),d=t(55056),m=t.n(d),p=t(10540),u=t.n(p),f=t(41113),g=t.n(f),v=t(30210),h={};h.styleTagTransform=g(),h.setAttributes=m(),h.insert=c().bind(null,"head"),h.domAPI=a(),h.insertStyleElement=u(),r()(v.A,h),v.A&&v.A.locals&&v.A.locals;var b=t(49785),x=t(47767),E=t(61224),w=t(1205),y={};y.styleTagTransform=g(),y.setAttributes=m(),y.insert=c().bind(null,"head"),y.domAPI=a(),y.insertStyleElement=u(),r()(w.A,y),w.A&&w.A.locals&&w.A.locals;var k=t(68744);function A(){return A=Object.assign?Object.assign.bind():function(n){for(var e=1;e<arguments.length;e++){var t=arguments[e];for(var l in t)({}).hasOwnProperty.call(t,l)&&(n[l]=t[l])}return n},A.apply(null,arguments)}const N=()=>{var n,e,t,o,r,i;const a=(0,x.Zp)(),{register:s,handleSubmit:c,watch:d,formState:{errors:m}}=(0,b.mN)({defaultValues:{username:"",email:"",level:"",password:"",password_conf:"",fio:""}}),p={username:{required:"Username is required",minLength:{value:1,message:"Minimum length is 1"}},email:{required:"Email is required",validate:n=>{if(n.length<1)return"Email is invalid"}},fio:{required:"ФИО обязательна",validate:n=>{if(n.length<4)return"Не менее 4 символов в ФИО"}},level:{required:"Level is required. Please choose уровень доступа"},password:{required:"Password is required",minLength:{value:1,message:"Password must have at least 1 characters"}},password_conf:{required:"Password confirmation is required",validate:n=>{if(d("password")!=n)return"Your passwords do not match"}}};return l.createElement("div",null,l.createElement("form",{name:"registrationForm",onSubmit:c((n=>{console.log(n),k.A.register(n.username,n.email,n.fio,n.password,n.level).then((n=>{console.log(n),a("/login",{replace:!0})}),(n=>{console.log(n)}))}),(n=>{console.log(n)})),enctype:"multipart/form-data"},l.createElement("div",{className:"inputs"},l.createElement("div",{className:"firstLine"},l.createElement("div",null,l.createElement("label",null,"ФИО"),l.createElement("input",A({style:{backgroundColor:"rgba(153, 153, 153, 0.7)",color:"black"},type:"text"},s("username",p.username),{id:"username",placeholder:"Введите ФИО"}))),l.createElement("div",null,l.createElement("label",null,"Уровень доступа"),l.createElement("div",{className:"level"},l.createElement("select",A({style:{backgroundColor:"rgba(153, 153, 153, 0.7)",color:"black"}},s("level",p.level),{id:"level"}),l.createElement("option",{value:"",disabled:!0,selected:!0},"Выбрать уровень доступа"),l.createElement("option",{value:"admin"},"Admin"),l.createElement("option",{value:"vip"},"Vip"),l.createElement("option",{value:"1"},"1"),l.createElement("option",{value:"2"},"2"),l.createElement("option",{value:"3"},"3"))))),l.createElement("div",{className:"secondLine"},l.createElement("div",null,l.createElement("label",null,"Почта"),l.createElement("input",A({style:{backgroundColor:"rgba(153, 153, 153, 0.7)",color:"black"},type:"text"},s("email",p.email),{id:"email",placeholder:"Введите почту"})))),l.createElement("div",{className:"secondLine"},l.createElement("div",null,l.createElement("label",null,"Пароль"),l.createElement("input",A({style:{backgroundColor:"rgba(153, 153, 153, 0.7)",color:"black"},type:"password"},s("password",p.password),{id:"password",placeholder:"Введите пароль"})))),l.createElement("div",{className:"thirdLine"},l.createElement("div",null,l.createElement("label",null,"Подтверждение пароля"),l.createElement("input",A({style:{backgroundColor:"rgba(153, 153, 153, 0.7)",color:"black"},type:"password"},s("password_conf",p.password_conf),{id:"password-conf",placeholder:"Подтвердите пароль"}))))),l.createElement("div",{className:"actions"},l.createElement(E.A,{type:"button",value:"Очистить"},"Очистить"),l.createElement(E.A,{variant:"outlined",type:"submit",value:"Зарегистрировать"},"Зарегистрировать")),0!=Object.keys(m).length?l.createElement("div",{className:"errorsBlock"},l.createElement("div",{className:"title"},"Invalid Registration"),l.createElement("div",{className:"errors"},m.username?l.createElement("span",null,null===(n=m.username)||void 0===n?void 0:n.message):"",m.email?l.createElement("span",null,null===(e=m.email)||void 0===e?void 0:e.message):"",m.fio?l.createElement("span",null,null===(t=m.fio)||void 0===t?void 0:t.message):"",m.level?l.createElement("span",null,null===(o=m.level)||void 0===o?void 0:o.message):"",m.password?l.createElement("span",null,null===(r=m.password)||void 0===r?void 0:r.message):"",m.password_conf?l.createElement("span",null,null===(i=m.password_conf)||void 0===i?void 0:i.message):"")):""))};t(1686);class q extends l.Component{render(){return l.createElement("section",null,l.createElement("div",{className:"title"},l.createElement("div",null,"Регистрация")),l.createElement(N,null))}}},1205:(n,e,t)=>{t.d(e,{A:()=>a});var l=t(31601),o=t.n(l),r=t(76314),i=t.n(r)()(o());i.push([n.id,".errorsBlock {\n    border-radius: 4px;\n    background-color: rgb(112, 10, 10);\n    \n    display: flex;\n    flex-direction: column;\n    gap: 15px;\n\n    margin-top: -30px;\n    padding: 10px 0;\n\n    color: rgba(44, 44, 44, 0.7)\n}\n\n.errorsBlock .title {\n    margin: 0;\n    padding: 0;\n\n    font-size: 1.2em;\n    font-weight: 500;\n}\n\n.errorsBlock {\n    align-items: center;\n}\n\n.errorsBlock .errors {\n    display: flex;\n    flex-direction: column;\n    justify-content: center;\n    align-items: flex-start;\n}",""]);const a=i},30210:(n,e,t)=>{t.d(e,{A:()=>a});var l=t(31601),o=t.n(l),r=t(76314),i=t.n(r)()(o());i.push([n.id,"* {\n    outline: none;\n}\n\nsection {\n    overflow: none;\n    display: flex;\n    flex-direction: column;\n    gap: 50px;\n\n    max-width: 1000px;\n    min-width: 600px;\n    margin: 0 auto;\n}\n\nsection form {\n    display: flex;\n    flex-direction: column;\n    gap: 50px;\n}\n\nsection form > * {\n\n    overflow: none;\n    margin: 0;\n    padding: 0;\n}\n\nsection .title {\n    display: flex;\n    flex-direction: column;\n    align-items: center;    \n    gap: 0;\n\n    margin-top: 50px;\n\n    cursor: default;\n} \n\nsection .title div {\n    line-height: 85%;\n\n}\n\nsection .title div:nth-child(1) {\n    font-family: 'Ubuntu';\n    font-style: normal;\n    font-weight: 700;\n    font-size: 62px;\n\n    margin: 0;\n}\n\nsection .title div:nth-child(2) {\n    font-family: 'Ubuntu';\n    font-style: normal;\n    font-weight: 700;\n    font-size: 43px;\n\n    color: #5E5E5E;\n\n    margin: 0;\n}\n\nsection form .inputs {\n    display: flex;\n    flex-direction: column;\n    gap: 20px;\n}\n\nsection form .inputs > div {\n    display: flex;\n    flex-direction: row;\n    width: 100%;\n}\n\nsection form .inputs .firstLine,\nsection form .inputs .secondLine {\n    gap: 30px;\n}\n\nsection form .inputs > div > div {\n    display: flex;\n    flex-direction: column;\n    gap: 5px;\n    width: 100%;\n}\n\nsection form .inputs > div > div input {\n    width: 100%;\n    height: 30px;\n\n    padding-left: 10px;\n\n    font-style: normal;\n    font-weight: 400;\n    font-size: 14px;\n    line-height: 17px;\n    color: #808080;\n\n    border-radius: 4px;\n    border: none;\n\n    background-color: var(--secondary-color);\n}\n\n.inputs > div > div label {\n    font-size: 14px;\n    font-weight: 400;\n\n    color: #808080;\n\n    margin-left: 7px;\n}\n\n.level {\n    width: 100%;\n    position: relative;\n\n    display: flex;\n    flex-direction: row;\n    align-items: center;\n}\n\n.level select {\n    width: 100%;\n}\n\n.level::after {\n    position: absolute;\n    right: 5px;\n\n    pointer-events: none;\n\n    content: \"\";\n    width: 0.8em;\n    height: 0.5em;\n    background-color: var(--main-color);\n    clip-path: polygon(100% 0%, 0 0%, 50% 100%);\n}\n\nselect {\n    appearance: none;\n    outline: 0;\n\n    width: 100%;\n    height: 32.8px;\n\n    padding-left: 10px;\n\n    font-style: normal;\n    font-weight: 400;\n    font-size: 14px;\n    line-height: 17px;\n    color: #808080;\n\n    border: none;\n    border-radius: 4px;\n\n    background-color: var(--secondary-color);\n}\n\nsection form .actions {\n    display: flex;\n    flex-direction: row;\n    gap: 20px;\n    justify-content: end;\n    align-items: center;\n}\n\nsection form .actions input {\n    padding: 1px 11px;\n\n    height: 30px;\n    border: none;\n    border-radius: 4px;\n\n    box-sizing: content-box;\n\n    font-style: normal;\n    font-weight: 300;\n    font-size: 14px;\n    line-height: 17px;\n    color: #ffffff;\n\n    cursor: pointer;\n}\n\nsection form .actions #register {\n    background-color: #2D4231;\n    transition: .3s;\n}\n\nsection form .actions #register:hover {\n    background-color: #3a553f;\n    transition: .3s;\n}\n\nsection form .actions #register:active {\n    background-color: #223124;\n    transition: .3s;\n}\n\nsection form .actions #clear {\n    background-color: #393939;\n    transition: .3s;\n}\n\nsection form .actions #clear:hover {\n    background-color: #565656;\n    transition: .3s;\n}\n\nsection form .actions #clear:active {\n    background-color: #2c2b2b;\n    transition: .3s;\n}\n\nsection form .actions a:hover {\n    color: rgba(255, 255, 255, 0.5);\n}",""]);const a=i}}]);