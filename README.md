# E&B MARKETIZA — STEP 1–3

This package gives E&B MARKETIZA:
1. Marketplace homepage
2. Buyer/seller registration and login
3. Seller dashboard

## Test immediately
Open `index.html` through a local web server or publish the folder to GitHub Pages.
Until Supabase is configured, the site runs in **Demo Mode**. Demo accounts are stored only in the browser and are NOT secure or suitable for a real marketplace.

## Turn on real accounts
1. Create a Supabase project.
2. In Supabase SQL Editor, run `supabase-schema.sql`.
3. Copy your project's public URL and public anon key.
4. Edit `assets/config.js`:
   SUPABASE_URL = your project URL
   SUPABASE_ANON_KEY = your public anon key
5. Publish the files again to GitHub Pages.
6. In Supabase Authentication settings, add your GitHub Pages site URL as an allowed redirect/site URL.

Never put a Supabase service_role key in these files.

## Next
Step 4 will connect "Add product" to a products table and image storage.
Then we can build product browsing, cart, orders, and finally secure payment processing.
