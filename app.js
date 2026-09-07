import { supabase, SUPABASE_READY } from "./supabaseClient.js";

const nav = document.querySelector("#nav");
async function renderNav(){
  if(!nav) return;
  if(!SUPABASE_READY){ nav.innerHTML = `<a class="btn ghost" href="login.html">Log in</a>`; return; }
  const {data:{user}} = await supabase.auth.getUser();
  nav.innerHTML = user
    ? `<a class="btn ghost" href="seller-dashboard.html">Dashboard</a>`
    : `<a class="btn ghost" href="login.html">Log in</a>`;
}
renderNav();
