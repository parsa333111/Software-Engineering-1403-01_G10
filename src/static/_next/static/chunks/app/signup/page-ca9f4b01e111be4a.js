(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[879],{7277:(e,t,a)=>{Promise.resolve().then(a.bind(a,182))},182:(e,t,a)=>{"use strict";a.r(t),a.d(t,{default:()=>o});var l=a(5155),n=a(2115),r=a(1891),s=a(4373);let o=()=>{let[e,t]=(0,n.useState)(""),[a,o]=(0,n.useState)(""),[i,u]=(0,n.useState)(""),[d,c]=(0,n.useState)(""),[m,h]=(0,n.useState)(""),[p,g]=(0,n.useState)(""),x=()=>{var e;return(null===(e=document.cookie.split("; ").find(e=>e.startsWith("csrftoken")))||void 0===e?void 0:e.split("=")[1])||""},b=async t=>{t.preventDefault();let l=x(),n=await fetch("/group10/signup/",{method:"POST",headers:{"Content-Type":"application/json","X-CSRFToken":l},body:JSON.stringify({username:e,email:a,password1:i,password2:d,name:m,age:p})});200===n.status?window.location.href="/group10/login":console.log("An error occurred. Response is ".concat(n.body))};return(0,l.jsxs)("div",{children:[(0,l.jsx)("h2",{className:"text-2xl font-bold text-center mb-6",children:"Signup"}),(0,l.jsxs)("form",{onSubmit:b,children:[(0,l.jsx)(s.A,{htmlFor:"username",label:"Username",id:"username",type:"text",value:e,onChange:e=>t(e.target.value)}),(0,l.jsx)(s.A,{htmlFor:"email",label:"Email",id:"email",type:"email",value:a,onChange:e=>o(e.target.value)}),(0,l.jsx)(s.A,{htmlFor:"password",label:"Password",id:"password",type:"password",value:i,onChange:e=>u(e.target.value)}),(0,l.jsx)(s.A,{htmlFor:"password",label:"Confirm Password",id:"password2",type:"password",value:d,onChange:e=>c(e.target.value)}),(0,l.jsx)(s.A,{htmlFor:"name",label:"Name",id:"name",type:"text",value:m,onChange:e=>h(e.target.value)}),(0,l.jsx)(s.A,{htmlFor:"age",label:"Age",id:"name",type:"number",value:p,onChange:e=>g(e.target.value)}),(0,l.jsx)("button",{type:"submit",className:"w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition duration-200",children:"Signup"})]}),(0,l.jsx)(r.A,{text:"Already have an account?",link:"/group10/login",linkText:"Login"}),(0,l.jsx)(r.A,{text:"Do not want to signup?",link:"/group10/",linkText:"Home"})]})}},4373:(e,t,a)=>{"use strict";a.d(t,{A:()=>n});var l=a(5155);a(2115);let n=function(e){return(0,l.jsxs)("div",{className:"mb-4",children:[(0,l.jsx)("label",{htmlFor:e.htmlFor,className:"block text-gray-700 font-medium mb-2",children:e.label}),(0,l.jsx)("input",{id:e.id,type:e.type,className:"w-full border border-gray-300 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500",placeholder:"Enter your ".concat(e.htmlFor),value:e.value,onChange:e.onChange,min:"number"===e.type?"0":void 0})]})}},1891:(e,t,a)=>{"use strict";a.d(t,{A:()=>n});var l=a(5155);a(2115);let n=function(e){return(0,l.jsxs)("p",{className:"text-center text-gray-600 m-6",children:[e.text+" ",(0,l.jsx)("br",{}),(0,l.jsx)("a",{href:e.link,className:"text-blue-500 hover:underline",children:e.linkText})]})}}},e=>{var t=t=>e(e.s=t);e.O(0,[441,517,358],()=>t(7277)),_N_E=e.O()}]);