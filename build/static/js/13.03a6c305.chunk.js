(this["webpackJsonptemplate-react-chakraui-eslint-eslint"]=this["webpackJsonptemplate-react-chakraui-eslint-eslint"]||[]).push([[13],{178:function(e,r,t){"use strict";r.a=t.p+"static/media/ir-logo.e0c8482a.png"},276:function(e,r,t){"use strict";t.r(r);var n=t(55),a=t(4),c=t.n(a),i=t(8),o=t(11),s=t(0),l=t(67),u=t(86),d=t(95),b=t(87),f=t(157),j=t(9),p=t(187),h=t(66),m=t(178),O=t(6);r.default=function(){var e=Object(s.useContext)(h.a),r=e.authenticateUser,t=e.logOut,a=Object(s.useState)(!1),g=Object(o.a)(a,2),x=g[0],v=g[1],w=Object(s.useState)(!1),k=Object(o.a)(w,2),y=k[0],S=k[1],C=Object(j.g)(),E=sessionStorage.getItem("token");Object(s.useEffect)((function(){E&&t()}),[]);var q=Object(f.b)(),z=q.register,F=q.handleSubmit,I=q.formState.errors,N=function(){var e=Object(i.a)(c.a.mark((function e(t){return c.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,r(t);case 2:t.isAuthenticated?C("/propiedades"):S(!0);case 3:case"end":return e.stop()}}),e)})));return function(r){return e.apply(this,arguments)}}();return Object(O.jsx)(O.Fragment,{children:Object(O.jsx)(l.b,{h:"100vh",display:"flex",justifyContent:"center",alignItems:"center",children:Object(O.jsxs)(l.b,{border:"2px solid #cacaca !important",p:"4",px:"8",maxW:"md",w:"md",borderWidth:"1px",borderRadius:"lg",overflow:"hidden",children:[Object(O.jsx)(l.b,{display:"flex",justifyContent:"center",children:Object(O.jsx)(u.a,{src:m.a,_hover:{transition:"transform .2s",transform:"scale(0.98)"},p:"10",w:"350px",loading:"lazy"})}),Object(O.jsx)("form",{onSubmit:F(N),children:Object(O.jsxs)(l.m,{spacing:"14px",px:"4",py:"4",children:[Object(O.jsxs)(l.b,{w:"100%",children:[Object(O.jsx)(d.a,Object(n.a)(Object(n.a)({onKeyUp:function(){return S(!1)},id:"username",autoComplete:"username"},z("username",{required:" El nombre de usuario es requerido."})),{},{autoFocus:!0,border:"2px solid #cacaca",placeholder:"Ingresa tu nombre de usuario"})),I.username&&Object(O.jsx)(l.a,{variant:"required-error",children:I.username.message})]}),Object(O.jsxs)(l.b,{w:"100%",children:[Object(O.jsxs)(d.b,{size:"md",children:[Object(O.jsx)(d.a,Object(n.a)(Object(n.a)({onKeyUp:function(){return S(!1)},id:"current-password",autoComplete:"current-password"},z("password",{required:"La contrase\xf1a es requerida."})),{},{border:"2px solid #cacaca",placeholder:"Ingresa tu contrase\xf1a",type:x?"text":"password"})),Object(O.jsx)(d.d,{width:"4.5rem",children:Object(O.jsx)(b.a,{_hover:{boxShadow:"none",bg:"defaultColor.50"},h:"1.75rem",mr:"-5",bg:"none",color:"defaultColor.500",size:"sm",onClick:function(){return v(!x)},children:x?Object(O.jsx)(p.b,{fontSize:"18px"}):Object(O.jsx)(p.a,{fontSize:"18px"})})})]}),I.password&&Object(O.jsx)(l.a,{variant:"required-error",children:I.password.message})]}),y&&Object(O.jsx)(l.a,{variant:"required-error",children:"Nombre de usuario o contrase\xf1a incorrectos."}),Object(O.jsx)(b.a,{type:"submit",variant:"add-button",w:"100%",color:"#fff",children:"Acceder"})]})})]})})})}},86:function(e,r,t){"use strict";t.d(r,"a",(function(){return b}));var n=t(3),a=t(2),c=t(0),i=t(15);function o(){return o=Object.assign||function(e){for(var r=1;r<arguments.length;r++){var t=arguments[r];for(var n in t)Object.prototype.hasOwnProperty.call(t,n)&&(e[n]=t[n])}return e},o.apply(this,arguments)}function s(e,r){if(null==e)return{};var t,n,a={},c=Object.keys(e);for(n=0;n<c.length;n++)t=c[n],r.indexOf(t)>=0||(a[t]=e[t]);return a}var l=["htmlWidth","htmlHeight","alt"],u=["fallbackSrc","fallback","src","srcSet","align","fit","loading","ignoreFallback","crossOrigin"],d=c.forwardRef((function(e,r){var t=e.htmlWidth,n=e.htmlHeight,a=e.alt,i=s(e,l);return c.createElement("img",o({width:t,height:n,ref:r,alt:a},i))})),b=Object(n.e)((function(e,r){var t=e.fallbackSrc,l=e.fallback,b=e.src,f=e.srcSet,j=e.align,p=e.fit,h=e.loading,m=e.ignoreFallback,O=e.crossOrigin,g=s(e,u),x=null!=h||m||void 0===t&&void 0===l,v=function(e){var r=e.loading,t=e.src,n=e.srcSet,a=e.onLoad,o=e.onError,s=e.crossOrigin,l=e.sizes,u=e.ignoreFallback,d=Object(c.useState)("pending"),b=d[0],f=d[1];Object(c.useEffect)((function(){f(t?"loading":"pending")}),[t]);var j=Object(c.useRef)(),p=Object(c.useCallback)((function(){if(t){h();var e=new Image;e.src=t,s&&(e.crossOrigin=s),n&&(e.srcset=n),l&&(e.sizes=l),r&&(e.loading=r),e.onload=function(e){h(),f("loaded"),null==a||a(e)},e.onerror=function(e){h(),f("failed"),null==o||o(e)},j.current=e}}),[t,s,n,l,a,o,r]),h=function(){j.current&&(j.current.onload=null,j.current.onerror=null,j.current=null)};return Object(i.l)((function(){if(!u)return"loading"===b&&p(),function(){h()}}),[b,p,u]),u?"loaded":b}(o({},e,{ignoreFallback:x})),w=o({ref:r,objectFit:p,objectPosition:j},x?g:Object(a.O)(g,["onError","onLoad"]));return"loaded"!==v?l||c.createElement(n.d.img,o({as:d,className:"chakra-image__placeholder",src:t},w)):c.createElement(n.d.img,o({as:d,src:b,srcSet:f,crossOrigin:O,loading:h,className:"chakra-image"},w))}));a.b&&(b.displayName="Image")}}]);
//# sourceMappingURL=13.03a6c305.chunk.js.map