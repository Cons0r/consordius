import lucia from "lucia-sveltekit";
import supabase from "@lucia-sveltekit/adapter-supabase";
import cuid from 'cuid';

import { dev } from "$app/env";

const supabaseUrl = "https://wexykazwhojeugqabewk.supabase.co";
const supabaseSecret = import.meta.env.VITE_SUPABASE_SECRET;

export default lucia({
    adapter: supabase(supabaseUrl, supabaseSecret),
    env: dev ? "DEV" : "PROD",
    secret: import.meta.env.VITE_JWT_KEY,
    generateUserId: cuid
});