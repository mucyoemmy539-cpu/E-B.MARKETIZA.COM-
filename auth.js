import { supabase, SUPABASE_READY } from "./supabaseClient.js";

const loginForm = document.querySelector("#loginForm");
const registerForm = document.querySelector("#registerForm");
const msg = document.querySelector("#message");

function show(text, type=""){ if(msg){ msg.textContent=text; msg.className="message "+type; } }
function demoUsers(){ return JSON.parse(localStorage.getItem("eb_demo_users") || "[]"); }
function saveDemoUsers(v){ localStorage.setItem("eb_demo_users", JSON.stringify(v)); }

if(loginForm){
  loginForm.addEventListener("submit", async e=>{
    e.preventDefault();
    const email = document.querySelector("#email").value.trim().toLowerCase();
    const password = document.querySelector("#password").value;
    if(!SUPABASE_READY){
      const user = demoUsers().find(u=>u.email===email && u.password===password);
      if(!user) return show("Demo mode: email or password is incorrect.","error");
      localStorage.setItem("eb_demo_session", JSON.stringify(user));
      location.href = user.role==="seller" ? "seller-dashboard.html" : "index.html";
      return;
    }
    const {error} = await supabase.auth.signInWithPassword({email,password});
    if(error) return show(error.message,"error");
    const {data:{user}} = await supabase.auth.getUser();
    const role = (await supabase.from("profiles").select("role").eq("id",user.id).single()).data?.role;
    location.href = role==="seller" ? "seller-dashboard.html" : "index.html";
  });
}

if(registerForm){
  registerForm.addEventListener("submit", async e=>{
    e.preventDefault();
    const name = document.querySelector("#name").value.trim();
    const email = document.querySelector("#email").value.trim().toLowerCase();
    const password = document.querySelector("#password").value;
    const role = document.querySelector("#role").value;

    if(!SUPABASE_READY){
      const users = demoUsers();
      if(users.some(u=>u.email===email)) return show("An account with this email already exists in demo mode.","error");
      users.push({id:crypto.randomUUID(),name,email,password,role});
      saveDemoUsers(users);
      localStorage.setItem("eb_demo_session", JSON.stringify(users.at(-1)));
      show("Account created in demo mode. Redirecting...","ok");
      setTimeout(()=>location.href=role==="seller"?"seller-dashboard.html":"index.html",500);
      return;
    }

    const {data,error} = await supabase.auth.signUp({
      email,password,
      options:{data:{full_name:name, role}}
    });
    if(error) return show(error.message,"error");
    if(data.user){
      const {error:profileError} = await supabase.from("profiles").upsert({id:data.user.id,full_name:name,role});
      if(profileError) return show(profileError.message,"error");
    }
    show("Account created. If email confirmation is enabled, check your email, then log in.","ok");
  });
}
