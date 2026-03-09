const { createClient } = require("@supabase/supabase-js")

const supabaseUrl = "https://urxdnepzekpmpphpirhg.supabase.co"
const supabaseKey = "YOUR_SUPABASE_ANON_KEY"

const supabase = createClient(supabaseUrl, supabaseKey)

module.exports = supabase