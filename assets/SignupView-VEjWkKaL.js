import{r,o as c,a as d,b as g,c as w,d as f,e as s,w as v,f as a,v as n,g as b,t as C}from"./index-CzQ44yMS.js";const k={id:"signUpPage",class:"bg-yellow"},h={class:"conatiner signUpPage vhContainer"},u="https://todolist-api.hexschool.io",U={__name:"SignupView",setup(x){const e=r({email:"",password:"",passwordCheck:"",nickname:""}),p=r(""),i=async function(){if(e.value.password===e.value.passwordCheck)try{const l=await d.post(`${u}/users/sign_up`,e.value);p.value=l.data.uid,alert("註冊成功！即將跳轉..."),window.location.hash="#todoListPage"}catch(l){console.log(l),alert("註冊失敗，請重試")}else alert("請重新確認密碼")},m=r({nickname:"",uid:""});return c(async function(){const l=document.cookie.replace(/(?:(?:^|.*;\s*)customTodoToken\s*=\s*([^;]*).*$)|^.*$/,"$1");console.log(l);const o=await d.get(`${u}/users/checkout`,{headers:{Authorization:l}});m.value=o.data,g.push("/todo")}),(l,o)=>(w(),f("div",k,[s("div",h,[o[10]||(o[10]=s("div",{class:"side"},[s("a",{href:"#"},[s("img",{class:"logoImg",src:"https://raw.githubusercontent.com/hexschool/2022-web-layout-training/main/todolist/logo.png",alt:""})]),s("img",{class:"d-m-n",src:"https://raw.githubusercontent.com/hexschool/2022-web-layout-training/main/todolist/img.png",alt:"workImg"})],-1)),s("div",null,[s("form",{class:"formControls",action:"index.html",onSubmit:v(i,["prevent"])},[o[4]||(o[4]=s("h2",{class:"formControls_txt"},"註冊帳號",-1)),o[5]||(o[5]=s("label",{class:"formControls_label",for:"email"},"Email",-1)),a(s("input",{class:"formControls_input",type:"text",id:"email",name:"email",placeholder:"請輸入 email","onUpdate:modelValue":o[0]||(o[0]=t=>e.value.email=t),required:""},null,512),[[n,e.value.email]]),o[6]||(o[6]=s("label",{class:"formControls_label",for:"name"},"您的暱稱",-1)),a(s("input",{class:"formControls_input",type:"text",name:"name",id:"name",placeholder:"請輸入您的暱稱","onUpdate:modelValue":o[1]||(o[1]=t=>e.value.nickname=t)},null,512),[[n,e.value.nickname]]),o[7]||(o[7]=s("label",{class:"formControls_label",for:"pwd"},"密碼",-1)),a(s("input",{class:"formControls_input",type:"password",name:"pwd",id:"pwd",placeholder:"請輸入密碼","onUpdate:modelValue":o[2]||(o[2]=t=>e.value.password=t),required:""},null,512),[[n,e.value.password]]),o[8]||(o[8]=s("label",{class:"formControls_label",for:"pwd"},"再次輸入密碼",-1)),a(s("input",{class:"formControls_input",type:"password",name:"pwd",id:"pwd",placeholder:"請再次輸入密碼","onUpdate:modelValue":o[3]||(o[3]=t=>e.value.passwordCheck=t),required:""},null,512),[[n,e.value.passwordCheck]]),b(" "+C(e.value)+" ",1),s("input",{class:"formControls_btnSubmit",type:"button",value:"註冊帳號",onClick:i}),o[9]||(o[9]=s("a",{class:"formControls_btnLink",href:"#loginPage"},"登入",-1))],32)])])]))}};export{U as default};
