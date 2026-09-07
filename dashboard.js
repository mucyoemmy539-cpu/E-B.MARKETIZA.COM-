import { supabase, SUPABASE_READY } from "./supabaseClient.js";

const welcome = document.querySelector("#welcome");
const logoutBtn = document.querySelector("#logoutBtn");
const modal = document.querySelector("#productModal");
const addBtn = document.querySelector("#addProductBtn");
const closeBtn = document.querySelector("#closeModal");
const productForm = document.querySelector("#productForm");
const productMsg = document.querySelector("#productMessage");

async function getSessionUser(){
  if(!SUPABASE_READY){
    const u = JSON.parse(localStorage.getItem("eb_demo_session") || "null");
    if(!u){ location.href="login.html"; return null; }
    return u;
  }
  const {data:{user}} = await supabase.auth.getUser();
  if(!user){ location.href="login.html"; return null; }
  const {data:profile} = await supabase.from("profiles").select("full_name,role").eq("id",user.id).single();
  if(profile?.role !== "seller"){ location.href="index.html"; return null; }
  return {...user, ...profile};
}

const user = await getSessionUser();
if(user){
  welcome.textContent = `Welcome, ${user.full_name || user.name || user.email}.`;
}

logoutBtn?.addEventListener("click", async ()=>{
  if(SUPABASE_READY) await supabase.auth.signOut();
  localStorage.removeItem("eb_demo_session");
  location.href="index.html";
});

addBtn?.addEventListener("click",()=>modal.classList.remove("hidden"));
closeBtn?.addEventListener("click",()=>modal.classList.add("hidden"));
modal?.addEventListener("click",e=>{if(e.target===modal) modal.classList.add("hidden")});

productForm?.addEventListener("submit",e=>{
  e.preventDefault();
  productMsg.textContent="Product UI is ready. Step 4 will connect this form to the database.";
  productMsg.className="message ok";
});
